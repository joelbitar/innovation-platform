/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Idea } from '../models/Idea';
import type { IdeaDetail } from '../models/IdeaDetail';
import type { PatchedIdea } from '../models/PatchedIdea';
import type { PatchedVote } from '../models/PatchedVote';
import type { Vote } from '../models/Vote';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IdeaService {
    /**
     * @param campaignId
     * @returns IdeaDetail
     * @throws ApiError
     */
    public static ideaCampaignIdeaList(
        campaignId: string,
    ): CancelablePromise<Array<IdeaDetail>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/campaign/{campaign_id}/idea/',
            path: {
                'campaign_id': campaignId,
            },
        });
    }
    /**
     * @returns Idea
     * @throws ApiError
     */
    public static ideaIdeaList(): CancelablePromise<Array<Idea>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/idea/',
        });
    }
    /**
     * @param requestBody
     * @returns Idea
     * @throws ApiError
     */
    public static ideaIdeaCreate(
        requestBody: Idea,
    ): CancelablePromise<Idea> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/idea/idea/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this idea.
     * @returns IdeaDetail
     * @throws ApiError
     */
    public static ideaIdeaRetrieve(
        id: number,
    ): CancelablePromise<IdeaDetail> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/idea/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this idea.
     * @param requestBody
     * @returns Idea
     * @throws ApiError
     */
    public static ideaIdeaUpdate(
        id: number,
        requestBody: Idea,
    ): CancelablePromise<Idea> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/idea/idea/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this idea.
     * @param requestBody
     * @returns Idea
     * @throws ApiError
     */
    public static ideaIdeaPartialUpdate(
        id: number,
        requestBody?: PatchedIdea,
    ): CancelablePromise<Idea> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/idea/idea/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this idea.
     * @returns void
     * @throws ApiError
     */
    public static ideaIdeaDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/idea/idea/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param ideaId
     * @param roundId
     * @returns Vote
     * @throws ApiError
     */
    public static ideaRoundIdeaVoteMeList(
        ideaId: string,
        roundId: string,
    ): CancelablePromise<Array<Vote>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/vote/me/',
            path: {
                'idea_id': ideaId,
                'round_id': roundId,
            },
        });
    }
    /**
     * @param ideaId
     * @param roundId
     * @param requestBody
     * @returns Vote
     * @throws ApiError
     */
    public static ideaRoundIdeaVoteMeCreate(
        ideaId: string,
        roundId: string,
        requestBody: Vote,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/vote/me/',
            path: {
                'idea_id': ideaId,
                'round_id': roundId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param roundId
     * @returns Vote
     * @throws ApiError
     */
    public static ideaRoundVoteMeList(
        roundId: string,
    ): CancelablePromise<Array<Vote>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/round/{round_id}/vote/me/',
            path: {
                'round_id': roundId,
            },
        });
    }
    /**
     * @returns Vote
     * @throws ApiError
     */
    public static ideaVoteList(): CancelablePromise<Array<Vote>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/vote/',
        });
    }
    /**
     * @param requestBody
     * @returns Vote
     * @throws ApiError
     */
    public static ideaVoteCreate(
        requestBody: Vote,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/idea/vote/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this vote.
     * @returns Vote
     * @throws ApiError
     */
    public static ideaVoteRetrieve(
        id: number,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/idea/vote/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this vote.
     * @param requestBody
     * @returns Vote
     * @throws ApiError
     */
    public static ideaVoteUpdate(
        id: number,
        requestBody: Vote,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/idea/vote/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this vote.
     * @param requestBody
     * @returns Vote
     * @throws ApiError
     */
    public static ideaVotePartialUpdate(
        id: number,
        requestBody?: PatchedVote,
    ): CancelablePromise<Vote> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/idea/vote/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this vote.
     * @returns void
     * @throws ApiError
     */
    public static ideaVoteDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/idea/vote/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
