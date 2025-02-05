'use client';
// Provide ideas for a specific campaign

import {createContext, useContext, useEffect, useState} from "react";
import {ApiService} from "@/lib/api";

const IdeaContext = createContext(
    {
        ideas: [],
    }
);


export const CampaignIdeasProvider = ({campaignId, children}) => {
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        console.log('CampaignIdeasProvider fetch: "' + String(campaignId) + '"');
        ApiService.listIdeaDetails(campaignId).then(
            setIdeas
        )
    }, [campaignId]);

    return (
        <IdeaContext.Provider value={{ideas}}>
            {children}
        </IdeaContext.Provider>
    )
}

export const useCampaignIdeas = () => {
    return useContext(IdeaContext);
}