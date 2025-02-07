'use server'

import {cookies} from "next/headers"
import {getRequestConfig, getResponse} from "@/lib/api/core/request";

import {userHasPermissions} from "@/lib/secured";


export async function fetchUser() {
    const cookieStore = await cookies()

    let accessToken = cookieStore.get('access-token')?.value
    const refreshToken = cookieStore.get('refresh-token')?.value

    console.log('ACCESS token', accessToken)

    let requestData: RequestInit = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }

    const response = await fetch(
        `${process.env.BACKEND_URL}/api/user/me/`,
        requestData
    )

    console.log('Response status', response.status)

    if(response.status === 401) {
        const refreshResponse = await fetch(
            `${process.env.BACKEND_URL}/api/auth/token/refresh/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    refresh: refreshToken
                })
            }
        )

        console.log('Refresh response status', refreshResponse.status)

        if(response.ok) {
            console.log('OK on the refresh.. trying again.')
            requestData.headers['Authorization'] = `Bearer ${data.access}`
            const refreshed_response = await fetch(
                `${process.env.BACKEND_URL}/api/user/me/`,
                requestData
            )

            if(refreshed_response.status === 401) {
                console.log('Could not refresh the token')
                return {}
            }

            console.log('returning second try on response')

            return await refreshed_response.json()
        }
    }

    return await response.json()
}


type ServerSideSecuredProps = {
    children: any
    permissions: string[]
}

export default async function ServerSideSecured({children, permissions}: ServerSideSecuredProps) {
    let userData = undefined;
    try {
        userData = await fetchUser()
    } catch {
        console.log('Could not fetch user data...')
    }

    console.log('userData', userData)

    if (!userData || !userHasPermissions(userData, permissions)) {
        console.log('user did NOT have the permission')
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