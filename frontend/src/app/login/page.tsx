'use client';

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import LoginForm from "@/app/login/login_form";

export default async function LoginPage(props: Params) {
    return (
        <main>
            <Container>
                <Header/>
                hello, login.
                <LoginForm/>
            </Container>
        </main>
    );
}
