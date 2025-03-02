import {cookies} from "next/headers"
import {Client as APIClient} from './api/openapi.d.ts';
import OpenAPIClientAxios from 'openapi-client-axios';
import {useCookies} from "next-client-cookies";

export function getClientAPI() {
    const cookies = useCookies()
    const api = new OpenAPIClientAxios({
        axiosConfigDefaults: {
            definitions: null,
            headers: {
                'X-CSRFToken': cookies.get('csrftoken')
            }
        }
    });
    api.init<APIClient>();
    return api.getClient()
}


export async function getServerAPI() {
    const cookieStore = await cookies()

    const sessionId = cookieStore.get('sessionid')?.value

    console.log('sessionId', sessionId)
    console.log('process.env.BACKEND_URL', process.env.BACKEND_URL)

    const api = new OpenAPIClientAxios({
        axiosConfigDefaults: {
            baseURL: `${process.env.BACKEND_URL}/api/idea/16/`,
            definitions: null,
            headers: {
                'Cookie': `sessionid=${sessionId}`
            }
        }
    });
    api.init<APIClient>();
    return api.getClient()
}