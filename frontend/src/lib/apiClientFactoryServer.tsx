import {BaseAPI} from "@/lib/hejsan/base";
import {Configuration, FileApi, IdeaApi} from "@/lib/hejsan";

import {useCookies} from "next-client-cookies";
import {getClientAPI} from "@/lib/apiClient";
import {getClientAPIClient} from "@/lib/apiClientClient";

async function getSessionId() {
    const headersModule = import('next/headers')
    const {cookies} = await headersModule
    const cookieStore = await cookies()

    return cookieStore.get('sessionid')?.value
}

async function getConfiguration() {
    let headers = {
        'X-CSRFToken': 'SCr04i4a1mETYyb1xJIKyTUUVAi32eOc'
    }

    // Server side
    // Applicable for server-side, will be sent by client automatically
    const sessionId = await getSessionId()
    headers['Cookie'] = `sessionid=${sessionId}`

    return new Configuration({
        'baseOptions': {
            'headers': headers
        }
    })
}


export function getClientConfiguration(extraHeaders = {}): Configuration {
    const cookies = useCookies()
    return new Configuration(
        {
            'baseOptions': {
                'headers': {
                    ...{
                        'X-CSRFToken': cookies.get('csrftoken'),
                    },
                    ...extraHeaders
                }
            }
        }
    )
}

export function getMultipartHeaders() {
    return {
        'Content-Type': 'multipart/form-data'
    }
}


export function clientAPIFactory(api, extraHeaders = {}) {
    let conf = getClientConfiguration(extraHeaders)

    return new api(
        conf,
        'http://localhost:4000'
    )
}

export function getClientIdeaApi(): IdeaApi {
    return clientAPIFactory(IdeaApi)
}

export function getClientFileApi() : FileApi {
    return clientAPIFactory(FileApi, getMultipartHeaders())
}

export async function serverAPIFactory(api: typeof BaseAPI) {
    const basePath = 'http://backend.dkr:8000'

    const conf = await getConfiguration()

    return new api(
        conf,
        basePath,
    )
}