import {getServerCampaignApi} from "@/lib/apiClientFactory";

export default async function CampaignList() {
    const campaignApi = await getServerCampaignApi();
    const {data: campaigns} = await campaignApi.campaignList();

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