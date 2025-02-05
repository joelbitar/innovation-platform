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
                    <li key={idea.id}>
                        <Link href={`/campaign/${campaignId}/idea/${idea.id}`}>
                            {idea.title}
                        </Link>
                        {
                            <>
                                {roundId && (
                                    <IdeaVoteCount idea={idea} roundId={roundId}/>
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
                    </li>
                ))}
                {ideas.length === 0 && (
                    <>No ideas yet :(</>
                )}
            </ul>
        </>
    )
}