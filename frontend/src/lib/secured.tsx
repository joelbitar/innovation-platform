import {UserWithPermissions} from "@/lib/api";

export type SecuredProps = {
    children: any
    permissions: string[] | undefined
    inverse?: boolean
}

function userHasPermission(userData: UserWithPermissions, permission: string) {
    return userData.permissions.includes(permission) || userData.group_permissions.includes(permission)
}

export function userHasPermissions(userData: UserWithPermissions | undefined, permissions: string[] | undefined)  {
    if(permissions === undefined) {
        return !(userData === undefined)
    }

    if(userData === undefined) {
        return false
    }

    let missingPermissions = []
    for (let i = 0; i < permissions.length; i++) {
        if(!userHasPermission(userData, permissions[i])) {
            missingPermissions.push(permissions[i])
        }
    }
    console.log('missingPermissions', missingPermissions)
    return missingPermissions.length === 0
}