import React from "react";
import Link from "next/link";
import {getServerAPIClient} from "@/lib/apiClientServer";

type Props = {
    campaignId: string
}

export default async function CampaignRoundList({campaignId}: Props) {
    const apiClient = await getServerAPIClient()
    const campaignRounds = await apiClient.campaign.campaignRoundList(campaignId)

    return (
        <>
            {
                campaignRounds &&
                campaignRounds.map((campaignRound) => (
                        <div key={campaignRound.id} className={'card'}>
                            <h3>
                                <Link
                                    href={`/campaign/${campaignId}/round/${campaignRound.id}/`}>{campaignRound.name}
                                </Link>
                            </h3>
                            <p>
                                {campaignRound.description}
                            </p>
                        </div>
                    )
                )
            }
        </>
    )
}