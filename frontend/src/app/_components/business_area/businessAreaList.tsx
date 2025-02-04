'use client';

import {useEffect, useState} from "react";
import {ApiService} from "@/lib/api";

export function BusinessAreaList() {
    const [businessAreas, setBusinessAreas] = useState([]);

    useEffect(() => {
        ApiService.listBusinessAreas().then(
            setBusinessAreas
        )
    }, []);

    return (
        <>
            <h1>Business Areas</h1>
            <ul>
                {businessAreas.map((businessArea) => (
                    <li key={businessArea.id}>
                        {businessArea.name}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default BusinessAreaList;