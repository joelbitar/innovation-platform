'use server'

import {cookies} from "next/headers"

import {userHasPermissions} from "@/lib/secured";
import {UserWithPermissions} from "@/lib/api";
import {SecuredProps} from "@/lib/secured";

import Redis from 'ioredis'

export async function fetchUser(): Promise<UserWithPermissions | null> {
    const cookieStore = await cookies()

    const sessionId = cookieStore.get('sessionid')?.value

    if (!sessionId) {
        return null
    }

    const redis = new Redis(process.env.REDIS_URL)

    const user = await redis.get(sessionId)

    if (user) {
        return JSON.parse(user)
    } else {
        const backend_api_key = process.env.BACKEND_API_KEY

        // Set auth header and sessionid coookie
        let requestData: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `sessionid=${sessionId}`,
                'Authorization': `Api-Key ${backend_api_key}`
            }
        }

        const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/session/`,
            requestData
        )

        if (response.status === 401) {
            console.error('Not authenticated')
            return null
        }

        if (response.status === 404) {
            // No user in session.
            return null
        }

        if (response.status !== 200) {
            console.error('Unknown error while fetching user')
            return null
        }

        const userResponseData = await response.json()

        // Cache the user data
        redis.set(sessionId, JSON.stringify(userResponseData), 'EX', 1)

        return userResponseData
    }
}


export default async function SecuredServer({children, permissions, inverse}: SecuredProps) {
    // Inverse is used to check if the user does not have the permission
    // Default value is undefined (false) and if set to something else, it will be true

    let userData = undefined;
    try {
        userData = await fetchUser()
    } catch {
        console.log('Could not fetch user data...')
    }

    const prohibited = (permissions === undefined && !userData) || !userData || !userHasPermissions(userData, permissions)

    // Negate the meaning of inverse so
    // if inverse is false (default) and prohibited is true then we should not render the children
    /**
     * inverse      negated inverse      prohibited       abort
     * false*       true                 true             true
     * false*       true                 false            false
     * true         false                true             false
     * true         false                false            true
     *
     * *= default
     */
    if (prohibited === (!inverse)) {
        return (
            <>
            </>
        )
    }

    return (
        <>
            {children}
        </>
    )
}