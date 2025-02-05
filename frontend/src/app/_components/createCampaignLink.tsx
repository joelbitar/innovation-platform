'use client'

import React from "react";

import Link from "next/link";
import {Secured, UserPermissions} from "@/lib/userPermissions";

export default function CreateCampaignLink({props}: { props: any }) {
    return (
        <Secured permissions={[UserPermissions.campaign__add_campaign]}>
            <Link href="/campaign/create">
                Create new campaign
            </Link>
        </Secured>
    )
}