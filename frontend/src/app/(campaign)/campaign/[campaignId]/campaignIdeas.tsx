'use client'

import React from "react";
import {IdeaForm} from "@/app/_components/idea/ideaForm";
import {useCampaignIdeas} from "@/app/_components/campaign/campaignIdeasProvider";
import CampaignIdeaList from "@/app/_components/idea/campaignIdeaList";


export default function CampaignIdeas({campaignId}: { campaignId: string }) {
    const {refreshIdeas} = useCampaignIdeas();

    return (
        <>
            <h1>Campaign Ideas</h1>
            <IdeaForm campaignId={campaignId} afterSubmit={() => {
                refreshIdeas()
            }}/>
            <CampaignIdeaList/>
        </>
    )
}