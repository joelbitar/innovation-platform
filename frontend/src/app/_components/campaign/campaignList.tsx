import {getServerAPIClient} from "@/lib/apiClientServer";

export default async function CampaignList() {
    const apiClient = await getServerAPIClient();
    const campaigns = await apiClient.campaign.campaignList();

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