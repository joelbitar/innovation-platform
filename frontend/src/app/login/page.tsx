'use client';

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {useEffect} from "react";

export default async function LoginPage(props: Params) {
    useEffect(() => {
            fetch('/api/user/maaaaaj').then(
                response => response.json()
            ).then(data => {
                console.log(data)
            })
        }
    )

    return (
        <main>
            <Container>
                <Header/>
                hello, login.
            </Container>
        </main>
    );
}
