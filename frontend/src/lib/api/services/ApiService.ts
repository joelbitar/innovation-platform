/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BusinessArea } from '../models/BusinessArea';
import type { Idea } from '../models/Idea';
import type { IdeaDetail } from '../models/IdeaDetail';
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { UserProfile } from '../models/UserProfile';
import type { Vote } from '../models/Vote';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
    /**
     * @returns BusinessArea
     * @throws ApiError
     */
    public static listBusinessAreas(): CancelablePromise<Array<BusinessArea>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/business_area/',
        });
    }
    /**
     * @param requestBody
     * @returns BusinessArea
     * @throws ApiError
     */
    public static createBusinessArea(
        requestBody?: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/business/business_area/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this business area.
     * @returns BusinessArea
     * @throws ApiError
     */
    public static retrieveBusinessArea(
        id: string,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/business/business_area/{id}/',
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
    public static updateBusinessArea(
        id: string,
        requestBody?: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/business/business_area/{id}/',
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
    public static partialUpdateBusinessArea(
        id: string,
        requestBody?: BusinessArea,
    ): CancelablePromise<BusinessArea> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/business/business_area/{id}/',
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
    public static destroyBusinessArea(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/business/business_area/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static listUserMes(): CancelablePromise<Array<any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/user/me/',
        });
    }
    /**
     * View to work with profile for the currently logged in user
     * @returns UserProfile
     * @throws ApiError
     */
    public static getForLoggedInUserUserProfile(): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user/user/me/profile/',
        });
    }
    /**
     * @returns Idea
     * @throws ApiError
     */
    public static listIdeas(): CancelablePromise<Array<Idea>> {
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
    public static createIdea(
        requestBody?: Idea,
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
    public static retrieveIdea(
        id: string,
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
    public static updateIdea(
        id: string,
        requestBody?: Idea,
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
    public static partialUpdateIdea(
        id: string,
        requestBody?: Idea,
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
    public static destroyIdea(
        id: string,
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
     * @returns Vote
     * @throws ApiError
     */
    public static listVotes(): CancelablePromise<Array<Vote>> {
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
    public static createVote(
        requestBody?: Vote,
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
    public static retrieveVote(
        id: string,
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
    public static updateVote(
        id: string,
        requestBody?: Vote,
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
    public static partialUpdateVote(
        id: string,
        requestBody?: Vote,
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
    public static destroyVote(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/idea/vote/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Takes a set of user credentials and returns an access and refresh JSON web
     * token pair to prove the authentication of those credentials.
     * @param requestBody
     * @returns TokenObtainPair
     * @throws ApiError
     */
    public static createTokenObtainPair(
        requestBody?: TokenObtainPair,
    ): CancelablePromise<TokenObtainPair> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/auth/token/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns TokenRefresh
     * @throws ApiError
     */
    public static createTokenRefresh(
        requestBody?: TokenRefresh,
    ): CancelablePromise<TokenRefresh> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/auth/token/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static createTokenBlacklist(
        requestBody?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user/auth/token/blacklist/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
