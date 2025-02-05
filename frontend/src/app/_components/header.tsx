import Link from "next/link";
import CreateCampaignLink from "@/app/_components/createCampaignLink";

const Header = () => {
    return (
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
            <Link href="/" className="hover:underline">
                Start
            </Link>
            <Link href="/login/" className="hover:underline ml-4">
                Login
            </Link>
            <CreateCampaignLink className="hover:underline ml-4"/>
        </h2>
    );
};

export default Header;
