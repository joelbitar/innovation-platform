import React from "react";
import Link from "next/link";
import {getServerAPIClient} from "@/lib/apiClientServer";
import {getServerCampaignApi} from "@/lib/apiClientFactory";

type Props = {
    campaignId: string
}

export default async function CampaignRoundList({campaignId}: Props) {
    const campaignApi = await getServerCampaignApi()
    const campaignRounds = await campaignApi.campaignRoundList(campaignId)

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