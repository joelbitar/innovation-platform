'use client'

import {useEffect, useState} from "react";
import {ApiService} from "@/lib/api";
import CampaignRoundList from "@/app/_components/campaign_round/campaignRoundList";

type Props = {
    id: number
}

export default function CampaignDetails({id}: Props) {
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        console.log('CampaignDetails fetch: "' + String(id) + '"');
        ApiService.retrieveCampaign(id).then(
            setCampaign
        )
    }, [id]);

    return (
        <>
            <h1>Campaign</h1>
            {
                campaign && (
                    <>
                        {campaign.name}
                        {campaign.description}
                    </>
                )
            }
            <CampaignRoundList campaignId={id} />
        </>
    )
}