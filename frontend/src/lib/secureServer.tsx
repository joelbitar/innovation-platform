'use server'

import {cookies} from "next/headers"

import {userHasPermissions} from "@/lib/secured";
import {UserWithPermissions} from "@/lib/api";

import Redis from 'ioredis'

export async function fetchUser(): Promise<UserWithPermissions | null> {
    const cookieStore = await cookies()

    const userId = cookieStore.get('user_id')?.value

    if(!userId) {
        return null
    }

    const redis = new Redis(process.env.REDIS_URL)

    const user = await redis.get(userId)

    if(user) {
        return JSON.parse(user)
    }else{
        let requestData: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Api-Key ${process.env.BACKEND_API_KEY}`
            }
        }

        const response = await fetch(
            `${process.env.BACKEND_URL}/api/user/${userId}/`,
            requestData
        )

        if (response.status !== 200) {
            console.error('COULD NOT FETCH USER DATA')
        }

        const userResponseData = await response.json()

        // Cache the user data for 10 minutes
        redis.set(userId, JSON.stringify(userResponseData), 'EX', 60 * 10)

        return userResponseData
    }
}


type ServerSideSecuredProps = {
    children: any
    permissions: string[] | undefined
}

export default async function SecuredServer({children, permissions}: ServerSideSecuredProps) {
    let userData = undefined;
    try {
        userData = await fetchUser()
    } catch {
        console.log('Could not fetch user data...')
    }

    if ((permissions === undefined && !userData) || !userData || !userHasPermissions(userData, permissions)) {
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