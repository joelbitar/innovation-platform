import {UserWithPermissions} from "@/lib/api";

export type SecuredProps = {
    children: any
    permissions: string[]
}

function userHasPermission(userData: UserWithPermissions, permission: string) {
    return userData.permissions.includes(permission) || userData.group_permissions.includes(permission)
}

export function userHasPermissions(userData: UserWithPermissions, permissions: string[]) {
    let missingPermissions = []
    for (let i = 0; i < permissions.length; i++) {
        if(!userHasPermission(userData, permissions[i])) {
            missingPermissions.push(permissions[i])
        }
    }
    console.log('missingPermissions', missingPermissions)
    if(missingPermissions.length === 0) {
        return true
    }

    return false
}