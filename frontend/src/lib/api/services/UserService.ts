/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserProfile } from '../models/UserProfile';
import type { UserWithPermissions } from '../models/UserWithPermissions';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * View to return data about a specific user
     * @returns UserWithPermissions
     * @throws ApiError
     */
    public userRetrieve(): CancelablePromise<UserWithPermissions> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/user/',
        });
    }
    /**
     * View to return data about the currently logged in user
     * @returns UserWithPermissions
     * @throws ApiError
     */
    public userMeRetrieve(): CancelablePromise<UserWithPermissions> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/user/me/',
        });
    }
    /**
     * View to work with profile for the currently logged in user
     * @returns UserProfile
     * @throws ApiError
     */
    public userMeProfileRetrieve(): CancelablePromise<UserProfile> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/user/me/profile/',
        });
    }
}
