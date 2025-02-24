import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import IdeaDetails from "@/app/_components/idea/ideaDetails";
import IdeaEditLink from "@/app/_components/idea/ideaEditLink";

type Params = {
    params: Promise<{
        campaignId: string;
        ideaId: string;
    }>;
};

export default async function IdeaPage(props: Params) {
    const params = await props.params;
    const ideaId = params.ideaId;
    const campaignId = params.campaignId;

    return (
        <main>
            <Container>
                <Header/>
                <h1>Idea Details</h1>
                <IdeaDetails id={ideaId}/>
                <br/>
                <br/>
                <IdeaEditLink ideaId={ideaId} campaignId={campaignId}/>
            </Container>
        </main>
    );
}