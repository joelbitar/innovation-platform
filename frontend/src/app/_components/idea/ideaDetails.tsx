import {getServerAPIClient} from "@/lib/apiClientServer";

export default async function IdeaDetails({id}: { id: string }) {
    const apiClient = await getServerAPIClient()
    const idea = await apiClient.idea.ideaIdeaRetrieve(id)

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