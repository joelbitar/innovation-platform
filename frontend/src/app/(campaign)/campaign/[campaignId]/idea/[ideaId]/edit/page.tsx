import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {IdeaEditForm} from "@/app/_components/idea/ideaEditForm";

type Params = {
    params: Promise<{
        ideaId: string;
    }>;
};

export default async function IdeaEditPage(props: Params) {
    const params = await props.params;
    const ideaId = params.ideaId;

    return (
        <main>
            <Container>
                <Header/>
                <h1>Edit Idea</h1>
                <IdeaEditForm ideaId={ideaId}/>

                .. more info for each round ...
            </Container>
        </main>
    );
}