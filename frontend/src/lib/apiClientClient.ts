import {ApiClient} from "@/lib/api/ApiClient";

import {useCookies} from "next-client-cookies";

export function getClientAPIClient() {
    const cookies = useCookies()

    return new ApiClient(
        {
            HEADERS: {
                'X-CSRFToken': cookies.get('csrftoken')
            }
        }
    )
}

