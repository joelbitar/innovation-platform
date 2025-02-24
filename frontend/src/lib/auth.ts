'use client';

import {ApiClient} from "@/lib/api/ApiClient";
import {UserWithPermissions} from "@/lib/api/models/UserWithPermissions";

const apiClient = new ApiClient()

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
    return new Promise((resolve, reject) => {
        apiClient.auth.authLoginCreate({
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
    return new Promise((resolve, reject) => {
        apiClient.auth.authLogoutCreate().then(
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