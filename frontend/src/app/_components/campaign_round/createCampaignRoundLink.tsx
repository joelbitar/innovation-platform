'use client'

import Link from "next/link";
import {Secured, UserPermissions} from "@/lib/userPermissions";


export default function ({campaignId}: {campaignId: string}) {
    return (
        <Secured permissions={[UserPermissions.campaign__add_campaignround]}>
            <Link
                className={"btn"}
                href={`/campaign/${campaignId}/round/create/`}>
                Create a new round
            </Link>
        </Secured>
    )
}