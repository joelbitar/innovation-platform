'use client'

import {useForm} from "react-hook-form";
import {IdeaInformation} from "@/lib/hejsan";
import {getClientFileApi, getClientIdeaApi, getMultipartHeaders} from "@/lib/apiClientFactory";

export function IdeaInformationCreateForm({ideaId}: { ideaId: string }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IdeaInformation>()

    const ideaApi = getClientIdeaApi()
    const ideaFileApi = getClientFileApi()

    const onSubmit: (data: IdeaInformation) => void = (data: IdeaInformation) => {
        const file = data.file[0]

        delete data.file

        ideaApi.ideaInformationCreate(
            ideaId,
            data,
        ).then(
            (data) => {
                console.log('success', data.data.id)
                const formData = new FormData()
                formData.append('file', file)

                ideaFileApi.fileCreate(
                    {
                        'related_model': 'idea.Information',
                        'related_pk': data.data.id,
                        'file': file
                    },
                ).then(
                    (d) => {
                        console.log('success', d)
                    },
                    (e) => {
                        console.error('error', e)
                    }
                )

                //reset()
            },
            (error) => {
                console.error('error', error)
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
                    <input type="file" {...register("file")}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}