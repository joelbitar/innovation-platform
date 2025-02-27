import Link from "next/link";

export default function CreateCampaignIdeaLink({campaignId}: { campaignId: string }) {
    return (
        <Link
            className={"btn"}
            href={`/campaign/${campaignId}/idea/create/`}>
            Create Idea
        </Link>
    )
}