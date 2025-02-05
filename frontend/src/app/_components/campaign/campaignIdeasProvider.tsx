'use client';
// Provide ideas for a specific campaign

import {createContext, useContext, useEffect, useState} from "react";
import {ApiService} from "@/lib/api";

const IdeaContext = createContext(
    {
        ideas: [],
        refreshIdeas: () => {
            console.error('not implemented yet.')
        }
    }
);


export const CampaignIdeasProvider = ({campaignId, children}) => {
    const [ideas, setIdeas] = useState([]);

    const refreshIdeas = (campaignId: string) => {
        console.log('CampaignIdeasProvider fetch: "' + String(campaignId) + '"');
        ApiService.listIdeaDetails(campaignId).then(setIdeas)
    }

    useEffect(() => {
        refreshIdeas(campaignId)
    }, [campaignId]);

    return (
        <IdeaContext.Provider value={
            {
                ideas,
                'refreshIdeas': () => {
                    refreshIdeas(campaignId)
                }
            }
        }>
            {children}
        </IdeaContext.Provider>
    )
}

export const useCampaignIdeas = () => {
    return useContext(IdeaContext);
}