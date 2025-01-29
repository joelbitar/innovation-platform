'use client';

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {useEffect} from "react";
import {logger} from "@/lib/auth";
import {SWRConfig} from "swr";
import LoginForm from "@/app/login/login_form";

export default async function LoginPage(props: Params) {
    return (
        <main>
            <SWRConfig value={{fetcher: logger}}>
                <Container>
                    <Header/>
                    hello, login.
                    <LoginForm/>
                </Container>
            </SWRConfig>
        </main>
    );
}
