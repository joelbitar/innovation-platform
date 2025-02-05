'use client'
import React from 'react';
import {CampaignRound, CampaignService} from "@/lib/api";
import {useForm} from "react-hook-form";

type Props = {
    campaignId: string
}
export default function CreateRoundForm({campaignId}: Props) {


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CampaignRound>()

    const onSubmit = (data: CampaignRound) => {
        data.campaign = parseInt(campaignId, 10)
        CampaignService.campaignRoundCreate(campaignId, data).then(
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
                    Name:
                    <input {...register("name")} />
                </label>
                <label>
                    Description:
                    <input {...register("description")} />
                </label>
                <input
                    type="submit"
                    value="Create"
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"}
                />
            </form>
        </>
    )
}