/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbbreviatedUser } from './AbbreviatedUser';
export type Vote = {
    readonly id: number;
    readonly created_by: AbbreviatedUser;
    readonly created_at: string;
    readonly updated_at: string;
    idea: number;
    round: number;
};

