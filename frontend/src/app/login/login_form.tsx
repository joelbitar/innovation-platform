'use client';

import {useState} from "react";
import {apiClient} from "@/lib/apiClient";
import {login, logout} from "@/lib/auth";


export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmit = () => {
        console.log('submit')
        login(username, password).then(
            (data) => {
                console.log(data)
            },
            (error) => {
                console.error(error)
            }
        )
    }

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>
                    Username:
                    <input type="text" name="username"
                           onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password:
                    <input type="password" name="password"
                           onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit"
                        onClick={(e) => {
                            e.preventDefault()
                            handleOnSubmit()
                        }
                        }
                >Submit
                </button>
            </form>
            <button type={"button"} onClick={() => {
                apiClient.get('/api/user/me/').then(
                    (data) => {
                        console.log('buttonclick response', data)
                    }
                )
            }}>Get User
            </button>
            <button type={"button"} onClick={() => {
                logout()
            }}>Logout
            </button>
        </div>
    );
}