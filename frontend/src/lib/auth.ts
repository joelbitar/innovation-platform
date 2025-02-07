'use client';

import {setAccessToken, setRefreshToken} from "@/lib/api/core/request";
import {AuthService, TokenObtainPair, UserService, UserWithPermissions} from "@/lib/api";

export function setLocalStorageUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getLocalStorageUserData() {
    try {
        return JSON.parse(localStorage.getItem('user') || '{}')
    } catch (e) {
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
        AuthService.authTokenCreate(<TokenObtainPair>{
            username,
            password
        }).then(
            (data) => {
                setAccessToken(data.access)
                setRefreshToken(data.refresh)

                fetchUserData().then(
                    (data) => {
                        document.cookie = `user_id=${data.id}; path=/; max-age=${60 * 60 * 24 * 365}`;
                        resolve(data)
                    },
                    (error) => {
                        reject(error)
                    }
                )
            },
            (error) => {
                reject(error)
            }
        )
    })
}

export function logout(): Promise<null> {
    return new Promise((resolve, reject) => {
        AuthService.authTokenBlacklistCreate().then(
            (data) => {
                setAccessToken('')
                setRefreshToken('')
                setLocalStorageUserData('')
                document.cookie = `user_id=; path=/; max-age=1`;
                resolve(null)
            },
            (error) => {
                reject(error)
            }
        )
    })
}