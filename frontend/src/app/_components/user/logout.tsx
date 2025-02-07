'use client';

import {logout} from "@/lib/auth";

export default function LogoutButton({children}) {
    return (
        <div onClick={() => {
            logout().then(
                () => {
                    window.location.reload()
                }
            )
        }}>
            {children}
        </div>
    );
}