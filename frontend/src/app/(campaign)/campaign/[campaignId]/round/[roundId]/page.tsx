import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignRoundDetails from "@/app/_components/campaign_round/campaignRoundDetails";

type Params = {
    params: Promise<{
        campaignId: string,
        roundId: string
    }>
};

import Link from 'next/link';

export default async function CampaignRoundPage(props: Params) {
    const params = await props.params;
    const roundId = params.roundId;
    const campaignId = params.campaignId;

    return (
        <main>
            <Container>
                <Header/>
                <Link className={"btn"} href={`/campaign/${campaignId}/round/${roundId}/edit/`}>Edit</Link>
                <CampaignRoundDetails campaignId={campaignId} roundId={roundId}/>
            </Container>
        </main>
    );
}