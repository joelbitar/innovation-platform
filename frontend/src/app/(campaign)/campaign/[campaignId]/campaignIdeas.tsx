'use client'

import React from "react";
import {IdeaCreateForm} from "@/app/_components/idea/ideaCreateForm";
import {useCampaignIdeas} from "@/app/_components/campaign/campaignIdeasProvider";
import CampaignIdeaList from "@/app/_components/idea/campaignIdeaList";


export default function CampaignIdeas({campaignId}: { campaignId: string }) {
    const {refreshIdeas} = useCampaignIdeas();

    return (
        <>
            <CampaignIdeaList
                campaignId={campaignId}
            />
        </>
    )
}