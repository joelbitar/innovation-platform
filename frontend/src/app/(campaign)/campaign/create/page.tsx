import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {CampaignCreateForm} from "@/app/_components/campaign/campaignForm";
import ServerSideSecured from "@/lib/secureServer";
import {UserPermissions} from "@/lib/userPermissions";

export default function Create() {
    return (
        <main>
            <Container>
                <Header/>
                <ServerSideSecured permissions={[UserPermissions.campaign__add_campaign]}>
                    <CampaignCreateForm/>
                </ServerSideSecured>
            </Container>
        </main>
    );
}