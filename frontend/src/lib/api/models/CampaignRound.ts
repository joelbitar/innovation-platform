/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CampaignRound = {
    readonly id?: number;
    readonly created_by?: {
        readonly id?: number;
        /**
         * The full name of the user if it exists, otherwise the username
         */
        readonly label?: string;
    };
    name: string;
    description?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    campaign: number;
};

