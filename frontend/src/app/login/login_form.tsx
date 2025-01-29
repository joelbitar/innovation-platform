'use client';

import {useEffect} from "react";
import {useState} from "react";
import {apiClient} from "@/lib/apiClient";
import {login} from "@/lib/auth";


export default function LoginForm() {
    const handleOnSubmit = () => {
        console.log('submit')
        login('joel', 'joel').then(
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
                    <input type="text" name="username"/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password"/>
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
            }}>Get User</button>
        </div>
    );
}