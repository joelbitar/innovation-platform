'use client';

import {useState} from "react";
import {login} from "@/lib/auth";
import {UserWithPermissions} from "@/lib/api";


export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmit = () => {
        login(username, password).then(
            (data: UserWithPermissions) => {
                console.log(data)
                window.location.reload()
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
        </div>
    );
}