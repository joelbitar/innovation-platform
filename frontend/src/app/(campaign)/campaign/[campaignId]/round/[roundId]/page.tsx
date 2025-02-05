import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
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

    return (
        <main>
            <Container>
                <Header/>
                <CampaignRoundDetails campaignId={campaignId} roundId={roundId}/>
            </Container>
        </main>
    );
}