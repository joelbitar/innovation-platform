import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import LoginForm from "@/app/(login)/login/login_form";
import SecuredServer from "@/lib/secureServer";
import LogoutButton from "@/app/_components/user/logout";

export default async function LoginPage() {
    return (
        <main>
            <Container>
                <Header/>
                <SecuredServer inverse>
                    <LoginForm/>
                </SecuredServer>

                <SecuredServer>
                    <LogoutButton>
                        <button type={"button"}>
                            Log OUT!
                        </button>
                    </LogoutButton>
                </SecuredServer>
            </Container>
        </main>
    );
}
