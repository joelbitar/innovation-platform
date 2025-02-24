'use server'

import {cookies} from "next/headers"

import {userHasPermissions} from "@/lib/secured";
import {UserWithPermissions} from "@/lib/apiClientServer";
import {SecuredProps} from "@/lib/secured";

import Redis from 'ioredis'

export async function fetchUser(): Promise<UserWithPermissions | null> {
    const cookieStore = await cookies()

    const sessionId = cookieStore.get('sessionid')?.value

    if (!sessionId) {
        return null
    }

    const redis_session_key = `session_user_${sessionId}`

    const redis = new Redis(process.env.REDIS_URL)

    const user = await redis.get(redis_session_key)

    if (user) {
        console.log('User data from cache')
        return JSON.parse(user)
    } else {
        return null
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