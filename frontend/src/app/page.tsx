import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignList from "@/app/_components/campaign/campaignList";
import SecuredServer from "@/lib/secureServer";

export default function Index() {
    return (
        <main>
            <Container>
                <Header/>
                <SecuredServer>
                    <h1>
                        Current campaigns
                    </h1>
                    <CampaignList/>
                </SecuredServer>
            </Container>
        </main>
    );
}
