/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Idea = {
    readonly id?: number;
    readonly created_by?: {
        readonly id?: number;
        readonly label?: string;
        /**
         * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
         */
        username: string;
        email?: string;
        first_name?: string;
        last_name?: string;
    };
    title: string;
    description: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    visibility?: Idea.visibility;
    campaign: number;
};
export namespace Idea {
    export enum visibility {
        PUBLIC = 'PUBLIC',
        BUSINESS_AREA = 'BUSINESS_AREA',
        PRIVATE = 'PRIVATE',
    }
}

