/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessArea } from '../models/BusinessArea';
import type { PatchedBusinessArea } from '../models/PatchedBusinessArea';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class BusinessService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns BusinessArea
     * @throws ApiError
     */
    public businessBusinessAreaList(): CancelablePromise<Array<BusinessArea>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/business/business_area//',
        });
    }
    /**
     * @param requestBody
     * @returns BusinessArea
     * @throws ApiError
     */
    public businessBusinessAreaCreate(
        requestBody: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return this.httpRequest.request({
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
    public businessBusinessAreaRetrieve(
        id: number,
    ): CancelablePromise<BusinessArea> {
        return this.httpRequest.request({
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
    public businessBusinessAreaUpdate(
        id: number,
        requestBody: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return this.httpRequest.request({
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
    public businessBusinessAreaPartialUpdate(
        id: number,
        requestBody?: PatchedBusinessArea,
    ): CancelablePromise<BusinessArea> {
        return this.httpRequest.request({
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
    public businessBusinessAreaDestroy(
        id: number,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/business/business_area//{id}/',
            path: {
                'id': id,
            },
        });
    }
}
