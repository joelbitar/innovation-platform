'use client';

import React, {useState} from 'react';
import {ApiService, Campaign} from "@/lib/api";
import {useForm, SubmitHandler} from "react-hook-form";

export function CampaignCreateForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Campaign>()

    const onSubmit: (data: Campaign) => void = (data: Campaign) =>  {
        ApiService.createCampaign(data).then(
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