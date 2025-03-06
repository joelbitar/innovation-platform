'use client'

import {useEffect, useState} from "react";
import {getClientIdeaApi} from "@/lib/apiClientFactory";

type IdeaVoteProps = {
    ideaId: string,
    roundId: string,
    postSubmit?: () => void
}

export default function IdeaVote({ideaId, roundId, postSubmit}: IdeaVoteProps) {
    const [vote, setVote] = useState(undefined);
    const ideaApi = getClientIdeaApi()
    const handleVote = () => {
        ideaApi.ideaRoundIdeaVoteMeCreate(ideaId, roundId, {}).then(
            response => {
                console.log('Voted for idea', ideaId, response)
                fetchVoteStatus()
                if(postSubmit) {
                    postSubmit()
                }
            }
        )
    }

    const removeVote = () => {
        console.log('remove vote...', vote)
        ideaApi.ideaVoteDestroy(vote.id).then(
            () =>{
                fetchVoteStatus()
                if(postSubmit) {
                    postSubmit()
                }
            }
        )
    }

    const fetchVoteStatus = () => {
        ideaApi.ideaRoundIdeaVoteMeList(ideaId, roundId).then(
            response => {
                if(response.data.length === undefined) {
                    setVote(false)
                    return
                }

                setVote(response[0])
            },
        )
    }

    useEffect(() => {
        fetchVoteStatus()
    }, [ideaId, roundId]);
    return (
        <div>
            {vote === undefined ? (
                <>
                    ....
                </>
            ) : (
                <>
                    {(vote) ? (
                        <>
                            <button className={"bg-red-500"} onClick={removeVote}>Remove Vote</button>
                        </>
                    ) : (
                        <>
                            <button onClick={handleVote}>Vote</button>
                        </>
                    )}
                </>
            )}
        </div>
    )
}