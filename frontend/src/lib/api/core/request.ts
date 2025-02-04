import {CancelablePromise, OpenAPIConfig} from "@/lib/api";
import {ApiRequestOptions} from "@/lib/api/core/ApiRequestOptions";

type RequestConfig = {
    url: RequestInfo | URL,
    method: string,
    data: any | undefined
}

type JWTToken = {
    exp: number
    iat: number
    jti: string
    user_id: number
    token_type: string
    test: string
}

let tokenRefreshPromise: Promise<any> | null = null;

const getRequestConfig = (url: string, data: any = undefined, method: string | undefined = undefined) => {
    const rq: RequestConfig = {
        url: url,
        method: method || 'GET',
        data: data
    };

    return rq
}

export function setAccessToken(token: string) {
    localStorage.setItem('access-token', token);
}

export function getAccessToken() {
    return localStorage.getItem('access-token');
}

export function setRefreshToken(token: string) {
    localStorage.setItem('refresh-token', token);
}

export function getRefreshToken() {
    return localStorage.getItem('refresh-token');
}

export function decodeJWTToken(token: string): JWTToken {
    // Decode the token
    let JWTToken: JWTToken;

    return JWTToken = {
        ...(JSON.parse(atob(token.split('.')[1]))),
    }
}

export function isExpired(token: string) {
    // Check if the token is expired

    // Decode the token
    let decodedToken = decodeJWTToken(token);

    if (decodedToken) {
        // Allow for a 2-second buffer
        return (decodedToken.exp) < ((Math.floor(Date.now() / 1000)) + 2);
    }

    return false;
}

const getResponse = (requestConfig: RequestConfig): Promise<any> => {
    let accessToken = getAccessToken() || "";

    let headers: any = {}

    if (requestConfig.method === 'POST' || requestConfig.method === 'PUT' || requestConfig.method === 'PATCH') {
        headers['Content-Type'] = 'application/json';
    }

    // Request data to the fetch function
    let requestData: RequestInit = {
        method: requestConfig.method,
        headers: headers
    }

    // in case we have data to send
    if (requestConfig.data) {
        requestData.body = JSON.stringify(requestConfig.data);
    }

    if ((!!accessToken && !isExpired(accessToken)) || requestConfig.url.startsWith('/api/auth/')) {
        // The token is valid
        // or the request is to the auth endpoint
        // In any case we shall add the token to the headers and make the request.
        headers['Authorization'] = `Bearer ${accessToken}`;

        return fetch(requestConfig.url, requestData)
    } else {
        // The token is expired
        // We shall try to refresh the token
        // Then make the request
        return new Promise((resolve, reject) => {
            /**
             * If there is a token refresh request in flight, we will wait for it to finish, then make our request.
             * If there is no refresh request in flight, we will make a new one. Set it to the global variable and wait for it to finish.
             */

            if (tokenRefreshPromise) {
                //console.log('there is a token refresh request in flight. Waiting for it to finish')
                tokenRefreshPromise.then(() => {
                    console.log('Token refresh-promise is done. make the request')
                    resolve(getResponse(requestConfig));
                }).catch((error) => {
                    //console.error('Error refreshing token', error)
                    reject(error);
                })
            } else {
                // Make a new token refresh request
                console.info('Refreshing token, original request will be executed after token is refreshed')

                tokenRefreshPromise = fetch('/api/auth/token/refresh/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh: getRefreshToken()
                    })
                }).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        setAccessToken('');
                        setRefreshToken('');
                        throw new Error('Error refreshing token');
                    }
                }).then((data) => {
                    setAccessToken(data.access);
                    setRefreshToken(data.refresh);
                    resolve(getResponse(requestConfig));
                }).catch((error) => {
                    console.error('Error refreshing token', error)
                    reject(error);
                }).finally(
                    () => {
                        tokenRefreshPromise = null;
                    }
                )
            }
        })
    }
}

export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
    return new CancelablePromise((resolve, reject, onCancel) => {
        let requestConfig = getRequestConfig(
            `${config.BASE}${options.url}`,
            options.body,
            options.method
        );

        onCancel(() => {
            console.error('Request should be cancelled but not implemented')
        })

        getResponse(requestConfig).then((response) => {
            resolve(response.json());
        }).catch((error) => {
            console.error('Error from server', error)
            reject(error);
        });
    })
}