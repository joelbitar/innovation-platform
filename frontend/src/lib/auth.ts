'use client';

import {apiClient, getRefreshToken, setAccessToken, setRefreshToken} from "@/lib/apiClient";

export function login(username, password) {
  return new Promise((resolve, reject) => {
    apiClient.post('/api/auth/token/', {'username': username, 'password': password}).then(
      (data) => {
        setAccessToken(data.access)
        setRefreshToken(data.refresh)
        resolve(data)
      },
      (error) => {
        reject(error)
      }
    )
  })
}

export function logout() {
    apiClient.post(
        '/api/auth/token/blacklist/',
        {
            'refresh': getRefreshToken()
        }
    )
}
