/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserProfile = {
    readonly id?: number;
    type?: UserProfile.type;
    readonly user?: string;
};
export namespace UserProfile {
    export enum type {
        CONTRIBUTOR = 'CONTRIBUTOR',
        MODERATOR = 'MODERATOR',
        ADMIN = 'ADMIN',
    }
}

