import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {getServerAPIClient} from "@/lib/apiClientServer";
import {IdeaInformationCreateForm} from "@/app/_components/idea/information/ideaInformationCreateForm";
import IdeaLink from "@/app/_components/idea/ideaLink";

type Params = {
    params: Promise<{
        ideaId: number;
    }>;
}

export default async function IdeaInformationAddPage(props: Params) {
    const params = await props.params

    const apiClient = await getServerAPIClient()
    const idea = await apiClient.idea.ideaIdeaRetrieve(params.ideaId)

    return (
        <main>
            <Container>
                <Header/>
                <h1><IdeaLink idea={idea}/></h1>
                <h2>Add information on idea</h2>
                <IdeaInformationCreateForm ideaId={idea.id}/>
            </Container>
        </main>
    )
}