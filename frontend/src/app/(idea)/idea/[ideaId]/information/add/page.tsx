import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {getServerAPIClient} from "@/lib/apiClientServer";
import {IdeaInformationCreateForm} from "@/app/_components/idea/information/ideaInformationCreateForm";
import IdeaLink from "@/app/_components/idea/ideaLink";
import {getServerAPI} from "@/lib/apiClient";
import {apiClientFactoryServer} from "@/lib/apiClientFactoryServer";
import {IdeaApi} from "@/lib/hejsan";

type Params = {
    params: Promise<{
        ideaId: number;
    }>;
}

export default async function IdeaInformationAddPage(props: Params) {
    const params = await props.params

    //const apiClient = await getServerAPIClient()
    //const idea = await apiClient.idea.ideaIdeaRetrieve(params.ideaId)
    //const apiClient = await getServerAPI()
    //const idea = await apiClient.idea
    const ideaService = await apiClientFactoryServer(IdeaApi)
    const idea = (await ideaService.ideaRetrieve(params.ideaId)).data

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