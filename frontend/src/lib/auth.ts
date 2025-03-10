'use client';


import {UserWithPermissions} from "api";
// import axios
import axios from 'axios'


export function setLocalStorageUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getLocalStorageUserData() {
    try {
        return JSON.parse(localStorage.getItem('user') || '{}')
    } catch (e) {
        console.error('Could not parse user data from local storage')
        return {}
    }
}

const AuthApi = function (){
    return {
        authLoginCreate: (
            {username, password}: {username: string, password: string}
        ) => {
            return axios(
                '/api/_allauth/browser/v1/auth/login',
                {
                    method: 'POST',
                    data: {
                        username,
                        password
                    }
                }
            )
        },
        authLogoutCreate: () => {},
    }
}



export function login(username: string, password: string): Promise<UserWithPermissions> {
    const authApiClient = new AuthApi()

    return new Promise((resolve, reject) => {
        authApiClient.authLoginCreate({
            username,
            password
        }).then(
            (data) => {
                setLocalStorageUserData(data)
                resolve(data)
            },
            (error) => {
                reject(error)
            }
        )
    })
}

export function logout(): Promise<null> {
    const authApiClient = getClientAuthApi()

    return new Promise((resolve, reject) => {
        authApiClient.authLogoutCreate().then(
            (data) => {
                resolve(null)
            },
            (error) => {
                reject(error)
            }
        ).finally(
            () => {
                setLocalStorageUserData('')
                window.location.reload()
            }
        )
    })
}