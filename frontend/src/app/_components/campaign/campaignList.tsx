'use client'

import {useEffect, useState} from "react";
import {ApiService} from "@/lib/api";

export default function CampaignList() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        ApiService.listCampaigns().then(
            setCampaigns
        )
    }, []);
    return (
        <>
            <h1>Campaigns</h1>
            {
                campaigns &&
                campaigns.map((campaign) => (
                        <div key={campaign.id}>
                            <h2>{campaign.name}</h2>
                            <p>{campaign.description}</p>
                        </div>
                    )
                )
            }
        </>
    )
}