'use client';

import {ApiService} from "@/lib/api";
import React, {useEffect, useState} from "react";

type Props = {
    campaignId: string,
    roundId: string,
}

export default function CampaignRoundDetails({campaignId, roundId}: Props) {
    const [campaignRound, setCampaignRound] = useState([]);

    useEffect(() => {
        ApiService.retrieveCampaignRound(campaignId, roundId).then(setCampaignRound)
    }, [campaignId, roundId]);

    return (
        <>
            {
                campaignRound && <>
              hello {campaignRound.name}
              </>
            }
        </>
    )
}