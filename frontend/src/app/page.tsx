import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignList from "@/app/_components/campaign/campaignList";

export default function Index() {
    return (
        <main>
            <Container>
                <Header/>
                <h1 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-1 mt-2 flex items-center text-gray-900">
                    Current campaigns
                </h1>
                <CampaignList/>
            </Container>
        </main>
    );
}
