import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";

type Params = {
  params: Promise<{
    roundId: string;
  }>;
};

export default async function CampaignRoundPage(props: Params) {
    const params = await props.params;
    const roundId = params.roundId;

    return (
        <main>
            <Container>
                <Header />
                hello, campaign round. {roundId}
            </Container>
        </main>
    );
}