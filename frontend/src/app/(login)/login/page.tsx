import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import LoginForm from "@/app/(login)/login/login_form";

export default async function LoginPage() {
    return (
        <main>
            <Container>
                <Header/>
                <LoginForm/>
            </Container>
        </main>
    );
}
