import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";
import {CampaignIdeasProvider} from "@/app/_components/campaign/campaignIdeasProvider";
import CampaignIdeas from "@/app/(campaign)/campaign/[campaignId]/campaignIdeas";
import CreateCampaignIdeaLink from "@/app/(campaign)/campaign/createCampaignIdeaLink";
import CreateCampaignRoundLink from "@/app/_components/campaign_round/createCampaignRoundLink";


type Params = {
    params: Promise<{
        campaignId: string;
    }>;
};

export default async function CampaignPage(props: Params) {
    const params = await props.params;
    const campaignId = params.campaignId;

    return (
        <main>
            <Container>
                <Header/>
                <div className={"flex"}>
                    <CreateCampaignIdeaLink campaignId={campaignId}/>
                    <CreateCampaignRoundLink campaignId={campaignId}/>
                </div>
                <div>
                    <CampaignDetails id={campaignId}/>
                    <CampaignIdeasProvider campaignId={campaignId}>
                        <h3
                            className={"text-2xl mt-3 mb-1"}
                        >Ideas submitted on this campaign</h3>
                        <CampaignIdeas campaignId={campaignId}/>
                    </CampaignIdeasProvider>
                </div>
            </Container>
        </main>
    );
}