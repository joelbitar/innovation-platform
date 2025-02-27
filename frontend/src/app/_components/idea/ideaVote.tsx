'use client'

import {useEffect, useState} from "react";
import {ApiClient} from "@/lib/api";

type IdeaVoteProps = {
    ideaId: string,
    roundId: string,
    postSubmit?: () => void
}

export default function IdeaVote({ideaId, roundId, postSubmit}: IdeaVoteProps) {
    const [vote, setVote] = useState(undefined);
    const apiClient = new ApiClient()
    const handleVote = () => {
        apiClient.idea.ideaRoundIdeaVoteMeCreate(ideaId, roundId, {}).then(
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
        apiClient.idea.ideaVoteDestroy(vote.id).then(
            () =>{
                fetchVoteStatus()
                if(postSubmit) {
                    postSubmit()
                }
            }
        )
    }

    const fetchVoteStatus = () => {
        apiClient.idea.ideaRoundIdeaVoteMeList(ideaId, roundId).then(
            response => {
                if(response.length === undefined) {
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