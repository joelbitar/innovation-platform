'use server'

import {cookies} from "next/headers"
import {getRequestConfig, getResponse} from "@/lib/api/core/request";

import {UserWithPermissions} from "@/lib/api";

export async function fetchUser() {
    const cookieStore = await cookies()

    const requestConfig = getRequestConfig(
        `${process.env.BACKEND_URL}/api/user/me/`,
        null,
        'GET',
        cookieStore.get('access-token').value,
        cookieStore.get('refresh-token').value,
    )

    const response = await getResponse(
        requestConfig
    )

    return await response.json()
}

function userHasPermission(userData: UserWithPermissions, permission: string) {
    return userData.permissions.includes(permission) || userData.group_permissions.includes(permission)
}

function userHasPermissions(userData: UserWithPermissions, permissions: string[]) {
    let missingPermissions = []
    for (let i = 0; i < permissions.length; i++) {
        if(!userHasPermission(userData, permissions[i])) {
            missingPermissions.push(permissions[i])
        }
    }
    if(missingPermissions.length === 0) {
        return true
    }

    return false
}

type ServerSideSecuredProps = {
    children: any
    permissions: string[]
}

export default async function ServerSideSecured({children, permissions}: ServerSideSecuredProps) {
    const userData = await fetchUser()

    console.log('Secured, has to have permissions', permissions)

    if (!userHasPermissions(userData, permissions)) {
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