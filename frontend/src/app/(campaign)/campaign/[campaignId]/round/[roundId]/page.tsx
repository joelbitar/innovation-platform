import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";
import {ApiService} from "@/lib/api";
import CampaignRoundDetails from "@/app/_components/campaign_round/campaignRoundDetails";

type Params = {
    params: Promise<{
        campaignId: string,
        roundId: string
    }>
};

export default async function CampaignRoundPage(props: Params) {
    const params = await props.params;
    const roundId = params.roundId;
    const campaignId = params.campaignId;

    console.log('cam', campaignId, 'round', roundId)

    return (
        <main>
            <Container>
                <Header/>
                hello, campaign round. {roundId}
                <CampaignRoundDetails campaignId={campaignId} roundId={roundId} />
            </Container>
        </main>
    );
}