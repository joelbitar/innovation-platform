'use client'

import {useEffect, useState} from "react";
import {CampaignService} from "@/lib/api";
import CampaignRoundList from "@/app/_components/campaign_round/campaignRoundList";

type Props = {
    id: number
}

export default function CampaignDetails({id}: Props) {
    const [campaign, setCampaign] = useState([]);

    useEffect(() => {
        console.log('CampaignDetails fetch: "' + String(id) + '"');
        CampaignService.campaignRetrieve(id).then(
            setCampaign
        )
    }, [id]);

    return (
        <>
            {
                campaign && (
                    <div className={'card'}>
                        Name: {campaign.name}
                        <pre>
                            {campaign.description}
                        </pre>
                    </div>
                )
            }
            <h2>Rounds</h2>
            <CampaignRoundList campaignId={id}/>
        </>
    )
}