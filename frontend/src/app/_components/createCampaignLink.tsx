'use client'

import React from "react";

import Link from "next/link";
import {UserPermissions} from "@/lib/userPermissions";
import SecuredClient from "@/lib/secureClient";

export default function CreateCampaignLink() {
    return (
        <SecuredClient permissions={[UserPermissions.campaign__add_campaign]}>
            <Link href="/campaign/create">
                Create new campaign
            </Link>
        </SecuredClient>
    )
}