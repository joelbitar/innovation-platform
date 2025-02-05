/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Campaign } from '../models/Campaign';
import type { CampaignRound } from '../models/CampaignRound';
import type { PatchedCampaign } from '../models/PatchedCampaign';
import type { PatchedCampaignRound } from '../models/PatchedCampaignRound';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CampaignService {
    /**
     * @returns Campaign
     * @throws ApiError
     */
    public static campaignList(): CancelablePromise<Array<Campaign>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/campaign/',
        });
    }
    /**
     * @param requestBody
     * @returns Campaign
     * @throws ApiError
     */
    public static campaignCreate(
        requestBody: Campaign,
    ): CancelablePromise<Campaign> {
        return __request(OpenAPI, {
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
    public static campaignRoundList(
        campaignId: string,
    ): CancelablePromise<Array<CampaignRound>> {
        return __request(OpenAPI, {
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
    public static campaignRoundCreate(
        campaignId: string,
        requestBody: CampaignRound,
    ): CancelablePromise<CampaignRound> {
        return __request(OpenAPI, {
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
    public static campaignRoundRetrieve(
        campaignId: string,
        id: string,
    ): CancelablePromise<CampaignRound> {
        return __request(OpenAPI, {
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
    public static campaignRoundUpdate(
        campaignId: string,
        id: string,
        requestBody: CampaignRound,
    ): CancelablePromise<CampaignRound> {
        return __request(OpenAPI, {
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
    public static campaignRoundPartialUpdate(
        campaignId: string,
        id: string,
        requestBody?: PatchedCampaignRound,
    ): CancelablePromise<CampaignRound> {
        return __request(OpenAPI, {
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
    public static campaignRoundDestroy(
        campaignId: string,
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
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
    public static campaignRetrieve(
        id: number,
    ): CancelablePromise<Campaign> {
        return __request(OpenAPI, {
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
    public static campaignUpdate(
        id: number,
        requestBody: Campaign,
    ): CancelablePromise<Campaign> {
        return __request(OpenAPI, {
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
    public static campaignPartialUpdate(
        id: number,
        requestBody?: PatchedCampaign,
    ): CancelablePromise<Campaign> {
        return __request(OpenAPI, {
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
    public static campaignDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/campaign/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
