
import React from "react";

import Link from "next/link";
import {UserPermissions} from "@/lib/userPermissions";
import SecuredServer from "@/lib/secureServer";

export default function CreateCampaignLink() {
    return (
        <SecuredServer permissions={[UserPermissions.campaign__add_campaign]}>
            <Link href="/campaign/create">
                Create new campaign
            </Link>
        </SecuredServer>
    )
}