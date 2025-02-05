'use client'


import {Idea} from "@/lib/api";
import React from "react";
import {useCampaignIdeas} from "@/app/_components/campaign/campaignIdeasProvider";
import Link from "next/link";
import IdeaVote from "@/app/_components/idea/ideaVote";
import {Secured, UserPermissions} from "@/lib/userPermissions";
import IdeaVoteCount from "@/app/_components/idea/ideaVoteCount";

type IdeaListProps = {
    campaignId: string,
    roundId: string,
    voting: boolean,
}

export default function IdeaList({campaignId, roundId, voting}: IdeaListProps) {
    const {ideas, refreshIdeas} = useCampaignIdeas();

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
                                <Secured permissions={[UserPermissions.idea__add_vote]}>
                                    <IdeaVote ideaId={String(idea.id)} roundId={roundId} postSubmit={refreshIdeas}/>
                                </Secured>
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