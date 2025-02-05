/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AbbreviatedUser } from './AbbreviatedUser';
import type { RoundVotes } from './RoundVotes';
import type { VisibilityEnum } from './VisibilityEnum';
export type IdeaDetail = {
    readonly id: number;
    readonly created_by: AbbreviatedUser;
    round_votes: Array<RoundVotes>;
    title: string;
    description: string;
    readonly created_at: string;
    readonly updated_at: string;
    visibility?: VisibilityEnum;
    campaign: number;
};

