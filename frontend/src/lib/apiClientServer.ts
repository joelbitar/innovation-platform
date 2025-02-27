import {ApiClient} from "@/lib/api/ApiClient";

import {cookies} from "next/headers"

async function getSessionId() {
    const cookieStore = await cookies()

    return cookieStore.get('sessionid')?.value
}

export async function getClientAPIClient() {
    const sessionId = await getSessionId()

    return new ApiClient(
        {
            BASE: `${process.env.BACKEND_URL}`,
            HEADERS: {
                'Cookie': `sessionid=${sessionId}`
            }
        }
    )
}

