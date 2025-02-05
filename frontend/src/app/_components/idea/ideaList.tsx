'use client'


import {Idea} from "@/lib/api";
import React from "react";

type IdeaListProps = {
    ideas: Idea[]
}

export default function IdeaList({ideas}: IdeaListProps) {

    return (
        <>
            <ul>
                {ideas.map((idea: Idea) => (
                    <li key={idea.id}>
                        {idea.title}
                    </li>
                ))}
            </ul>
        </>
    )
}