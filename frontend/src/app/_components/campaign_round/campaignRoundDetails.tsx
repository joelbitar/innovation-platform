import CampaignIdeaList from "@/app/_components/idea/campaignIdeaList";
import {getClientAPIClient} from "@/lib/apiClientServer";

type Props = {
    campaignId: string,
    roundId: string,
}

export default async function CampaignRoundDetails({campaignId, roundId}: Props) {
    const apiClient = await getClientAPIClient()
    const campaignRound = await apiClient.campaign.campaignRoundRetrieve(campaignId, roundId)

    return (
        <>
            {
                campaignRound && (<>
                        <h1
                            className={"text-3xl font-bold mt-1 mb-3"}
                        >{campaignRound.name}</h1>
                        <h2
                            className={"text-2xl font-bold mt-1 mb-2"}
                        >
                            Ideas
                        </h2>
                        <CampaignIdeaList
                            campaignId={campaignId}
                            roundId={roundId}
                            voting={true}
                        />
                    </>
                )
            }
        </>
    )
}