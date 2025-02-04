'use client';

import React, {useState} from 'react';
import {ApiService} from "@/lib/api";

export function CampaignCreateForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        ApiService.createCampaign({
            name,
            description
        }).then(
            (data) => {
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
            <form>
                <label>
                    Name:
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name"/>
                </label>
                <label>
                    Description:
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} name="description"/>
                </label>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}