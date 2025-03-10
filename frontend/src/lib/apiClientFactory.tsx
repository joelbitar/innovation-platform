import {CampaignApi, Configuration, FileApi, IdeaApi} from "@/lib/api";

async function getServerConfiguration() {
    // Import cookies from next/headers
    const headersModule = import('next/headers')
    const {cookies} = await headersModule

    // Get cookie store
    const cookieStore = await cookies()
    // Server side
    // Applicable for server-side, will be sent by client automatically
    const sessionId = cookieStore.get('sessionid')?.value

    const headers = {
        'Cookie': `sessionid=${sessionId}`,
        'X-CSRFToken': cookieStore.get('csrftoken')?.value
    }

    return new Configuration({
        'baseOptions': {
            'headers': headers
        }
    })
}


function getClientConfiguration(extraHeaders = {}): Configuration {
    // Get cookie "csrftoken" from browser window
    let csrftoken = document.cookie.match(/csrftoken=([^;]*)/)?.[1]
    let headers = {
        'X-CSRFToken': csrftoken
    }
    return new Configuration(
        {
            'baseOptions': {
                'headers': {
                    ...headers,
                    ...extraHeaders
                }
            }
        }
    )
}

function getMultipartHeaders() {
    return {
        'Content-Type': 'multipart/form-data'
    }
}


function clientAPIFactory(api, extraHeaders = {}) {
    let conf = getClientConfiguration(extraHeaders)

    return new api(
        conf,
        'http://localhost:4000'
    )
}

export async function serverAPIFactory(api) {
    const basePath = 'http://backend.dkr:8000'

    const conf = await getServerConfiguration()

    return new api(
        conf,
        basePath,
    )
}

/**
 * Client API methods
 */
export function getClientIdeaApi(): IdeaApi {
    return clientAPIFactory(IdeaApi)
}

export function getClientFileApi(): FileApi {
    return clientAPIFactory(FileApi, getMultipartHeaders())
}


export function getClientCampaignApi(): CampaignApi {
    return clientAPIFactory(CampaignApi)
}

/**
 * Server API methods
 */

export function getServerIdeaApi(): Promise<IdeaApi> {
    return serverAPIFactory(IdeaApi)
}

export function getServerCampaignApi(): Promise<CampaignApi> {
    return serverAPIFactory(CampaignApi)
}