'use client'

import {useForm} from "react-hook-form";
import {Configuration, IdeaApi, IdeaInformation} from "@/lib/hejsan";
import {apiClientFactoryClient, getInitializationArguments} from "@/lib/apiClientFactoryServer";
import {useCookies} from "next-client-cookies";

export function IdeaInformationCreateForm({ideaId}: { ideaId: string }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<IdeaInformation>()

    /*
    const cookies = useCookies()

    const conf = new Configuration({
        'baseOptions': {
            'headers': {
                'X-CSRFToken': cookies.get('csrftoken')
            }
        }
    })

    const ideaApi = new IdeaApi(
        conf,
        'http://localhost:4000',
    )
     */
    const ideaApi = new IdeaApi(...getInitializationArguments())


    console.log('ideaID', ideaId)

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

                conf['baseOptions']['headers']['Content-Type'] = 'multipart/form-data'

                ideaApi.ideaInformationPartialUpdate(
                    data.data.id,
                    ideaId,
                    {
                        'file': file
                    },
                    conf
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