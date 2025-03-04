import {getServerIdeaApi} from "@/lib/apiClientFactory";

export default async function IdeaDetails({id}: { id: number }) {
    const ideaApi = await getServerIdeaApi()
    const idea = await ideaApi.ideaRetrieve(id)

    return (
        <div>
            {idea && (
                <div>
                    <h2>{idea.title}</h2>
                    <p>{idea.description}</p>
                </div>
            )}
        </div>
    )
}