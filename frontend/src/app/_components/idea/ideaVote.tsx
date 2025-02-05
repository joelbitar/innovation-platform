import {IdeaService} from "@/lib/api";
import {useEffect, useState} from "react";

type IdeaVoteProps = {
    ideaId: string,
    roundId: string,
    postSubmit?: () => void
}

export default function IdeaVote({ideaId, roundId, postSubmit}: IdeaVoteProps) {
    const [vote, setVote] = useState(undefined);
    const handleVote = () => {
        IdeaService.ideaRoundIdeaVoteMeCreate(ideaId, roundId, {}).then(
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
        IdeaService.ideaVoteDestroy(vote.id).then(
            () =>{
                fetchVoteStatus()
                if(postSubmit) {
                    postSubmit()
                }
            }
        )
    }

    const fetchVoteStatus = () => {
        IdeaService.ideaRoundIdeaVoteMeList(ideaId, roundId).then(
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
                            <button onClick={removeVote}>Remove Vote</button>
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