'use client'

import {useForm, SubmitHandler} from "react-hook-form";
import {Campaign, Idea, IdeaService} from "@/lib/api";



export function IdeaCreateForm({campaignId}: {campaignId: string}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<Campaign>()

    const onSubmit: (data: Idea) => void = (data: Idea) =>  {
        data.campaign = parseInt(campaignId, 10)

        IdeaService.ideaIdeaCreate(data).then(
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