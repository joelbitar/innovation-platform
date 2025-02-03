/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type IdeaDetail = {
    readonly id?: number;
    readonly created_by?: {
        readonly id?: number;
        /**
         * The full name of the user if it exists, otherwise the username
         */
        readonly label?: string;
    };
    round_votes: Array<{
        round_pk: number;
        count: number;
    }>;
    title: string;
    description: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    visibility?: IdeaDetail.visibility;
    campaign: number;
};
export namespace IdeaDetail {
    export enum visibility {
        PUBLIC = 'PUBLIC',
        BUSINESS_AREA = 'BUSINESS_AREA',
        PRIVATE = 'PRIVATE',
    }
}

