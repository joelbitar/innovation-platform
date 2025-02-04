'use client'
/* generated using generate_permissions -- do not edit */

import {getUserPermissions} from "./auth";

export class UserPermissions {
    // List of possible permissions
    static token_blacklist__add_blacklistedtoken = "token_blacklist.add_blacklistedtoken";
    static user__delete_profile = "user.delete_profile";
    static sessions__add_session = "sessions.add_session";
    static idea__change_information = "idea.change_information";
    static admin__view_logentry = "admin.view_logentry";
    static idea__add_star = "idea.add_star";
    static campaign__change_campaign = "campaign.change_campaign";
    static campaign__add_campaignround = "campaign.add_campaignround";
    static idea__delete_vote = "idea.delete_vote";
    static token_blacklist__delete_outstandingtoken = "token_blacklist.delete_outstandingtoken";
    static campaign__view_campaign = "campaign.view_campaign";
    static sessions__delete_session = "sessions.delete_session";
    static auth__add_group = "auth.add_group";
    static user__add_profile = "user.add_profile";
    static business__change_businessarea = "business.change_businessarea";
    static idea__add_idea = "idea.add_idea";
    static auth__change_group = "auth.change_group";
    static admin__add_logentry = "admin.add_logentry";
    static idea__change_star = "idea.change_star";
    static idea__view_comment = "idea.view_comment";
    static idea__change_roundvotecount = "idea.change_roundvotecount";
    static idea__view_idea = "idea.view_idea";
    static idea__view_roundvotecount = "idea.view_roundvotecount";
    static auth__add_permission = "auth.add_permission";
    static campaign__delete_campaignround = "campaign.delete_campaignround";
    static idea__change_idea = "idea.change_idea";
    static idea__delete_information = "idea.delete_information";
    static idea__view_information = "idea.view_information";
    static idea__delete_idea = "idea.delete_idea";
    static idea__add_information = "idea.add_information";
    static idea__delete_comment = "idea.delete_comment";
    static business__view_businessarea = "business.view_businessarea";
    static user__change_profile = "user.change_profile";
    static idea__view_star = "idea.view_star";
    static auth__change_user = "auth.change_user";
    static token_blacklist__view_blacklistedtoken = "token_blacklist.view_blacklistedtoken";
    static idea__change_vote = "idea.change_vote";
    static idea__add_vote = "idea.add_vote";
    static auth__view_group = "auth.view_group";
    static token_blacklist__add_outstandingtoken = "token_blacklist.add_outstandingtoken";
    static campaign__delete_campaign = "campaign.delete_campaign";
    static business__delete_businessarea = "business.delete_businessarea";
    static business__add_businessarea = "business.add_businessarea";
    static campaign__change_campaignround = "campaign.change_campaignround";
    static admin__change_logentry = "admin.change_logentry";
    static idea__add_comment = "idea.add_comment";
    static sessions__change_session = "sessions.change_session";
    static admin__delete_logentry = "admin.delete_logentry";
    static token_blacklist__delete_blacklistedtoken = "token_blacklist.delete_blacklistedtoken";
    static auth__view_user = "auth.view_user";
    static contenttypes__view_contenttype = "contenttypes.view_contenttype";
    static idea__delete_roundvotecount = "idea.delete_roundvotecount";
    static auth__delete_user = "auth.delete_user";
    static contenttypes__delete_contenttype = "contenttypes.delete_contenttype";
    static idea__view_vote = "idea.view_vote";
    static token_blacklist__change_blacklistedtoken = "token_blacklist.change_blacklistedtoken";
    static auth__delete_permission = "auth.delete_permission";
    static auth__delete_group = "auth.delete_group";
    static auth__add_user = "auth.add_user";
    static idea__delete_star = "idea.delete_star";
    static user__view_profile = "user.view_profile";
    static idea__change_comment = "idea.change_comment";
    static token_blacklist__view_outstandingtoken = "token_blacklist.view_outstandingtoken";
    static contenttypes__add_contenttype = "contenttypes.add_contenttype";
    static token_blacklist__change_outstandingtoken = "token_blacklist.change_outstandingtoken";
    static sessions__view_session = "sessions.view_session";
    static idea__add_roundvotecount = "idea.add_roundvotecount";
    static auth__view_permission = "auth.view_permission";
    static campaign__add_campaign = "campaign.add_campaign";
    static campaign__view_campaignround = "campaign.view_campaignround";
    static contenttypes__change_contenttype = "contenttypes.change_contenttype";
    static auth__change_permission = "auth.change_permission";

