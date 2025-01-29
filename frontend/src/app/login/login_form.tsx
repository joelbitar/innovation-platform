'use client';

import {useEffect} from "react";

export default function LoginForm() {
    console.log('hello')
    useEffect(() => {
            fetch('/api/user/me/').then(
                (response) => {
                    console.log(response.json())
                },
            )
        }
    )

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username"/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password"/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}