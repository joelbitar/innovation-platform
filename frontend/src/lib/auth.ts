'use client';

import {getRefreshToken, setAccessToken, setRefreshToken} from "@/lib/api/core/request";
import {AuthService, UserService} from "@/lib/api";

export function setUserData(data: any) {
    localStorage.setItem('user', JSON.stringify(data))
}

export function getUserData() {
    try{
        return JSON.parse(localStorage.getItem('user') || '{}')
    }catch (e) {
        return {}
    }
}

export function getUserPermissions(): string[] {
    return getUserData()?.permissions || []
}

function fetchUserData() {
    return new Promise((resolve, reject) => {
        UserService.userMeRetrieve().then(
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
        AuthService.authTokenCreate({
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
    AuthService.authTokenBlacklistCreate(
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