import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";
import {CampaignIdeasProvider} from "@/app/_components/campaign/campaignIdeasProvider";
import CampaignIdeas from "@/app/(campaign)/campaign/[campaignId]/campaignIdeas";

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
                hello, campaign.
                <CampaignDetails id={campaignId}/>
                <CampaignIdeasProvider campaignId={campaignId}>
                    <CampaignIdeas campaignId={campaignId} />
                </CampaignIdeasProvider>
            </Container>
        </main>
    );
}