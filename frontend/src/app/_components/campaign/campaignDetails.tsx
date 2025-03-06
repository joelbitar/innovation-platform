import CampaignRoundList from "@/app/_components/campaign_round/campaignRoundList";
import {getServerCampaignApi} from "@/lib/apiClientFactory";

type Props = {
    id: number
}

export default async function CampaignDetails({id}: Props) {
    const campaignApi = await getServerCampaignApi()
    const campaign = await campaignApi.campaignRetrieve(id)

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