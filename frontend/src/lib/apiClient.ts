/*
DRP code for doing the same

axios.interceptors.request.use(
  (config) => {
    return new Promise((resolve, reject) => {
      // Access token
      let token = localStorage.getItem('access-token');
      let languageCode = localStorage.getItem('language')

      config.headers = {
        ...config.headers,
        ...{
          'Accept-Language': languageCode ?? 'en'
        }
      }

      // No token at all resolve the promise directly thus making the request
      // This is done for all requests, so we will try to make the real request if there is no token.
      // This should only happen if the user has never logged in the site and is requesting some page.
      if (!token) {
        return resolve(config);
      }

      // Either just make the request as is, or try to refresh token and then make the request
      if (!isExpired(token) || config.url.startsWith('/api/auth/')) {
        // This request is to /api/auth/* OR has a valid token.

        // Adding header, Authorization: Bearer [Token]
        config.headers.Authorization = 'Bearer ' + token;

        // Enable original request to be dispatched
        resolve(config);
      } else {
        // Try to refresh to access token and then make the original requuest.

        // What if refresh token is expired?
        let refresh_token = localStorage.getItem("refresh-token");

        // Old Login.
        // If the refresh token is invalid we are pretty much screwed.
        // We will try to make the original request. It will return a 401 and the redirect-to-login interceptor
        // will take care of the rest.
        if (isExpired(refresh_token)) {
          return resolve(config);
        }

        // Queueing this request.
        store.refresh_token_requests_waiting.push(
          {
            'axios_config': config,
            'resolve_func': resolve,
            'reject_func': reject,
            'queued_date': new Date(),
          }
        )

        if (store.refresh_token_request_in_flight === true) {
          // There are requests in flight, we will wait for them
          return null
        }

        // Enabling the refresh_token_request_in_flight variable, will prevent more token refresh requests
        store.refresh_token_request_in_flight = true

        // Refresh the access token.
        axios.post(
          '/api/auth/token/refresh/',
          {
            "refresh": refresh_token,
          }
        ).then(
          (response) => {
            // Token is refreshed and everything is a-ok.
            const new_access_token = response.data.access;

            // Setting the new access tokens in localStorage for later use
            localStorage.setItem("access-token", new_access_token);
            localStorage.setItem("refresh-token", response.data.refresh);

            // Resolve all the other ones that are backed up, including the original request
            let backed_up_request
            while ((backed_up_request = store.refresh_token_requests_waiting.shift()) !== undefined) {

              // If the request is Older than 2 seconds, just ignore it.
              if (!backed_up_request.queued_date.getTime() > (new Date().getTime() - 2000)) {
                console.error('Request is to old, ignoring it.', backed_up_request.axios_config.url)
                backed_up_request.reject_func(backed_up_request.axios_config)
                continue
              }

              // Set new access token
              backed_up_request.axios_config.headers.Authorization = 'Bearer ' + new_access_token;

              // resolve the config, will execute the request.
              backed_up_request.resolve_func(backed_up_request.axios_config)
            }
          },
          (error) => {
            // Seems to be an error with the refresh of tokens, we should clear the access and refresh tokens.
            localStorage.setItem("access-token", "");
            localStorage.setItem("refresh-token", "");

            console.error('Error when trying to refresh token')

            // dispatch original request
            // perhaps we should reject the request and redirect the user?
            resolve(config);
          }
        ).finally(() => {
          // Reset the refresh token in flight variable. Since we are done with that.
          store.refresh_token_request_in_flight = false
        });
      }
    })
  }
);

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // error
    if (error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('detail')) {
      console.log(
        'Error in response',
        error.response.data.detail
      )
    }

    // In the case of DRP_ERROR is returned, set it in the store so it can be picked up.
    if(error.response.hasOwnProperty('data') && error.response.data.hasOwnProperty('error_type') && error.response.data.error_type === 'DRP_ERROR') {
      console.error('DRP_ERROR', error.response.data)
      store.drp_error_from_request_response = error.response.data
    }

    if (error.response.hasOwnProperty('config') && error.response.config.hasOwnProperty('url')) {
      // If unauthorized and doing anything except auth we should clear the tokens and redirect to log in
      if (error.response.status === 401 && !error.response.config.url.startsWith("/api/auth/")) {
        localStorage.setItem("access-token", "");
        localStorage.setItem("refresh-token", "");

        let redirect = ""
        if (window.location.pathname !== "/") {
          redirect = "?redirect=" + window.location.pathname
        }

        // Redirect users to the login page with redirect path.
        window.location.href = "/login/" + redirect
      }
    }

    return Promise.reject(error);
  }
);
 */

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

const getRequestConfig = (url: RequestInfo | URL, data: any = undefined, method: string | undefined = undefined) => {
    const rq: RequestConfig = {
        url: url,
        method: method || 'GET',
        data: data
    };

    return rq
}

export function setAccessToken(token: string | undefined) {
    localStorage.setItem('access-token', token || "");
}

function sanitizeValue(value: string | null | undefined): string | undefined {
    if (!value || value === 'null' || value === 'undefined') {
        return undefined;
    }

    return value;
}

export function getAccessToken(): string | undefined {
    return sanitizeValue(localStorage.getItem('access-token'));
}

export function setRefreshToken(token: string | undefined) {
    localStorage.setItem('refresh-token', token || "");
}

export function getRefreshToken() {
    return sanitizeValue(localStorage.getItem('refresh-token'));
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
    let accessToken = getAccessToken() || undefined;

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

    if ((accessToken && !isExpired(accessToken)) || requestConfig.url.startsWith('/api/auth/')) {
        // The token is valid
        // or the request is to the auth endpoint
        // In any case we shall add the token to the headers and make the request.
        headers['Authorization'] = `Bearer ${accessToken}`;

        return fetch(requestConfig.url, requestData)
    } else {
        if (!accessToken && !getRefreshToken()) {
            console.log('No need to try to make the request. Users needs to go and log in')
            return new Promise((resolve, reject) => {
                // Send browser to Login page at; /login
                window.location.href = '/login/';
                reject('No access token and no refresh token')
            })
        }

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
                    console.log('Token refresh-promise is done. make the original request')
                    resolve(getResponse(requestConfig));
                }).catch((error) => {
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
                        // This happend when the refresh token is invalid or old.
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

const apiRequest = (requestConfig: RequestConfig) => {
    return new Promise((resolve, reject) => {
        getResponse(requestConfig).then((response) => {
            resolve(response.json());
        }).catch((error) => {
            console.error('Error from server', error)
            reject(error);
        });
    })
}

export const apiClient = {
    'get': (url: RequestInfo | URL) => {
        return apiRequest(getRequestConfig(url));
    },
    'post': (url: RequestInfo | URL, data: any): Promise<any> => {
        return apiRequest(getRequestConfig(url, data, 'POST'));
    },
}