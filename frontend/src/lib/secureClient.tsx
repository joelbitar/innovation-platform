'use client'

import {SecuredProps, userHasPermissions} from "@/lib/secured";
import {getLocalStorageUserData} from "@/lib/auth";

export default function SecuredClient({children, permissions, inverse}: SecuredProps) {
    const userData = getLocalStorageUserData() || undefined

    console.log('user data', userData)

    const prohibited = !userHasPermissions(userData, permissions)

    if (prohibited === (!inverse)) {
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