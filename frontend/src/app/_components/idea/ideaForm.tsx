'use client'

import {useForm, SubmitHandler} from "react-hook-form";
import {Campaign, Idea, IdeaService} from "@/lib/api";



export function IdeaForm({campaignId, afterSubmit}: {campaignId: string, afterSubmit: () => void}) {

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
                window.history.pushState(
                    {},
                    '',
                    `/campaign/${data.id}`
                )
                // Clear form
                reset()

                // Call post sumbmit callback
                afterSubmit()
            },
            (error) => {
                console.error(error)
            }
        )
    }

    return (
        <>
            <h1>Campaign Form</h1>
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