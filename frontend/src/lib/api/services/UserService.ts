/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserProfile } from '../models/UserProfile';
import type { UserWithPermissions } from '../models/UserWithPermissions';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * @returns UserWithPermissions
     * @throws ApiError
     */
    public static userMeRetrieve(): CancelablePromise<UserWithPermissions> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/me/',
        });
    }
    /**
     * View to work with profile for the currently logged in user
     * @returns UserProfile
     * @throws ApiError
     */
    public static userMeProfileRetrieve(): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/me/profile/',
        });
    }
}
