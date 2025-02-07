'use client'

import {SecuredProps, userHasPermissions} from "@/lib/secured";
import {getLocalStorageUserData} from "@/lib/auth";

export default function SecuredClient({children, permissions}: SecuredProps) {
    const userData = getLocalStorageUserData()

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