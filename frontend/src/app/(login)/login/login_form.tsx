'use client';

import {useState} from "react";
import {login, logout} from "@/lib/auth";
import {UserWithPermissions} from "@/lib/api";


export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleOnSubmit = () => {
        login(username, password).then(
            (data :UserWithPermissions) => {
                document.cookie = `user_id=${data.id}; path=/; max-age=${60*60*24*365}`;
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
                logout()
            }}>Logout
            </button>
        </div>
    );
}