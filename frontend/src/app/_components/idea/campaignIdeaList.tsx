'use client'


import React from "react";
import {useCampaignIdeas} from "@/app/_components/campaign/campaignIdeasProvider";
import IdeaList from "@/app/_components/idea/ideaList";


export default function CampaignIdeaList() {
    const {ideas} = useCampaignIdeas();

    return (
        <>
            <h1>Ideas</h1>
            <IdeaList ideas={ideas}/>
        </>
    )
}