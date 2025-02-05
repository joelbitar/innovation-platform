import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";
import {IdeaForm} from "@/app/_components/idea/ideaForm";

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
                <Header />
                hello, campaign.
                <CampaignDetails id={campaignId} />
                <IdeaForm campaignId={campaignId} />
            </Container>
        </main>
    );
}