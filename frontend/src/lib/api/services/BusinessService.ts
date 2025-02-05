/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessArea } from '../models/BusinessArea';
import type { PatchedBusinessArea } from '../models/PatchedBusinessArea';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BusinessService {
    /**
     * @returns BusinessArea
     * @throws ApiError
     */
    public static businessBusinessAreaList(): CancelablePromise<Array<BusinessArea>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/business_area//',
        });
    }
    /**
     * @param requestBody
     * @returns BusinessArea
     * @throws ApiError
     */
    public static businessBusinessAreaCreate(
        requestBody: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/business/business_area//',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this business area.
     * @returns BusinessArea
     * @throws ApiError
     */
    public static businessBusinessAreaRetrieve(
        id: number,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/business_area//{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this business area.
     * @param requestBody
     * @returns BusinessArea
     * @throws ApiError
     */
    public static businessBusinessAreaUpdate(
        id: number,
        requestBody: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/business/business_area//{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this business area.
     * @param requestBody
     * @returns BusinessArea
     * @throws ApiError
     */
    public static businessBusinessAreaPartialUpdate(
        id: number,
        requestBody?: PatchedBusinessArea,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/business/business_area//{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this business area.
     * @returns void
     * @throws ApiError
     */
    public static businessBusinessAreaDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/business/business_area//{id}/',
            path: {
                'id': id,
            },
        });
    }
}
