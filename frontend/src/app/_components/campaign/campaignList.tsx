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
                        <div key={campaign.id}>
                            <a href={`/campaign/${campaign.id}`}>
                                {campaign.name}
                            </a>
                        </div>
                    )
                )
            }
        </>
    )
}