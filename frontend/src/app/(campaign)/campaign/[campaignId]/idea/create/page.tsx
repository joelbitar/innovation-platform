import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {IdeaCreateForm} from "@/app/_components/idea/ideaCreateForm";


type Params = {
    params: Promise<{
        campaignId: string;
    }>;
};

export default async function CampaignIdeaCreatePage(props: Params) {
    const params = await props.params;
    const campaignId = params.campaignId

    console.log('CampaignIdeaCreatePage: ID;"' + String(campaignId) + '"');
    return (
        <main>
            <Container>
                <Header/>
                <h1>hello, campaign idea create.</h1>

                <IdeaCreateForm campaignId={campaignId}/>
            </Container>
        </main>
    );
}