'use client'

import {useForm} from "react-hook-form";
import {Campaign, Idea} from "@/lib/api";
import {getClientIdeaApi} from "@/lib/apiClientFactory";


export function IdeaCreateForm({campaignId}: {campaignId: string}) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Campaign>()

    const ideaApi = getClientIdeaApi()

    const onSubmit: (data: Idea) => void = (data: Idea) =>  {
        data.campaign = parseInt(campaignId, 10)

        ideaApi.ideaCreate(data).then(
            (data) => {
                reset()
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