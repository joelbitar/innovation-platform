import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {ApiService} from "@/lib/api";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";

type Params = {
  params: Promise<{
    id: number;
  }>;
};

export default async function CampaignPage(props: Params) {
    const params = await props.params;
    const id = params.id;

    console.log('CampaignPage: "' + String(id) + '"');

    return (
        <main>
            <Container>
                <Header />
                hello, campaign.
                {params.id}
                <CampaignDetails id={id} />
            </Container>
        </main>
    );
}