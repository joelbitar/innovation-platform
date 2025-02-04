'use client';

import {ApiService} from "@/lib/api";
import React, {useEffect, useState} from "react";

type Props = {
    campaignId: number
}

export default function CampaignRoundList({campaignId}: Props) {
    const [campaignRounds, setCampaignRounds] = useState([]);

    console.log('campid', campaignId);

    useEffect(() => {
        console.log('CampaignRoundList fetch: "' + String(campaignId) + '"');
        ApiService.listCampaignRounds(String(campaignId)).then(
            setCampaignRounds
        )
    }, [campaignId]);

    return (
        <>
            <h2>Campaign rounds</h2>
            {
                campaignRounds &&
                campaignRounds.map((campaignRound) => (
                        <div key={campaignRound.id}>
                            <a href={`/round/${campaignRound.id}`}>{campaignRound.name}</a>
                            <h3>{campaignRound.name}</h3>
                            <p>{campaignRound.description}</p>
                        </div>
                    )
                )
            }
        </>
    )
}