'use client';

import {useEffect} from "react";
import {useState} from "react";
import {apiClient} from "@/lib/apiClient";

export default function LoginForm() {
    const [data, setData] = useState(null);

    console.log('hello')
    useEffect(() => {
        apiClient('/api/user/me/').then(
            (data) => {
                setData(data)
            }
        )
        apiClient('/api/auth/token/', {'username': 'hej', 'password': 'hej'}).then(
            (data) => {
                setData(data)
            }
        )
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data]);

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