'use client'

import {useForm, SubmitHandler} from "react-hook-form";
import {Campaign, Idea, IdeaService} from "@/lib/api";
import {useEffect, useState} from "react";

type Props = {
    ideaId: string
}

export function IdeaEditForm({ideaId}: Props) {
    const [campaign, setCampaign] = useState(undefined);

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Campaign>()

    useEffect(() => {
        IdeaService.ideaIdeaRetrieve(ideaId).then(
            setCampaign
        )
    }, [ideaId]);

    useEffect(() => {
        if (campaign) {
            reset(campaign)
        }
    }, [campaign]);

    const onSubmit: (data: Idea) => void = (data: Idea) =>  {
        IdeaService.ideaIdeaUpdate(ideaId, data).then(
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