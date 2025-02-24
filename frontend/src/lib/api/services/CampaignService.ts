/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Campaign } from '../models/Campaign';
import type { CampaignRound } from '../models/CampaignRound';
import type { PatchedCampaign } from '../models/PatchedCampaign';
import type { PatchedCampaignRound } from '../models/PatchedCampaignRound';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class CampaignService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns Campaign
     * @throws ApiError
     */
    public campaignList(): CancelablePromise<Array<Campaign>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/campaign/',
        });
    }
    /**
     * @param requestBody
     * @returns Campaign
     * @throws ApiError
     */
    public campaignCreate(
        requestBody: Campaign,
    ): CancelablePromise<Campaign> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/campaign/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param campaignId
     * @returns CampaignRound
     * @throws ApiError
     */
    public campaignRoundList(
        campaignId: string,
    ): CancelablePromise<Array<CampaignRound>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/campaign/{campaign_id}/round/',
            path: {
                'campaign_id': campaignId,
            },
        });
    }
    /**
     * @param campaignId
     * @param requestBody
     * @returns CampaignRound
     * @throws ApiError
     */
    public campaignRoundCreate(
        campaignId: string,
        requestBody: CampaignRound,
    ): CancelablePromise<CampaignRound> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/campaign/{campaign_id}/round/',
            path: {
                'campaign_id': campaignId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param campaignId
     * @param id
     * @returns CampaignRound
     * @throws ApiError
     */
    public campaignRoundRetrieve(
        campaignId: string,
        id: string,
    ): CancelablePromise<CampaignRound> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/campaign/{campaign_id}/round/{id}/',
            path: {
                'campaign_id': campaignId,
                'id': id,
            },
        });
    }
    /**
     * @param campaignId
     * @param id
     * @param requestBody
     * @returns CampaignRound
     * @throws ApiError
     */
    public campaignRoundUpdate(
        campaignId: string,
        id: string,
        requestBody: CampaignRound,
    ): CancelablePromise<CampaignRound> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/campaign/{campaign_id}/round/{id}/',
            path: {
                'campaign_id': campaignId,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param campaignId
     * @param id
     * @param requestBody
     * @returns CampaignRound
     * @throws ApiError
     */
    public campaignRoundPartialUpdate(
        campaignId: string,
        id: string,
        requestBody?: PatchedCampaignRound,
    ): CancelablePromise<CampaignRound> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/campaign/{campaign_id}/round/{id}/',
            path: {
                'campaign_id': campaignId,
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param campaignId
     * @param id
     * @returns void
     * @throws ApiError
     */
    public campaignRoundDestroy(
        campaignId: string,
        id: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/campaign/{campaign_id}/round/{id}/',
            path: {
                'campaign_id': campaignId,
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this campaign.
     * @returns Campaign
     * @throws ApiError
     */
    public campaignRetrieve(
        id: number,
    ): CancelablePromise<Campaign> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/campaign/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this campaign.
     * @param requestBody
     * @returns Campaign
     * @throws ApiError
     */
    public campaignUpdate(
        id: number,
        requestBody: Campaign,
    ): CancelablePromise<Campaign> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/campaign/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this campaign.
     * @param requestBody
     * @returns Campaign
     * @throws ApiError
     */
    public campaignPartialUpdate(
        id: number,
        requestBody?: PatchedCampaign,
    ): CancelablePromise<Campaign> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/campaign/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this campaign.
     * @returns void
     * @throws ApiError
     */
    public campaignDestroy(
        id: number,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/campaign/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
