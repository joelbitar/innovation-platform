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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                href={`/campaign/${campaignId}/round/create/`}>
                Create a new round
            </Link>
        </Secured>
    )
}