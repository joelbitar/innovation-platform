'use client'
import React from 'react';
import {CampaignRound, CampaignService} from "@/lib/api";
import {useForm} from "react-hook-form";

import {useEffect, useState} from "react";

type Props = {
    campaignId: string;
    roundId: string;
}
export default function RoundEditForm({campaignId, roundId}: Props) {
    const [round, setRound] = useState(undefined);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm<CampaignRound>()

    const onSubmit = (data: CampaignRound) => {
        CampaignService.campaignRoundUpdate(round.campaign, round.id, data).then(
            (data) => {
                reset()
            },
            (error) => {
                console.error(error)
            }
        )
    }

    useEffect(() => {
        CampaignService.campaignRoundRetrieve(campaignId, roundId).then(
            setRound
        )
    }, [roundId]);

    useEffect(() => {
        if (round) {
            reset(round)
        }
    }, [round]);

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

                <p>
                    --- Add fields this round ---
                </p>

                <input
                    type="submit"
                    value="Save"
                    className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"}
                />

            </form>
        </>
    )
}