    static getAllPermissions() {
        return [
            this.token_blacklist__add_blacklistedtoken,
            this.user__delete_profile,
            this.sessions__add_session,
            this.idea__change_information,
            this.admin__view_logentry,
            this.idea__add_star,
            this.campaign__change_campaign,
            this.campaign__add_campaignround,
            this.idea__delete_vote,
            this.token_blacklist__delete_outstandingtoken,
            this.campaign__view_campaign,
            this.sessions__delete_session,
            this.auth__add_group,
            this.user__add_profile,
            this.business__change_businessarea,
            this.idea__add_idea,
            this.auth__change_group,
            this.admin__add_logentry,
            this.idea__change_star,
            this.idea__view_comment,
            this.idea__change_roundvotecount,
            this.idea__view_idea,
            this.idea__view_roundvotecount,
            this.auth__add_permission,
            this.campaign__delete_campaignround,
            this.idea__change_idea,
            this.idea__delete_information,
            this.idea__view_information,
            this.idea__delete_idea,
            this.idea__add_information,
            this.idea__delete_comment,
            this.business__view_businessarea,
            this.user__change_profile,
            this.idea__view_star,
            this.auth__change_user,
            this.token_blacklist__view_blacklistedtoken,
            this.idea__change_vote,
            this.idea__add_vote,
            this.auth__view_group,
            this.token_blacklist__add_outstandingtoken,
            this.campaign__delete_campaign,
            this.business__delete_businessarea,
            this.business__add_businessarea,
            this.campaign__change_campaignround,
            this.admin__change_logentry,
            this.idea__add_comment,
            this.sessions__change_session,
            this.admin__delete_logentry,
            this.token_blacklist__delete_blacklistedtoken,
            this.auth__view_user,
            this.contenttypes__view_contenttype,
            this.idea__delete_roundvotecount,
            this.auth__delete_user,
            this.contenttypes__delete_contenttype,
            this.idea__view_vote,
            this.token_blacklist__change_blacklistedtoken,
            this.auth__delete_permission,
            this.auth__delete_group,
            this.auth__add_user,
            this.idea__delete_star,
            this.user__view_profile,
            this.idea__change_comment,
            this.token_blacklist__view_outstandingtoken,
            this.contenttypes__add_contenttype,
            this.token_blacklist__change_outstandingtoken,
            this.sessions__view_session,
            this.idea__add_roundvotecount,
            this.auth__view_permission,
            this.campaign__add_campaign,
            this.campaign__view_campaignround,
            this.contenttypes__change_contenttype,
            this.auth__change_permission,
        ];
    }

    static hasPermission(permission) {
        if(!this.getAllPermissions().includes(permission)){
            console.error('Permission not found amongst possibilities: ' + permission);
        }

        const currentUserPermissions = getUserPermissions()

        return currentUserPermissions.includes(permission);
    }

