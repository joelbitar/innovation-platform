'use client';

import React from 'react';
import {useForm} from "react-hook-form";
import {Campaign, CampaignService} from "@/lib/api";

export function CampaignCreateForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Campaign>()

    const onSubmit: (data: Campaign) => void = (data: Campaign) =>  {
        CampaignService.campaignCreate(data).then(
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