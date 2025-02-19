'use server'

import {cookies} from "next/headers"

import {userHasPermissions} from "@/lib/secured";
import {UserWithPermissions} from "@/lib/api";
import {SecuredProps} from "@/lib/secured";

import Redis from 'ioredis'

export async function fetchUser(): Promise<UserWithPermissions | null> {
    const cookieStore = await cookies()

    const userToken = cookieStore.get('user_token')?.value

    if(!userToken) {
        return null
    }

    const redis = new Redis(process.env.REDIS_URL)

    const user = await redis.get(userToken)

    if(user) {
        return JSON.parse(user)
    }else{
        const backend_api_key = process.env.BACKEND_API_KEY

        let requestData: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api-Key ${backend_api_key}`
            }
        }

        const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/?token=${userToken}`,
            requestData
        )

        if (response.status !== 200) {
            if(response.status === 401) {
                console.error('Not authenticated')
                return null
            }
            console.error('Could not fetch user data')
            return null
        }

        const userResponseData = await response.json()

        // Cache the user data for 10 minutes
        redis.set(userToken, JSON.stringify(userResponseData), 'EX', 60 * 10)

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