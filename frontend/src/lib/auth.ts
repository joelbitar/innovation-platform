'use client';

import {ApiService} from "@/lib/api";
import {getRefreshToken, setAccessToken, setRefreshToken} from "@/lib/api/core/request";

export function setUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}')
}

export function getUserPermissions(): string[] {
    return getUserData()?.permissions || []
}

function fetchUserData() {
    return new Promise((resolve, reject) => {
        ApiService.getForCurrentLoggedInUserUserWithPermissions().then(
            (data) => {
                setUserData(data)
                resolve(data)
            },
            (error) => {
                reject(error)
            }
        )
    })
}

export function login(username: string, password: string) {
    return new Promise((resolve, reject) => {
        ApiService.createTokenObtainPair({
            username,
            password
        }).then(
            (data) => {
                setAccessToken(data.access)
                setRefreshToken(data.refresh)
                fetchUserData().then(
                    (data) => {
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

export function logout() {
    ApiService.createTokenBlacklist(
        {
            'refresh': getRefreshToken()
        }
    ).then(
        (data) => {
            setAccessToken('')
            setRefreshToken('')
        }
    )
}