'use client';

import {AuthService, Login, UserService, UserWithPermissions} from "@/lib/api";

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


function fetchUserData(): Promise<UserWithPermissions> {
    return new Promise((resolve, reject) => {
        UserService.userMeRetrieve().then(
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

export function login(username: string, password: string): Promise<UserWithPermissions> {
    return new Promise((resolve, reject) => {
        AuthService.authLoginCreate(<Login>{
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
        AuthService.authLogoutCreate().then(
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