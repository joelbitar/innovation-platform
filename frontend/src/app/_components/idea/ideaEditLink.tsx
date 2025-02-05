import Link from "next/link";

type Props = {
    campaignId: string;
    ideaId: string;
}


export default async function ({campaignId, ideaId}: Props) {
    return (
        <Link href={`/campaign/${campaignId}/idea/${ideaId}/edit/`}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
            Edit idea
        </Link>
    );
}