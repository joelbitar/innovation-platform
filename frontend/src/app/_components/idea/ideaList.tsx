import {getClientAPIClient} from "@/lib/apiClientServer";
import React from "react";
import Link from "next/link";
import IdeaVote from "@/app/_components/idea/ideaVote";
import {UserPermissions} from "@/lib/userPermissions";
import IdeaVoteCount from "@/app/_components/idea/ideaVoteCount";
import SecuredServer from "@/lib/secureClient";
import {Idea} from "@/lib/api";

type IdeaListProps = {
    campaignId: string,
    roundId: string,
    voting: boolean,
}

export default async function IdeaList({campaignId, roundId, voting}: IdeaListProps) {
    const apiClient = await getClientAPIClient()
    const ideas = await apiClient.idea.ideaCampaignIdeaList(campaignId)

    return (
        <>
            <ul>
                {ideas.map((idea: Idea) => (
                    <div key={idea.id} className={'card'}>
                        <h3>
                            <Link href={`/campaign/${campaignId}/idea/${idea.id}`}>
                                {idea.title}
                            </Link>
                        </h3>
                        {
                            <>
                                {roundId && (
                                    <>
                                        <span>Votes: </span><IdeaVoteCount idea={idea} roundId={roundId}/>
                                    </>
                                )}
                            </>
                        }
                        {voting && (
                            <>
                                <SecuredServer permissions={[UserPermissions.idea__add_vote]}>
                                    <IdeaVote ideaId={String(idea.id)} roundId={roundId}/>
                                </SecuredServer>
                            </>
                        )}
                    </div>
                ))}
                {ideas.length === 0 && (
                    <>No ideas yet :(</>
                )}
            </ul>
        </>
    )
}