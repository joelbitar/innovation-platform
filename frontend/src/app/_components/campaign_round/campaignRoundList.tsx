'use client';

import {ApiService} from "@/lib/api";
import React, {useEffect, useState} from "react";
import Link from "next/link";

type Props = {
    campaignId: string
}

export default function CampaignRoundList({campaignId}: Props) {
    const [campaignRounds, setCampaignRounds] = useState([]);

    useEffect(() => {
        ApiService.listCampaignRounds(campaignId).then(setCampaignRounds)
    }, [campaignId]);

    return (
        <>
            <h2>Campaign rounds</h2>
            {
                campaignRounds &&
                campaignRounds.map((campaignRound) => (
                        <div key={campaignRound.id}>
                            <Link href={`/campaign/${campaignId}/round/${campaignRound.id}/`}>{campaignRound.name}</Link>
                        </div>
                    )
                )
            }
        </>
    )
}