import {IdeaDetail} from "@/lib/api";

type Props = {
    idea: IdeaDetail,
    roundId: number,
}
export default function IdeaVoteCount({idea, roundId}: Props) {
    const roundVotes = idea.round_votes.find(vote => vote.round_pk == roundId);

    return (
        <>
            <span>
                {roundVotes?.count || "0"}
            </span>
        </>
    )
}
