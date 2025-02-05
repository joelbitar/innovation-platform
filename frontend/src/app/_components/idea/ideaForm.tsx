'use client'

import {ApiService, Campaign, Idea} from "@/lib/api";
import {useForm, SubmitHandler} from "react-hook-form";



export function IdeaForm({campaignId, afterSubmit}: {campaignId: string, afterSubmit: () => void}) {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Campaign>()

    console.log('IdeaForm: "' + String(campaignId) + '"');

    const onSubmit: (data: Idea) => void = (data: Idea) =>  {
        data.campaign = parseInt(campaignId, 10)

        ApiService.createIdea(data).then(
            (data) => {
                window.history.pushState(
                    {},
                    '',
                    `/campaign/${data.id}`
                )
                console.log(data)
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