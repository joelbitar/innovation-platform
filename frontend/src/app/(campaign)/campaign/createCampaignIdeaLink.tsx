type Props = {
    campaignId: number
}

import Link from "next/link";

export default function CreateCampaignIdeaLink({campaignId}: { campaignId: number }) {
    return (
        <Link
            className={"btn"}
            href={`/campaign/${campaignId}/idea/create/`}>
            Create Idea
        </Link>
    )
}