/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserProfile } from './UserProfile';
export type UserWithPermissions = {
    readonly id: number;
    /**
     * The full name of the user if it exists, otherwise the username
     */
    readonly label: string | null;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    readonly profile: UserProfile;
    readonly permissions: string;
    readonly group_permissions: string;
    readonly is_staff: boolean;
    readonly is_superuser: boolean;
};

