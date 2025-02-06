import {CancelablePromise, OpenAPIConfig} from "@/lib/api";
import {ApiRequestOptions} from "@/lib/api/core/ApiRequestOptions";

type RequestConfig = {
    url: RequestInfo | URL;
    method: string;
    data: any | undefined;
    accessToken: string | undefined;
    refreshToken: string | undefined;
}

type JWTToken = {
    exp: number;
    iat: number;
    jti: string;
    user_id: number;
    token_type: string;
    test: string;
}

let tokenRefreshPromise: Promise<any> | null = null;

export const getRequestConfig = (url: string, data: any = undefined, method: string | undefined = undefined, accessToken: string = "", refreshToken: string = "") => {
    const rq: RequestConfig = {
        url: url,
        method: method || 'GET',
        data: data,
        accessToken: accessToken || undefined,
        refreshToken: refreshToken || undefined,
    };

    return rq
}

export function setAccessToken(token: string) {
    localStorage.setItem('access-token', token);
    document.cookie = `access-token=${token}; path=/; max-age=3600`;
}

export function getAccessToken() {
    return localStorage.getItem('access-token');
}

export function setRefreshToken(token: string) {
    localStorage.setItem('refresh-token', token);
    document.cookie = `refresh-token=${token}; path=/; max-age=3600`;
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

export const getResponse = (requestConfig: RequestConfig): Promise<any> => {
    let accessToken = requestConfig.accessToken || getAccessToken() || "";

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
                        refresh: requestConfig.refreshToken || getRefreshToken()
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
                    requestConfig.accessToken = data.access
                    requestConfig.refreshToken = data.refresh
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

export const isDefined = <T>(value: T | null | undefined): value is Exclude<T, null | undefined> => {
    return value !== undefined && value !== null;
};

export const getQueryString = (params: Record<string, any>): string => {
    const qs: string[] = [];

    const append = (key: string, value: any) => {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };

    const process = (key: string, value: any) => {
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    process(key, v);
                });
            } else if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    process(`${key}[${k}]`, v);
                });
            } else {
                append(key, value);
            }
        }
    };

    Object.entries(params).forEach(([key, value]) => {
        process(key, value);
    });

    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }

    return '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
    const encoder = config.ENCODE_PATH || encodeURI;

    const path = options.url
        .replace('{api-version}', config.VERSION)
        .replace(/{(.*?)}/g, (substring: string, group: string) => {
            if (options.path?.hasOwnProperty(group)) {
                return encoder(String(options.path[group]));
            }
            return substring;
        });

    const url = `${config.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};

export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
    return new CancelablePromise((resolve, reject, onCancel) => {
        let requestConfig = getRequestConfig(
            getUrl(config, options),
            options.body,
            options.method
        );

        onCancel(() => {
            console.error('Request should be cancelled but not implemented')
        })

        getResponse(requestConfig).then((response) => {
            try {
                if (response.status === 204) {
                    resolve(null);
                } else {
                    resolve(response.json());
                }
            }finally {
                resolve(null)
            }
        }).catch((error) => {
            console.error('Error from server', error)
            reject(error);
        });
    })
}