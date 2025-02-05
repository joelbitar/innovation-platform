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
                    <>
                        Name: {campaign.name}
                        <pre>
                            {campaign.description}
                        </pre>
                    </>
                )
            }
            <h2
                className={"text-1xl font-bold mt-1"}
            >Rounds</h2>
            <CampaignRoundList campaignId={id}/>
        </>
    )
}