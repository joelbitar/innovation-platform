/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomTokenObtainPair } from '../models/CustomTokenObtainPair';
import type { TokenBlacklistView } from '../models/TokenBlacklistView';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @param requestBody
     * @returns CustomTokenObtainPair
     * @throws ApiError
     */
    public static authTokenCreate(
        requestBody: CustomTokenObtainPair,
    ): CancelablePromise<CustomTokenObtainPair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns TokenBlacklistView
     * @throws ApiError
     */
    public static authTokenBlacklistCreate(
        requestBody: TokenBlacklistView,
    ): CancelablePromise<TokenBlacklistView> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/token/blacklist/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Takes a refresh type JSON web token and returns an access type JSON web
     * token if the refresh token is valid.
     * @param requestBody
     * @returns TokenRefresh
     * @throws ApiError
     */
    public static authTokenRefreshCreate(
        requestBody: TokenRefresh,
    ): CancelablePromise<TokenRefresh> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
