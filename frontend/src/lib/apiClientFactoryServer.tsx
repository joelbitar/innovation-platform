import {BaseAPI} from "@/lib/hejsan/base";
import {Configuration} from "@/lib/hejsan";

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

export async function apiClientFactoryServer(api: typeof BaseAPI) {
    const basePath = 'http://backend.dkr:8000'

    const conf = await getConfiguration()

    return new api(
        conf,
        basePath,
    )
}

export function getClientConfiguration(): Configuration {
    const cookies = useCookies()
    return new Configuration({
        'baseOptions': {
            'headers': {
                'X-CSRFToken': cookies.get('csrftoken')
            }
        }
    })
}

export function getInitializationArguments(): [Configuration, string | undefined] {

    return [
        getClientConfiguration(),
        'http://localhost:4000'
    ]
}

export function apiClientFactoryClient(api: typeof BaseAPI) {

    return new api(...getInitializationArguments())
}