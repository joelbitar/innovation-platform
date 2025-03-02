import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AbbreviatedUser {
            id: number;
            /**
             * The full name of the user if it exists, otherwise the username
             */
            label: string | null;
        }
        export interface BusinessArea {
            id: number;
            slug: string; // ^[-a-zA-Z0-9_]+$
            name: string;
            description?: string;
            users?: number[];
        }
        export interface Campaign {
            id: number;
            created_by: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            name: string;
            description: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            business_areas?: number[];
        }
        export interface CampaignRound {
            id: number;
            created_by: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            name: string;
            description?: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            campaign: number;
        }
        export interface Idea {
            id: number;
            created_by: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            title: string;
            description: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            visibility?: /**
             * * `PUBLIC` - Public
             * * `BUSINESS_AREA` - Business Area
             * * `PRIVATE` - Private
             */
            VisibilityEnum;
            campaign: number;
        }
        export interface IdeaDetail {
            id: number;
            created_by: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            round_votes: RoundVotes[];
            title: string;
            description: string;
            created_at: string; // date-time
            updated_at: string; // date-time
            visibility?: /**
             * * `PUBLIC` - Public
             * * `BUSINESS_AREA` - Business Area
             * * `PRIVATE` - Private
             */
            VisibilityEnum;
            campaign: number;
        }
        export interface IdeaInformation {
            id: number;
            created_by: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            deleted_at?: string | null; // date-time
            restored_at?: string | null; // date-time
            transaction_id?: string | null; // uuid
            created_at: string; // date-time
            updated_at: string; // date-time
            title?: string;
            text?: string;
            file?: string | null; // uri
            idea?: number;
            folder?: number | null;
            round?: number | null;
        }
        export interface Login {
            username: string;
            password: string;
        }
        export interface PatchedBusinessArea {
            id?: number;
            slug?: string; // ^[-a-zA-Z0-9_]+$
            name?: string;
            description?: string;
            users?: number[];
        }
        export interface PatchedCampaign {
            id?: number;
            created_by?: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            name?: string;
            description?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            business_areas?: number[];
        }
        export interface PatchedCampaignRound {
            id?: number;
            created_by?: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            name?: string;
            description?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            campaign?: number;
        }
        export interface PatchedIdea {
            id?: number;
            created_by?: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            title?: string;
            description?: string;
            created_at?: string; // date-time
            updated_at?: string; // date-time
            visibility?: /**
             * * `PUBLIC` - Public
             * * `BUSINESS_AREA` - Business Area
             * * `PRIVATE` - Private
             */
            VisibilityEnum;
            campaign?: number;
        }
        export interface PatchedIdeaInformation {
            id?: number;
            created_by?: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            deleted_at?: string | null; // date-time
            restored_at?: string | null; // date-time
            transaction_id?: string | null; // uuid
            created_at?: string; // date-time
            updated_at?: string; // date-time
            title?: string;
            text?: string;
            file?: string | null; // uri
            idea?: number;
            folder?: number | null;
            round?: number | null;
        }
        export interface PatchedVote {
            id?: number;
            created_by?: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            created_at?: string; // date-time
            updated_at?: string; // date-time
            idea?: number;
            round?: number;
        }
        export interface RoundVotes {
            round_pk: number;
            count: number;
        }
        /**
         * * `CONTRIBUTOR` - Contributor
         * * `MODERATOR` - Moderator
         * * `ADMIN` - Admin
         */
        export type TypeEnum = "CONTRIBUTOR" | "MODERATOR" | "ADMIN";
        export interface UserProfile {
            id: number;
            type?: /**
             * * `CONTRIBUTOR` - Contributor
             * * `MODERATOR` - Moderator
             * * `ADMIN` - Admin
             */
            TypeEnum;
            user: number;
        }
        export interface UserWithPermissions {
            id: number;
            /**
             * The full name of the user if it exists, otherwise the username
             */
            label: string | null;
            /**
             * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
             */
            username: string; // ^[\w.@+-]+$
            /**
             * Email address
             */
            email?: string; // email
            first_name?: string;
            last_name?: string;
            profile: {
                id: number;
                type?: /**
                 * * `CONTRIBUTOR` - Contributor
                 * * `MODERATOR` - Moderator
                 * * `ADMIN` - Admin
                 */
                TypeEnum;
                user: number;
            };
            permissions: string;
            group_permissions: string;
            is_staff: boolean;
            is_superuser: boolean;
        }
        /**
         * * `PUBLIC` - Public
         * * `BUSINESS_AREA` - Business Area
         * * `PRIVATE` - Private
         */
        export type VisibilityEnum = "PUBLIC" | "BUSINESS_AREA" | "PRIVATE";
        export interface Vote {
            id: number;
            created_by: {
                id: number;
                /**
                 * The full name of the user if it exists, otherwise the username
                 */
                label: string | null;
            };
            created_at: string; // date-time
            updated_at: string; // date-time
            idea: number;
            round: number;
        }
    }
}
declare namespace Paths {
    namespace AuthLoginCreate {
        export type RequestBody = Components.Schemas.Login;
        namespace Responses {
            export type $200 = Components.Schemas.Login;
        }
    }
    namespace AuthLogoutCreate {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace BusinessBusinessAreaCreate {
        export type RequestBody = Components.Schemas.BusinessArea;
        namespace Responses {
            export type $201 = Components.Schemas.BusinessArea;
        }
    }
    namespace BusinessBusinessAreaDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace BusinessBusinessAreaList {
        namespace Responses {
            export type $200 = Components.Schemas.BusinessArea[];
        }
    }
    namespace BusinessBusinessAreaPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedBusinessArea;
        namespace Responses {
            export type $200 = Components.Schemas.BusinessArea;
        }
    }
    namespace BusinessBusinessAreaRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.BusinessArea;
        }
    }
    namespace BusinessBusinessAreaUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.BusinessArea;
        namespace Responses {
            export type $200 = Components.Schemas.BusinessArea;
        }
    }
    namespace CampaignCreate {
        export type RequestBody = Components.Schemas.Campaign;
        namespace Responses {
            export type $201 = Components.Schemas.Campaign;
        }
    }
    namespace CampaignDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CampaignList {
        namespace Responses {
            export type $200 = Components.Schemas.Campaign[];
        }
    }
    namespace CampaignPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCampaign;
        namespace Responses {
            export type $200 = Components.Schemas.Campaign;
        }
    }
    namespace CampaignRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Campaign;
        }
    }
    namespace CampaignRoundCreate {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.CampaignRound;
        namespace Responses {
            export type $201 = Components.Schemas.CampaignRound;
        }
    }
    namespace CampaignRoundDestroy {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
            export type Id = string;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace CampaignRoundList {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignRound[];
        }
    }
    namespace CampaignRoundPartialUpdate {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
            export type Id = string;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedCampaignRound;
        namespace Responses {
            export type $200 = Components.Schemas.CampaignRound;
        }
    }
    namespace CampaignRoundRetrieve {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
            export type Id = string;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CampaignRound;
        }
    }
    namespace CampaignRoundUpdate {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
            export type Id = string;
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.CampaignRound;
        namespace Responses {
            export type $200 = Components.Schemas.CampaignRound;
        }
    }
    namespace CampaignUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Campaign;
        namespace Responses {
            export type $200 = Components.Schemas.Campaign;
        }
    }
    namespace IdeaCampaignIdeaList {
        namespace Parameters {
            export type CampaignId = string; // ^\d+$
        }
        export interface PathParameters {
            campaign_id: Parameters.CampaignId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IdeaDetail[];
        }
    }
    namespace IdeaIdeaCreate {
        export type RequestBody = Components.Schemas.Idea;
        namespace Responses {
            export type $201 = Components.Schemas.Idea;
        }
    }
    namespace IdeaIdeaDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace IdeaIdeaInformationCreate {
        namespace Parameters {
            export type IdeaId = string; // ^\d+$
        }
        export interface PathParameters {
            idea_id: Parameters.IdeaId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.IdeaInformation;
        namespace Responses {
            export type $201 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaIdeaInformationDestroy {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace IdeaIdeaInformationList {
        namespace Parameters {
            export type IdeaId = string; // ^\d+$
        }
        export interface PathParameters {
            idea_id: Parameters.IdeaId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation[];
        }
    }
    namespace IdeaIdeaInformationPartialUpdate {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.PatchedIdeaInformation;
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaIdeaInformationRetrieve {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaIdeaInformationUpdate {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.IdeaInformation;
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaIdeaList {
        namespace Responses {
            export type $200 = Components.Schemas.Idea[];
        }
    }
    namespace IdeaIdeaPartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedIdea;
        namespace Responses {
            export type $200 = Components.Schemas.Idea;
        }
    }
    namespace IdeaIdeaRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IdeaDetail;
        }
    }
    namespace IdeaIdeaUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Idea;
        namespace Responses {
            export type $200 = Components.Schemas.Idea;
        }
    }
    namespace IdeaRoundIdeaInformationCreate {
        namespace Parameters {
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.IdeaInformation;
        namespace Responses {
            export type $201 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaRoundIdeaInformationDestroy {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace IdeaRoundIdeaInformationList {
        namespace Parameters {
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation[];
        }
    }
    namespace IdeaRoundIdeaInformationPartialUpdate {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.PatchedIdeaInformation;
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaRoundIdeaInformationRetrieve {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaRoundIdeaInformationUpdate {
        namespace Parameters {
            export type Id = number;
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            id: Parameters.Id;
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.IdeaInformation;
        namespace Responses {
            export type $200 = Components.Schemas.IdeaInformation;
        }
    }
    namespace IdeaRoundIdeaVoteMeCreate {
        namespace Parameters {
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        export type RequestBody = Components.Schemas.Vote;
        namespace Responses {
            export type $201 = Components.Schemas.Vote;
        }
    }
    namespace IdeaRoundIdeaVoteMeList {
        namespace Parameters {
            export type IdeaId = string; // ^\d+$
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            idea_id: Parameters.IdeaId /* ^\d+$ */;
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Vote[];
        }
    }
    namespace IdeaRoundVoteMeList {
        namespace Parameters {
            export type RoundId = string; // ^\d+$
        }
        export interface PathParameters {
            round_id: Parameters.RoundId /* ^\d+$ */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Vote[];
        }
    }
    namespace IdeaVoteCreate {
        export type RequestBody = Components.Schemas.Vote;
        namespace Responses {
            export type $201 = Components.Schemas.Vote;
        }
    }
    namespace IdeaVoteDestroy {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $204 {
            }
        }
    }
    namespace IdeaVoteList {
        namespace Responses {
            export type $200 = Components.Schemas.Vote[];
        }
    }
    namespace IdeaVotePartialUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.PatchedVote;
        namespace Responses {
            export type $200 = Components.Schemas.Vote;
        }
    }
    namespace IdeaVoteRetrieve {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.Vote;
        }
    }
    namespace IdeaVoteUpdate {
        namespace Parameters {
            export type Id = number;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = Components.Schemas.Vote;
        namespace Responses {
            export type $200 = Components.Schemas.Vote;
        }
    }
    namespace UserMeProfileRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.UserProfile;
        }
    }
    namespace UserMeRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.UserWithPermissions;
        }
    }
    namespace UserRetrieve {
        namespace Responses {
            export type $200 = Components.Schemas.UserWithPermissions;
        }
    }
}

export interface OperationMethods {
  /**
   * auth_login_create
   */
  'auth_login_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthLoginCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthLoginCreate.Responses.$200>
  /**
   * auth_logout_create
   */
  'auth_logout_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthLogoutCreate.Responses.$200>
  /**
   * business_business_area_list
   */
  'business_business_area_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BusinessBusinessAreaList.Responses.$200>
  /**
   * business_business_area_create
   */
  'business_business_area_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BusinessBusinessAreaCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BusinessBusinessAreaCreate.Responses.$201>
  /**
   * business_business_area_retrieve
   */
  'business_business_area_retrieve'(
    parameters?: Parameters<Paths.BusinessBusinessAreaRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BusinessBusinessAreaRetrieve.Responses.$200>
  /**
   * business_business_area_update
   */
  'business_business_area_update'(
    parameters?: Parameters<Paths.BusinessBusinessAreaUpdate.PathParameters> | null,
    data?: Paths.BusinessBusinessAreaUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BusinessBusinessAreaUpdate.Responses.$200>
  /**
   * business_business_area_partial_update
   */
  'business_business_area_partial_update'(
    parameters?: Parameters<Paths.BusinessBusinessAreaPartialUpdate.PathParameters> | null,
    data?: Paths.BusinessBusinessAreaPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BusinessBusinessAreaPartialUpdate.Responses.$200>
  /**
   * business_business_area_destroy
   */
  'business_business_area_destroy'(
    parameters?: Parameters<Paths.BusinessBusinessAreaDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BusinessBusinessAreaDestroy.Responses.$204>
  /**
   * campaign_list
   */
  'campaign_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignList.Responses.$200>
  /**
   * campaign_create
   */
  'campaign_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CampaignCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignCreate.Responses.$201>
  /**
   * campaign_round_list
   */
  'campaign_round_list'(
    parameters?: Parameters<Paths.CampaignRoundList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRoundList.Responses.$200>
  /**
   * campaign_round_create
   */
  'campaign_round_create'(
    parameters?: Parameters<Paths.CampaignRoundCreate.PathParameters> | null,
    data?: Paths.CampaignRoundCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRoundCreate.Responses.$201>
  /**
   * campaign_round_retrieve
   */
  'campaign_round_retrieve'(
    parameters?: Parameters<Paths.CampaignRoundRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRoundRetrieve.Responses.$200>
  /**
   * campaign_round_update
   */
  'campaign_round_update'(
    parameters?: Parameters<Paths.CampaignRoundUpdate.PathParameters> | null,
    data?: Paths.CampaignRoundUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRoundUpdate.Responses.$200>
  /**
   * campaign_round_partial_update
   */
  'campaign_round_partial_update'(
    parameters?: Parameters<Paths.CampaignRoundPartialUpdate.PathParameters> | null,
    data?: Paths.CampaignRoundPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRoundPartialUpdate.Responses.$200>
  /**
   * campaign_round_destroy
   */
  'campaign_round_destroy'(
    parameters?: Parameters<Paths.CampaignRoundDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRoundDestroy.Responses.$204>
  /**
   * campaign_retrieve
   */
  'campaign_retrieve'(
    parameters?: Parameters<Paths.CampaignRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignRetrieve.Responses.$200>
  /**
   * campaign_update
   */
  'campaign_update'(
    parameters?: Parameters<Paths.CampaignUpdate.PathParameters> | null,
    data?: Paths.CampaignUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignUpdate.Responses.$200>
  /**
   * campaign_partial_update
   */
  'campaign_partial_update'(
    parameters?: Parameters<Paths.CampaignPartialUpdate.PathParameters> | null,
    data?: Paths.CampaignPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignPartialUpdate.Responses.$200>
  /**
   * campaign_destroy
   */
  'campaign_destroy'(
    parameters?: Parameters<Paths.CampaignDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CampaignDestroy.Responses.$204>
  /**
   * idea_campaign_idea_list
   */
  'idea_campaign_idea_list'(
    parameters?: Parameters<Paths.IdeaCampaignIdeaList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaCampaignIdeaList.Responses.$200>
  /**
   * idea_idea_list
   */
  'idea_idea_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaList.Responses.$200>
  /**
   * idea_idea_create
   */
  'idea_idea_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.IdeaIdeaCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaCreate.Responses.$201>
  /**
   * idea_idea_information_list
   */
  'idea_idea_information_list'(
    parameters?: Parameters<Paths.IdeaIdeaInformationList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaInformationList.Responses.$200>
  /**
   * idea_idea_information_create
   */
  'idea_idea_information_create'(
    parameters?: Parameters<Paths.IdeaIdeaInformationCreate.PathParameters> | null,
    data?: Paths.IdeaIdeaInformationCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaInformationCreate.Responses.$201>
  /**
   * idea_idea_information_retrieve
   */
  'idea_idea_information_retrieve'(
    parameters?: Parameters<Paths.IdeaIdeaInformationRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaInformationRetrieve.Responses.$200>
  /**
   * idea_idea_information_update
   */
  'idea_idea_information_update'(
    parameters?: Parameters<Paths.IdeaIdeaInformationUpdate.PathParameters> | null,
    data?: Paths.IdeaIdeaInformationUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaInformationUpdate.Responses.$200>
  /**
   * idea_idea_information_partial_update
   */
  'idea_idea_information_partial_update'(
    parameters?: Parameters<Paths.IdeaIdeaInformationPartialUpdate.PathParameters> | null,
    data?: Paths.IdeaIdeaInformationPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaInformationPartialUpdate.Responses.$200>
  /**
   * idea_idea_information_destroy
   */
  'idea_idea_information_destroy'(
    parameters?: Parameters<Paths.IdeaIdeaInformationDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaInformationDestroy.Responses.$204>
  /**
   * idea_idea_retrieve
   */
  'idea_idea_retrieve'(
    parameters?: Parameters<Paths.IdeaIdeaRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaRetrieve.Responses.$200>
  /**
   * idea_idea_update
   */
  'idea_idea_update'(
    parameters?: Parameters<Paths.IdeaIdeaUpdate.PathParameters> | null,
    data?: Paths.IdeaIdeaUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaUpdate.Responses.$200>
  /**
   * idea_idea_partial_update
   */
  'idea_idea_partial_update'(
    parameters?: Parameters<Paths.IdeaIdeaPartialUpdate.PathParameters> | null,
    data?: Paths.IdeaIdeaPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaPartialUpdate.Responses.$200>
  /**
   * idea_idea_destroy
   */
  'idea_idea_destroy'(
    parameters?: Parameters<Paths.IdeaIdeaDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaIdeaDestroy.Responses.$204>
  /**
   * idea_round_idea_information_list
   */
  'idea_round_idea_information_list'(
    parameters?: Parameters<Paths.IdeaRoundIdeaInformationList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaInformationList.Responses.$200>
  /**
   * idea_round_idea_information_create
   */
  'idea_round_idea_information_create'(
    parameters?: Parameters<Paths.IdeaRoundIdeaInformationCreate.PathParameters> | null,
    data?: Paths.IdeaRoundIdeaInformationCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaInformationCreate.Responses.$201>
  /**
   * idea_round_idea_information_retrieve
   */
  'idea_round_idea_information_retrieve'(
    parameters?: Parameters<Paths.IdeaRoundIdeaInformationRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaInformationRetrieve.Responses.$200>
  /**
   * idea_round_idea_information_update
   */
  'idea_round_idea_information_update'(
    parameters?: Parameters<Paths.IdeaRoundIdeaInformationUpdate.PathParameters> | null,
    data?: Paths.IdeaRoundIdeaInformationUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaInformationUpdate.Responses.$200>
  /**
   * idea_round_idea_information_partial_update
   */
  'idea_round_idea_information_partial_update'(
    parameters?: Parameters<Paths.IdeaRoundIdeaInformationPartialUpdate.PathParameters> | null,
    data?: Paths.IdeaRoundIdeaInformationPartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaInformationPartialUpdate.Responses.$200>
  /**
   * idea_round_idea_information_destroy
   */
  'idea_round_idea_information_destroy'(
    parameters?: Parameters<Paths.IdeaRoundIdeaInformationDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaInformationDestroy.Responses.$204>
  /**
   * idea_round_idea_vote_me_list
   */
  'idea_round_idea_vote_me_list'(
    parameters?: Parameters<Paths.IdeaRoundIdeaVoteMeList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaVoteMeList.Responses.$200>
  /**
   * idea_round_idea_vote_me_create
   */
  'idea_round_idea_vote_me_create'(
    parameters?: Parameters<Paths.IdeaRoundIdeaVoteMeCreate.PathParameters> | null,
    data?: Paths.IdeaRoundIdeaVoteMeCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundIdeaVoteMeCreate.Responses.$201>
  /**
   * idea_round_vote_me_list
   */
  'idea_round_vote_me_list'(
    parameters?: Parameters<Paths.IdeaRoundVoteMeList.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaRoundVoteMeList.Responses.$200>
  /**
   * idea_vote_list
   */
  'idea_vote_list'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaVoteList.Responses.$200>
  /**
   * idea_vote_create
   */
  'idea_vote_create'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.IdeaVoteCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaVoteCreate.Responses.$201>
  /**
   * idea_vote_retrieve
   */
  'idea_vote_retrieve'(
    parameters?: Parameters<Paths.IdeaVoteRetrieve.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaVoteRetrieve.Responses.$200>
  /**
   * idea_vote_update
   */
  'idea_vote_update'(
    parameters?: Parameters<Paths.IdeaVoteUpdate.PathParameters> | null,
    data?: Paths.IdeaVoteUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaVoteUpdate.Responses.$200>
  /**
   * idea_vote_partial_update
   */
  'idea_vote_partial_update'(
    parameters?: Parameters<Paths.IdeaVotePartialUpdate.PathParameters> | null,
    data?: Paths.IdeaVotePartialUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaVotePartialUpdate.Responses.$200>
  /**
   * idea_vote_destroy
   */
  'idea_vote_destroy'(
    parameters?: Parameters<Paths.IdeaVoteDestroy.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.IdeaVoteDestroy.Responses.$204>
  /**
   * user_retrieve - View to return data about a specific user
   */
  'user_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserRetrieve.Responses.$200>
  /**
   * user_me_retrieve - View to return data about the currently logged in user
   */
  'user_me_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserMeRetrieve.Responses.$200>
  /**
   * user_me_profile_retrieve - View to work with profile for the currently logged in user
   */
  'user_me_profile_retrieve'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserMeProfileRetrieve.Responses.$200>
}

export interface PathsDictionary {
  ['/api/auth/login/']: {
    /**
     * auth_login_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthLoginCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthLoginCreate.Responses.$200>
  }
  ['/api/auth/logout/']: {
    /**
     * auth_logout_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthLogoutCreate.Responses.$200>
  }
  ['/api/business/business_area//']: {
    /**
     * business_business_area_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BusinessBusinessAreaList.Responses.$200>
    /**
     * business_business_area_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BusinessBusinessAreaCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BusinessBusinessAreaCreate.Responses.$201>
  }
  ['/api/business/business_area//{id}/']: {
    /**
     * business_business_area_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.BusinessBusinessAreaRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BusinessBusinessAreaRetrieve.Responses.$200>
    /**
     * business_business_area_update
     */
    'put'(
      parameters?: Parameters<Paths.BusinessBusinessAreaUpdate.PathParameters> | null,
      data?: Paths.BusinessBusinessAreaUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BusinessBusinessAreaUpdate.Responses.$200>
    /**
     * business_business_area_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.BusinessBusinessAreaPartialUpdate.PathParameters> | null,
      data?: Paths.BusinessBusinessAreaPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BusinessBusinessAreaPartialUpdate.Responses.$200>
    /**
     * business_business_area_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.BusinessBusinessAreaDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BusinessBusinessAreaDestroy.Responses.$204>
  }
  ['/api/campaign/']: {
    /**
     * campaign_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignList.Responses.$200>
    /**
     * campaign_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CampaignCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignCreate.Responses.$201>
  }
  ['/api/campaign/{campaign_id}/round/']: {
    /**
     * campaign_round_list
     */
    'get'(
      parameters?: Parameters<Paths.CampaignRoundList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRoundList.Responses.$200>
    /**
     * campaign_round_create
     */
    'post'(
      parameters?: Parameters<Paths.CampaignRoundCreate.PathParameters> | null,
      data?: Paths.CampaignRoundCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRoundCreate.Responses.$201>
  }
  ['/api/campaign/{campaign_id}/round/{id}/']: {
    /**
     * campaign_round_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.CampaignRoundRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRoundRetrieve.Responses.$200>
    /**
     * campaign_round_update
     */
    'put'(
      parameters?: Parameters<Paths.CampaignRoundUpdate.PathParameters> | null,
      data?: Paths.CampaignRoundUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRoundUpdate.Responses.$200>
    /**
     * campaign_round_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.CampaignRoundPartialUpdate.PathParameters> | null,
      data?: Paths.CampaignRoundPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRoundPartialUpdate.Responses.$200>
    /**
     * campaign_round_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.CampaignRoundDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRoundDestroy.Responses.$204>
  }
  ['/api/campaign/{id}/']: {
    /**
     * campaign_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.CampaignRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignRetrieve.Responses.$200>
    /**
     * campaign_update
     */
    'put'(
      parameters?: Parameters<Paths.CampaignUpdate.PathParameters> | null,
      data?: Paths.CampaignUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignUpdate.Responses.$200>
    /**
     * campaign_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.CampaignPartialUpdate.PathParameters> | null,
      data?: Paths.CampaignPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignPartialUpdate.Responses.$200>
    /**
     * campaign_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.CampaignDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CampaignDestroy.Responses.$204>
  }
  ['/api/idea/campaign/{campaign_id}/idea/']: {
    /**
     * idea_campaign_idea_list
     */
    'get'(
      parameters?: Parameters<Paths.IdeaCampaignIdeaList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaCampaignIdeaList.Responses.$200>
  }
  ['/api/idea/idea/']: {
    /**
     * idea_idea_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaList.Responses.$200>
    /**
     * idea_idea_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.IdeaIdeaCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaCreate.Responses.$201>
  }
  ['/api/idea/idea/{idea_id}/information/']: {
    /**
     * idea_idea_information_list
     */
    'get'(
      parameters?: Parameters<Paths.IdeaIdeaInformationList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaInformationList.Responses.$200>
    /**
     * idea_idea_information_create
     */
    'post'(
      parameters?: Parameters<Paths.IdeaIdeaInformationCreate.PathParameters> | null,
      data?: Paths.IdeaIdeaInformationCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaInformationCreate.Responses.$201>
  }
  ['/api/idea/idea/{idea_id}/information/{id}/']: {
    /**
     * idea_idea_information_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.IdeaIdeaInformationRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaInformationRetrieve.Responses.$200>
    /**
     * idea_idea_information_update
     */
    'put'(
      parameters?: Parameters<Paths.IdeaIdeaInformationUpdate.PathParameters> | null,
      data?: Paths.IdeaIdeaInformationUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaInformationUpdate.Responses.$200>
    /**
     * idea_idea_information_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.IdeaIdeaInformationPartialUpdate.PathParameters> | null,
      data?: Paths.IdeaIdeaInformationPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaInformationPartialUpdate.Responses.$200>
    /**
     * idea_idea_information_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.IdeaIdeaInformationDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaInformationDestroy.Responses.$204>
  }
  ['/api/idea/idea/{id}/']: {
    /**
     * idea_idea_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.IdeaIdeaRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaRetrieve.Responses.$200>
    /**
     * idea_idea_update
     */
    'put'(
      parameters?: Parameters<Paths.IdeaIdeaUpdate.PathParameters> | null,
      data?: Paths.IdeaIdeaUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaUpdate.Responses.$200>
    /**
     * idea_idea_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.IdeaIdeaPartialUpdate.PathParameters> | null,
      data?: Paths.IdeaIdeaPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaPartialUpdate.Responses.$200>
    /**
     * idea_idea_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.IdeaIdeaDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaIdeaDestroy.Responses.$204>
  }
  ['/api/idea/round/{round_id}/idea/{idea_id}/information/']: {
    /**
     * idea_round_idea_information_list
     */
    'get'(
      parameters?: Parameters<Paths.IdeaRoundIdeaInformationList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaInformationList.Responses.$200>
    /**
     * idea_round_idea_information_create
     */
    'post'(
      parameters?: Parameters<Paths.IdeaRoundIdeaInformationCreate.PathParameters> | null,
      data?: Paths.IdeaRoundIdeaInformationCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaInformationCreate.Responses.$201>
  }
  ['/api/idea/round/{round_id}/idea/{idea_id}/information/{id}/']: {
    /**
     * idea_round_idea_information_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.IdeaRoundIdeaInformationRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaInformationRetrieve.Responses.$200>
    /**
     * idea_round_idea_information_update
     */
    'put'(
      parameters?: Parameters<Paths.IdeaRoundIdeaInformationUpdate.PathParameters> | null,
      data?: Paths.IdeaRoundIdeaInformationUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaInformationUpdate.Responses.$200>
    /**
     * idea_round_idea_information_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.IdeaRoundIdeaInformationPartialUpdate.PathParameters> | null,
      data?: Paths.IdeaRoundIdeaInformationPartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaInformationPartialUpdate.Responses.$200>
    /**
     * idea_round_idea_information_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.IdeaRoundIdeaInformationDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaInformationDestroy.Responses.$204>
  }
  ['/api/idea/round/{round_id}/idea/{idea_id}/vote/me/']: {
    /**
     * idea_round_idea_vote_me_list
     */
    'get'(
      parameters?: Parameters<Paths.IdeaRoundIdeaVoteMeList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaVoteMeList.Responses.$200>
    /**
     * idea_round_idea_vote_me_create
     */
    'post'(
      parameters?: Parameters<Paths.IdeaRoundIdeaVoteMeCreate.PathParameters> | null,
      data?: Paths.IdeaRoundIdeaVoteMeCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundIdeaVoteMeCreate.Responses.$201>
  }
  ['/api/idea/round/{round_id}/vote/me/']: {
    /**
     * idea_round_vote_me_list
     */
    'get'(
      parameters?: Parameters<Paths.IdeaRoundVoteMeList.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaRoundVoteMeList.Responses.$200>
  }
  ['/api/idea/vote/']: {
    /**
     * idea_vote_list
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaVoteList.Responses.$200>
    /**
     * idea_vote_create
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.IdeaVoteCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaVoteCreate.Responses.$201>
  }
  ['/api/idea/vote/{id}/']: {
    /**
     * idea_vote_retrieve
     */
    'get'(
      parameters?: Parameters<Paths.IdeaVoteRetrieve.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaVoteRetrieve.Responses.$200>
    /**
     * idea_vote_update
     */
    'put'(
      parameters?: Parameters<Paths.IdeaVoteUpdate.PathParameters> | null,
      data?: Paths.IdeaVoteUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaVoteUpdate.Responses.$200>
    /**
     * idea_vote_partial_update
     */
    'patch'(
      parameters?: Parameters<Paths.IdeaVotePartialUpdate.PathParameters> | null,
      data?: Paths.IdeaVotePartialUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaVotePartialUpdate.Responses.$200>
    /**
     * idea_vote_destroy
     */
    'delete'(
      parameters?: Parameters<Paths.IdeaVoteDestroy.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.IdeaVoteDestroy.Responses.$204>
  }
  ['/api/user/']: {
    /**
     * user_retrieve - View to return data about a specific user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserRetrieve.Responses.$200>
  }
  ['/api/user/me/']: {
    /**
     * user_me_retrieve - View to return data about the currently logged in user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserMeRetrieve.Responses.$200>
  }
  ['/api/user/me/profile/']: {
    /**
     * user_me_profile_retrieve - View to work with profile for the currently logged in user
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserMeProfileRetrieve.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>

export type AbbreviatedUser = Components.Schemas.AbbreviatedUser;
export type BusinessArea = Components.Schemas.BusinessArea;
export type Campaign = Components.Schemas.Campaign;
export type CampaignRound = Components.Schemas.CampaignRound;
export type Idea = Components.Schemas.Idea;
export type IdeaDetail = Components.Schemas.IdeaDetail;
export type IdeaInformation = Components.Schemas.IdeaInformation;
export type Login = Components.Schemas.Login;
export type PatchedBusinessArea = Components.Schemas.PatchedBusinessArea;
export type PatchedCampaign = Components.Schemas.PatchedCampaign;
export type PatchedCampaignRound = Components.Schemas.PatchedCampaignRound;
export type PatchedIdea = Components.Schemas.PatchedIdea;
export type PatchedIdeaInformation = Components.Schemas.PatchedIdeaInformation;
export type PatchedVote = Components.Schemas.PatchedVote;
export type RoundVotes = Components.Schemas.RoundVotes;
export type TypeEnum = Components.Schemas.TypeEnum;
export type UserProfile = Components.Schemas.UserProfile;
export type UserWithPermissions = Components.Schemas.UserWithPermissions;
export type VisibilityEnum = Components.Schemas.VisibilityEnum;
export type Vote = Components.Schemas.Vote;
