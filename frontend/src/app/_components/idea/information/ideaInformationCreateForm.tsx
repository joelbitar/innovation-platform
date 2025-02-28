'use client'

import {useForm, SubmitHandler} from "react-hook-form";
import {IdeaInformation} from "@/lib/api";
import {getClientAPIClient} from "@/lib/apiClientClient";


export function IdeaInformationCreateForm({ideaId}: {ideaId: string}) {
    const apiClient = getClientAPIClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IdeaInformation>()

    const onSubmit: (data: IdeaInformation) => void = (data: IdeaInformation) =>  {
        apiClient.idea.ideaIdeaInformationCreate(ideaId).then(
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
                    <textarea {...register("text")}/>
                </label>
                <label>
                    File:
                    <input type="file" {...register("file")} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}