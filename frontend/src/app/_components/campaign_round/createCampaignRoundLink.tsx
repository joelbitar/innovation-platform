'use client'

import Link from "next/link";
import {Secured, UserPermissions} from "@/lib/userPermissions";

type Props = {
    campaignId: string;
}


export default async function ({campaignId}: Props) {
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