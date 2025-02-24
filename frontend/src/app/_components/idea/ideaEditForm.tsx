'use client'

import {useForm, SubmitHandler} from "react-hook-form";
import {getClientAPIClient} from "@/lib/apiClientClient";
import {useEffect, useState} from "react";
import {Campaign, Idea} from "@/lib/api";

type Props = {
    ideaId: number
}

export function IdeaEditForm({ideaId}: Props) {
    const apiClient = getClientAPIClient()
    const [campaign, setCampaign] = useState(undefined);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Campaign>()

    useEffect(() => {
        apiClient.idea.ideaIdeaRetrieve(ideaId).then(
            setCampaign
        )
    }, [ideaId]);

    useEffect(() => {
        if (campaign) {
            reset(campaign)
        }
    }, [campaign]);

    const onSubmit: (data: Idea) => void = (data: Idea) =>  {
        apiClient.idea.ideaIdeaUpdate(ideaId, data).then(
            (data) => {

            },
            (error) => {
                console.error(error)
            }
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Title:
                    <input {...register("title")}/>
                </label>
                <label>
                    Description:
                    <textarea {...register("description")}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}