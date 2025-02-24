import React from "react";
import IdeaList from "@/app/_components/idea/ideaList";


export default function CampaignIdeaList({campaignId, roundId, voting}: { campaignId: string, roundId: string, voting: boolean }) {
    return (
        <>
            <IdeaList
                campaignId={campaignId}
                roundId={roundId}
                voting={voting}
            />
        </>
    )
}