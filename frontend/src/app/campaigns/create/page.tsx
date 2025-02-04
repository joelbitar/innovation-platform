import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {CampaignCreateForm} from "@/app/_components/campaign/campaignForm";

export default function Create() {
    return (
        <main>
            <Container>
                <Header />
                <CampaignCreateForm />
            </Container>
        </main>
    );
}