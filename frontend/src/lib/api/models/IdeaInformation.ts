/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbbreviatedUser } from './AbbreviatedUser';
export type IdeaInformation = {
    readonly id: number;
    readonly created_by: AbbreviatedUser;
    deleted_at?: string | null;
    restored_at?: string | null;
    transaction_id?: string | null;
    readonly created_at: string;
    readonly updated_at: string;
    title?: string;
    text?: string;
    file?: string | null;
    idea?: number;
    folder?: number | null;
    round?: number | null;
};

