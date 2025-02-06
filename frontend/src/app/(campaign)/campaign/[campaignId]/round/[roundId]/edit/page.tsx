import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CreateRoundForm from "@/app/_components/campaign_round/createRoundForm";
import RoundEditForm from "@/app/_components/campaign_round/editRoundForm";

type Params = {
    params: Promise<{
        campaignId: string;
        roundId: string;
    }>;
}
export default async function EditRoundPage(props: Params) {
    const params = await props.params;
    const campaignId = params.campaignId;
    const roundId = params.roundId;

    return (
        <main>
            <Container>
                <Header/>
                <h1>
                    Edit Round
                </h1>
                <RoundEditForm campaignId={campaignId} roundId={roundId}/>
            </Container>
        </main>
    );

}