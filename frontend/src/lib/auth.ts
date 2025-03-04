'use client';


import {getClientAuthApi} from "@/lib/apiClientFactory";
import {UserWithPermissions} from "@/lib/hejsan";


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


export function login(username: string, password: string): Promise<UserWithPermissions> {
    const authApiClient = getClientAuthApi()

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