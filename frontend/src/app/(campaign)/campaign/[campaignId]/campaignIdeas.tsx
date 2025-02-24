import React from "react";
import CampaignIdeaList from "@/app/_components/idea/campaignIdeaList";


export default function CampaignIdeas({campaignId}: { campaignId: string }) {
    return (
        <>
            <CampaignIdeaList
                campaignId={campaignId}
            />
        </>
    )
}