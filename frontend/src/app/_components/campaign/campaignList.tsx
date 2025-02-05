'use client'

import {useEffect, useState} from "react";
import {CampaignService} from "@/lib/api";

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        CampaignService.campaignList().then(
            setCampaigns
        )
    }, []);
    return (
        <>
            {
                campaigns &&
                campaigns.map((campaign) => (
                        <div key={campaign.id} className={"card"}>
                            <a href={`/campaign/${campaign.id}`} className={'h3'}>
                                {campaign.name}
                            </a>
                            <p>
                                {campaign.description}
                            </p>
                        </div>
                    )
                )
            }
        </>
    )
}