    // Specific methods for checking if the current user has the specified permission
    static hasTokenBlacklistAddBlacklistedtoken() {
        return this.hasPermission(this.token_blacklist__add_blacklistedtoken, userPermissions);
    }
    static hasUserDeleteProfile() {
        return this.hasPermission(this.user__delete_profile, userPermissions);
    }
    static hasSessionsAddSession() {
        return this.hasPermission(this.sessions__add_session, userPermissions);
    }
    static hasIdeaChangeInformation() {
        return this.hasPermission(this.idea__change_information, userPermissions);
    }
    static hasAdminViewLogentry() {
        return this.hasPermission(this.admin__view_logentry, userPermissions);
    }
    static hasIdeaAddStar() {
        return this.hasPermission(this.idea__add_star, userPermissions);
    }
    static hasCampaignChangeCampaign() {
        return this.hasPermission(this.campaign__change_campaign, userPermissions);
    }
    static hasCampaignAddCampaignround() {
        return this.hasPermission(this.campaign__add_campaignround, userPermissions);
    }
    static hasIdeaDeleteVote() {
        return this.hasPermission(this.idea__delete_vote, userPermissions);
    }
    static hasTokenBlacklistDeleteOutstandingtoken() {
        return this.hasPermission(this.token_blacklist__delete_outstandingtoken, userPermissions);
    }
    static hasCampaignViewCampaign() {
        return this.hasPermission(this.campaign__view_campaign, userPermissions);
    }
    static hasSessionsDeleteSession() {
        return this.hasPermission(this.sessions__delete_session, userPermissions);
    }
    static hasAuthAddGroup() {
        return this.hasPermission(this.auth__add_group, userPermissions);
    }
    static hasUserAddProfile() {
        return this.hasPermission(this.user__add_profile, userPermissions);
    }
    static hasBusinessChangeBusinessarea() {
        return this.hasPermission(this.business__change_businessarea, userPermissions);
    }
    static hasIdeaAddIdea() {
        return this.hasPermission(this.idea__add_idea, userPermissions);
    }
    static hasAuthChangeGroup() {
        return this.hasPermission(this.auth__change_group, userPermissions);
    }
    static hasAdminAddLogentry() {
        return this.hasPermission(this.admin__add_logentry, userPermissions);
    }
    static hasIdeaChangeStar() {
        return this.hasPermission(this.idea__change_star, userPermissions);
    }
    static hasIdeaViewComment() {
        return this.hasPermission(this.idea__view_comment, userPermissions);
    }
    static hasIdeaChangeRoundvotecount() {
        return this.hasPermission(this.idea__change_roundvotecount, userPermissions);
    }
    static hasIdeaViewIdea() {
        return this.hasPermission(this.idea__view_idea, userPermissions);
    }
    static hasIdeaViewRoundvotecount() {
        return this.hasPermission(this.idea__view_roundvotecount, userPermissions);
    }
    static hasAuthAddPermission() {
        return this.hasPermission(this.auth__add_permission, userPermissions);
    }
    static hasCampaignDeleteCampaignround() {
        return this.hasPermission(this.campaign__delete_campaignround, userPermissions);
    }
    static hasIdeaChangeIdea() {
        return this.hasPermission(this.idea__change_idea, userPermissions);
    }
    static hasIdeaDeleteInformation() {
        return this.hasPermission(this.idea__delete_information, userPermissions);
    }
    static hasIdeaViewInformation() {
        return this.hasPermission(this.idea__view_information, userPermissions);
    }
    static hasIdeaDeleteIdea() {
        return this.hasPermission(this.idea__delete_idea, userPermissions);
    }
    static hasIdeaAddInformation() {
        return this.hasPermission(this.idea__add_information, userPermissions);
    }
    static hasIdeaDeleteComment() {
        return this.hasPermission(this.idea__delete_comment, userPermissions);
    }
    static hasBusinessViewBusinessarea() {
        return this.hasPermission(this.business__view_businessarea, userPermissions);
    }
    static hasUserChangeProfile() {
        return this.hasPermission(this.user__change_profile, userPermissions);
    }
    static hasIdeaViewStar() {
        return this.hasPermission(this.idea__view_star, userPermissions);
    }
    static hasAuthChangeUser() {
        return this.hasPermission(this.auth__change_user, userPermissions);
    }
    static hasTokenBlacklistViewBlacklistedtoken() {
        return this.hasPermission(this.token_blacklist__view_blacklistedtoken, userPermissions);
    }
    static hasIdeaChangeVote() {
        return this.hasPermission(this.idea__change_vote, userPermissions);
    }
    static hasIdeaAddVote() {
        return this.hasPermission(this.idea__add_vote, userPermissions);
    }
    static hasAuthViewGroup() {
        return this.hasPermission(this.auth__view_group, userPermissions);
    }
    static hasTokenBlacklistAddOutstandingtoken() {
        return this.hasPermission(this.token_blacklist__add_outstandingtoken, userPermissions);
    }
    static hasCampaignDeleteCampaign() {
        return this.hasPermission(this.campaign__delete_campaign, userPermissions);
    }
    static hasBusinessDeleteBusinessarea() {
        return this.hasPermission(this.business__delete_businessarea, userPermissions);
    }
    static hasBusinessAddBusinessarea() {
        return this.hasPermission(this.business__add_businessarea, userPermissions);
    }
    static hasCampaignChangeCampaignround() {
        return this.hasPermission(this.campaign__change_campaignround, userPermissions);
    }
    static hasAdminChangeLogentry() {
        return this.hasPermission(this.admin__change_logentry, userPermissions);
    }
    static hasIdeaAddComment() {
        return this.hasPermission(this.idea__add_comment, userPermissions);
    }
    static hasSessionsChangeSession() {
        return this.hasPermission(this.sessions__change_session, userPermissions);
    }
    static hasAdminDeleteLogentry() {
        return this.hasPermission(this.admin__delete_logentry, userPermissions);
    }
    static hasTokenBlacklistDeleteBlacklistedtoken() {
        return this.hasPermission(this.token_blacklist__delete_blacklistedtoken, userPermissions);
    }
    static hasAuthViewUser() {
        return this.hasPermission(this.auth__view_user, userPermissions);
    }
    static hasContenttypesViewContenttype() {
        return this.hasPermission(this.contenttypes__view_contenttype, userPermissions);
    }
    static hasIdeaDeleteRoundvotecount() {
        return this.hasPermission(this.idea__delete_roundvotecount, userPermissions);
    }
    static hasAuthDeleteUser() {
        return this.hasPermission(this.auth__delete_user, userPermissions);
    }
    static hasContenttypesDeleteContenttype() {
        return this.hasPermission(this.contenttypes__delete_contenttype, userPermissions);
    }
    static hasIdeaViewVote() {
        return this.hasPermission(this.idea__view_vote, userPermissions);
    }
    static hasTokenBlacklistChangeBlacklistedtoken() {
        return this.hasPermission(this.token_blacklist__change_blacklistedtoken, userPermissions);
    }
    static hasAuthDeletePermission() {
        return this.hasPermission(this.auth__delete_permission, userPermissions);
    }
    static hasAuthDeleteGroup() {
        return this.hasPermission(this.auth__delete_group, userPermissions);
    }
    static hasAuthAddUser() {
        return this.hasPermission(this.auth__add_user, userPermissions);
    }
    static hasIdeaDeleteStar() {
        return this.hasPermission(this.idea__delete_star, userPermissions);
    }
    static hasUserViewProfile() {
        return this.hasPermission(this.user__view_profile, userPermissions);
    }
    static hasIdeaChangeComment() {
        return this.hasPermission(this.idea__change_comment, userPermissions);
    }
    static hasTokenBlacklistViewOutstandingtoken() {
        return this.hasPermission(this.token_blacklist__view_outstandingtoken, userPermissions);
    }
    static hasContenttypesAddContenttype() {
        return this.hasPermission(this.contenttypes__add_contenttype, userPermissions);
    }
    static hasTokenBlacklistChangeOutstandingtoken() {
        return this.hasPermission(this.token_blacklist__change_outstandingtoken, userPermissions);
    }
    static hasSessionsViewSession() {
        return this.hasPermission(this.sessions__view_session, userPermissions);
    }
    static hasIdeaAddRoundvotecount() {
        return this.hasPermission(this.idea__add_roundvotecount, userPermissions);
    }
    static hasAuthViewPermission() {
        return this.hasPermission(this.auth__view_permission, userPermissions);
    }
    static hasCampaignAddCampaign() {
        return this.hasPermission(this.campaign__add_campaign, userPermissions);
    }
    static hasCampaignViewCampaignround() {
        return this.hasPermission(this.campaign__view_campaignround, userPermissions);
    }
    static hasContenttypesChangeContenttype() {
        return this.hasPermission(this.contenttypes__change_contenttype, userPermissions);
    }
    static hasAuthChangePermission() {
        return this.hasPermission(this.auth__change_permission, userPermissions);
    }
}

export const Secured = ({children, permissions}) => {
    console.log('UserPermission', permissions)
    return <>
        secured
    </>
}