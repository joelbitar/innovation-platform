import {getClientAPIClient} from "@/lib/apiClientServer";
import CampaignRoundList from "@/app/_components/campaign_round/campaignRoundList";

type Props = {
    id: number
}

export default async function CampaignDetails({id}: Props) {
    const apiClient = await getClientAPIClient()
    const campaign = await apiClient.campaign.campaignRetrieve(id)

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