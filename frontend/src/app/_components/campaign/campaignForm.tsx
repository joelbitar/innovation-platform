'use client';

import React from 'react';
import {useForm} from "react-hook-form";
import {Campaign} from "@/lib/api/models/Campaign";
import {ApiClient} from "@/lib/api/ApiClient";
import {getClientAPIClient} from "@/lib/apiClientClient";

export function CampaignCreateForm() {
    const apiClient = getClientAPIClient();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Campaign>()

    console.log('create campaign..?')
    const onSubmit: (data: Campaign) => void = (data: Campaign) =>  {
        console.log('posting...')
        apiClient.campaign.campaignCreate(data).then(
            (data) => {
                window.history.pushState(
                    {},
                    '',
                    `/campaign/${data.id}`
                )
                console.log(data)
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
                    Name:
                    <input {...register("name")}/>
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