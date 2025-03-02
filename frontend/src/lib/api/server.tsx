import {cookies} from 'next/headers'
import createClient from 'openapi-fetch'
import type {paths} from './schema.d.ts'

export async function getServerAPI() {
    const cookieStore = await cookies()

    return createClient<paths>({
        baseUrl: `${process.env.BACKEND_URL}`,
        headers: {
            'Cookie': `sessionid=${cookieStore.get('sessionid')?.value}`
        }
    })
}