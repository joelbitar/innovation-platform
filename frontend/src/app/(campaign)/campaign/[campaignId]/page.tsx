import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import CampaignDetails from "@/app/_components/campaign/campaignDetails";
import {CampaignIdeasProvider} from "@/app/_components/campaign/campaignIdeasProvider";
import CampaignIdeas from "@/app/(campaign)/campaign/[campaignId]/campaignIdeas";
import CreateCampaignIdeaLink from "@/app/(campaign)/campaign/createCampaignIdeaLink";
import CreateCampaignRoundLink from "@/app/_components/campaign_round/createCampaignRoundLink";
import SecuredServer from "@/lib/secureServer";
import SecuredClient from "@/lib/secureClient";
import {UserPermissions} from "@/lib/userPermissions";

type Params = {
    params: Promise<{
        campaignId: string;
    }>;
};

export default async function CampaignPage(props: Params) {
    const params = await props.params;
    const campaignId = params.campaignId;

    return (
        <main>
            <Container>
                <Header/>
                <div className={"grid grid-cols-1 gap-5 mb-4"}>
                    <div className={""}>
                        <CreateCampaignIdeaLink campaignId={campaignId}/>
                    </div>
                    <div className={""}>
                        <CreateCampaignRoundLink campaignId={campaignId}/>
                    </div>
                    <div>
                        <SecuredServer permissions={[UserPermissions.auth__add_user]}>
                            add user for server
                        </SecuredServer>
                        <SecuredClient permissions={[UserPermissions.auth__add_user]}>
                            add user for client
                        </SecuredClient>
                    </div>
                </div>
                <div>
                    <h2>Information</h2>
                    <CampaignDetails id={campaignId}/>
                    <CampaignIdeasProvider campaignId={campaignId}>
                        <h3>
                            Ideas submitted on this campaign
                        </h3>

                        <CampaignIdeas campaignId={campaignId}/>
                    </CampaignIdeasProvider>
                </div>
            </Container>
        </main>
    );
}