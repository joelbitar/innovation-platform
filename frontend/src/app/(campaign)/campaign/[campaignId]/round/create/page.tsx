import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CreateRoundForm from "@/app/_components/campaign_round/createRoundForm";

type Params = {
    params: Promise<{
        campaignId: string;
    }>;
}
export default async function CreateRoundPage(props: Params) {
    const params = await props.params;
    const campaignId = params.campaignId;

    return (
        <main>
            <Container>
                <Header/>
                <h1
                    className={"text-2xl font-semibold text-gray-800"}
                >
                    Create Round
                </h1>
                <CreateRoundForm campaignId={campaignId}/>
            </Container>
        </main>
    );

}