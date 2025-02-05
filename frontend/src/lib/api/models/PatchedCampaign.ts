/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbbreviatedUser } from './AbbreviatedUser';
export type PatchedCampaign = {
    readonly id?: number;
    readonly created_by?: AbbreviatedUser;
    name?: string;
    description?: string;
    readonly created_at?: string;
    readonly updated_at?: string;
    business_areas?: Array<number>;
};

