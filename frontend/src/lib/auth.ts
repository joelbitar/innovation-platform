'use client';

import {apiClient, setAccessToken, setRefreshToken} from "@/lib/apiClient";

export function logger(useSWRNext) {
  return (key, fetcher, config) => {
    // Add logger to the original fetcher.
    const extendedFetcher = (...args) => {
      console.log('SWR Request:', key)
      return fetcher(...args)
    }
 
    // Execute the hook with the new fetcher.
    return useSWRNext(key, extendedFetcher, config)
  }

}


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