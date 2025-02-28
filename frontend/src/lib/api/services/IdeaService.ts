/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Idea } from '../models/Idea';
import type { IdeaDetail } from '../models/IdeaDetail';
import type { IdeaInformation } from '../models/IdeaInformation';
import type { PatchedIdea } from '../models/PatchedIdea';
import type { PatchedIdeaInformation } from '../models/PatchedIdeaInformation';
import type { PatchedVote } from '../models/PatchedVote';
import type { Vote } from '../models/Vote';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class IdeaService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @param campaignId
     * @returns IdeaDetail
     * @throws ApiError
     */
    public ideaCampaignIdeaList(
        campaignId: string,
    ): CancelablePromise<Array<IdeaDetail>> {
        return this.httpRequest.request({
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
    public ideaIdeaList(): CancelablePromise<Array<Idea>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/idea/idea/',
        });
    }
    /**
     * @param requestBody
     * @returns Idea
     * @throws ApiError
     */
    public ideaIdeaCreate(
        requestBody: Idea,
    ): CancelablePromise<Idea> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/idea/idea/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param ideaId
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaIdeaInformationList(
        ideaId: string,
    ): CancelablePromise<Array<IdeaInformation>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/idea/idea/{idea_id}/information/',
            path: {
                'idea_id': ideaId,
            },
        });
    }
    /**
     * @param ideaId
     * @param requestBody
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaIdeaInformationCreate(
        ideaId: string,
        requestBody?: IdeaInformation,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/idea/idea/{idea_id}/information/',
            path: {
                'idea_id': ideaId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaIdeaInformationRetrieve(
        id: number,
        ideaId: string,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/idea/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @param requestBody
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaIdeaInformationUpdate(
        id: number,
        ideaId: string,
        requestBody?: IdeaInformation,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/idea/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @param requestBody
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaIdeaInformationPartialUpdate(
        id: number,
        ideaId: string,
        requestBody?: PatchedIdeaInformation,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/idea/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @returns void
     * @throws ApiError
     */
    public ideaIdeaInformationDestroy(
        id: number,
        ideaId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/idea/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this idea.
     * @returns IdeaDetail
     * @throws ApiError
     */
    public ideaIdeaRetrieve(
        id: number,
    ): CancelablePromise<IdeaDetail> {
        return this.httpRequest.request({
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
    public ideaIdeaUpdate(
        id: number,
        requestBody: Idea,
    ): CancelablePromise<Idea> {
        return this.httpRequest.request({
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
    public ideaIdeaPartialUpdate(
        id: number,
        requestBody?: PatchedIdea,
    ): CancelablePromise<Idea> {
        return this.httpRequest.request({
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
    public ideaIdeaDestroy(
        id: number,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
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
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaRoundIdeaInformationList(
        ideaId: string,
        roundId: string,
    ): CancelablePromise<Array<IdeaInformation>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/information/',
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
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaRoundIdeaInformationCreate(
        ideaId: string,
        roundId: string,
        requestBody?: IdeaInformation,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/information/',
            path: {
                'idea_id': ideaId,
                'round_id': roundId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @param roundId
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaRoundIdeaInformationRetrieve(
        id: number,
        ideaId: string,
        roundId: string,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
                'round_id': roundId,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @param roundId
     * @param requestBody
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaRoundIdeaInformationUpdate(
        id: number,
        ideaId: string,
        roundId: string,
        requestBody?: IdeaInformation,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
                'round_id': roundId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @param roundId
     * @param requestBody
     * @returns IdeaInformation
     * @throws ApiError
     */
    public ideaRoundIdeaInformationPartialUpdate(
        id: number,
        ideaId: string,
        roundId: string,
        requestBody?: PatchedIdeaInformation,
    ): CancelablePromise<IdeaInformation> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
                'round_id': roundId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this information.
     * @param ideaId
     * @param roundId
     * @returns void
     * @throws ApiError
     */
    public ideaRoundIdeaInformationDestroy(
        id: number,
        ideaId: string,
        roundId: string,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/idea/round/{round_id}/idea/{idea_id}/information/{id}/',
            path: {
                'id': id,
                'idea_id': ideaId,
                'round_id': roundId,
            },
        });
    }
    /**
     * @param ideaId
     * @param roundId
     * @returns Vote
     * @throws ApiError
     */
    public ideaRoundIdeaVoteMeList(
        ideaId: string,
        roundId: string,
    ): CancelablePromise<Array<Vote>> {
        return this.httpRequest.request({
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
    public ideaRoundIdeaVoteMeCreate(
        ideaId: string,
        roundId: string,
        requestBody: Vote,
    ): CancelablePromise<Vote> {
        return this.httpRequest.request({
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
    public ideaRoundVoteMeList(
        roundId: string,
    ): CancelablePromise<Array<Vote>> {
        return this.httpRequest.request({
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
    public ideaVoteList(): CancelablePromise<Array<Vote>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/idea/vote/',
        });
    }
    /**
     * @param requestBody
     * @returns Vote
     * @throws ApiError
     */
    public ideaVoteCreate(
        requestBody: Vote,
    ): CancelablePromise<Vote> {
        return this.httpRequest.request({
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
    public ideaVoteRetrieve(
        id: number,
    ): CancelablePromise<Vote> {
        return this.httpRequest.request({
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
    public ideaVoteUpdate(
        id: number,
        requestBody: Vote,
    ): CancelablePromise<Vote> {
        return this.httpRequest.request({
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
    public ideaVotePartialUpdate(
        id: number,
        requestBody?: PatchedVote,
    ): CancelablePromise<Vote> {
        return this.httpRequest.request({
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
    public ideaVoteDestroy(
        id: number,
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/idea/vote/{id}/',
            path: {
                'id': id,
            },
        });
    }
}
