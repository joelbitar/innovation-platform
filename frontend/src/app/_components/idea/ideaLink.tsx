import Link from "next/link";
import {Idea} from "@/lib/api";

export default async function IdeaLink({idea}: { idea: Idea }) {
    console.log(idea)
    return (
        <Link href={`/campaign/${idea.campaign}/idea/${idea.id}`}>
            {idea.title}
        </Link>
    );
}