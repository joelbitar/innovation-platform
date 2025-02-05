'use client'

import React from 'react';
import {useEffect, useState} from "react";
import {IdeaService} from "@/lib/api";


export default function IdeaDetails({id}: { id: string }) {
    const [idea, setIdea] = useState(null);

    useEffect(() => {
        IdeaService.ideaIdeaRetrieve(id).then(setIdea)
    }, [id]);

    return (
        <div>
            {idea && (
                <div>
                    <h2>{idea.title}</h2>
                    <p>{idea.description}</p>
                </div>
            )}
        </div>
    )
}