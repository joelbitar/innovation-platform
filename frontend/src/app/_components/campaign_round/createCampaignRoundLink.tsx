import Link from "next/link";
import {UserPermissions} from "@/lib/userPermissions";
import SecuredServer from "@/lib/secureServer";


export default function ({campaignId}: {campaignId: string}) {
    return (
        <SecuredServer permissions={[UserPermissions.campaign__add_campaignround]}>
            <Link
                className={"btn"}
                href={`/campaign/${campaignId}/round/create/`}>
                Create a new round
            </Link>
        </SecuredServer>
    )
}