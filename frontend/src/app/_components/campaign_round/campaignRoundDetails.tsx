'use client';

import {CampaignService} from "@/lib/api";
import React, {useEffect, useState} from "react";
import {CampaignIdeasProvider} from "@/app/_components/campaign/campaignIdeasProvider";
import CampaignIdeaList from "@/app/_components/idea/campaignIdeaList";

type Props = {
    campaignId: string,
    roundId: string,
}

export default function CampaignRoundDetails({campaignId, roundId}: Props) {
    const [campaignRound, setCampaignRound] = useState([]);

    useEffect(() => {
        CampaignService.campaignRoundRetrieve(campaignId, roundId).then(setCampaignRound)
    }, [campaignId, roundId]);

    return (
        <>
            {
                campaignRound && (<>
                        <h1
                            className={"text-3xl font-bold mt-1 mb-3"}
                        >{campaignRound.name}</h1>
                        <CampaignIdeasProvider campaignId={campaignId}>
                            <h2
                                className={"text-2xl font-bold mt-1 mb-2"}
                            >
                                Ideas
                            </h2>
                            <CampaignIdeaList
                                campaignId={campaignId}
                                roundId={roundId}
                                voting={true}
                            />
                        </CampaignIdeasProvider>
                    </>
                )
            }
        </>
    )
}