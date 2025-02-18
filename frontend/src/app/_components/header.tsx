import Link from "next/link";
import CreateCampaignLink from "@/app/_components/createCampaignLink";
import SecuredServer from "@/lib/secureServer";
import LogoutButton from "@/app/_components/user/logout";

const Header = () => {
    return (
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8 flex items-center">
            <Link href="/" className="hover:underline">
                Start
            </Link>
            <SecuredServer inverse>
                <Link href="/login/" className="hover:underline ml-4">
                    Login
                </Link>
            </SecuredServer>
            <SecuredServer>
                <CreateCampaignLink/>
                <LogoutButton>
                    Log out
                </LogoutButton>
            </SecuredServer>
        </h2>
    );
};

export default Header;
