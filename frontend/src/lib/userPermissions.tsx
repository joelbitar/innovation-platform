/* generated using generate_permissions -- do not edit */

export class UserPermissions {
    // List of possible permissions
    static idea__change_idea = "idea.change_idea";
    static idea__add_vote = "idea.add_vote";
    static idea__view_information = "idea.view_information";
    static auth__change_permission = "auth.change_permission";
    static idea__change_vote = "idea.change_vote";
    static idea__delete_vote = "idea.delete_vote";
    static admin__add_logentry = "admin.add_logentry";
    static user__view_profile = "user.view_profile";
    static idea__delete_comment = "idea.delete_comment";
    static auth__change_group = "auth.change_group";
    static auth__add_group = "auth.add_group";
    static auth__delete_permission = "auth.delete_permission";
    static auth__view_user = "auth.view_user";
    static idea__view_comment = "idea.view_comment";
    static token_blacklist__view_blacklistedtoken = "token_blacklist.view_blacklistedtoken";
    static sessions__delete_session = "sessions.delete_session";
    static auth__delete_group = "auth.delete_group";
    static contenttypes__change_contenttype = "contenttypes.change_contenttype";
    static business__view_businessarea = "business.view_businessarea";
    static token_blacklist__delete_blacklistedtoken = "token_blacklist.delete_blacklistedtoken";
    static auth__change_user = "auth.change_user";
    static campaign__add_campaign = "campaign.add_campaign";
    static token_blacklist__add_blacklistedtoken = "token_blacklist.add_blacklistedtoken";
    static idea__add_roundvotecount = "idea.add_roundvotecount";
    static idea__add_information = "idea.add_information";
    static admin__view_logentry = "admin.view_logentry";
    static idea__add_comment = "idea.add_comment";
    static user__change_profile = "user.change_profile";
    static contenttypes__delete_contenttype = "contenttypes.delete_contenttype";
    static business__change_businessarea = "business.change_businessarea";
    static token_blacklist__change_outstandingtoken = "token_blacklist.change_outstandingtoken";
    static idea__view_vote = "idea.view_vote";
    static idea__change_roundvotecount = "idea.change_roundvotecount";
    static contenttypes__view_contenttype = "contenttypes.view_contenttype";
    static auth__view_permission = "auth.view_permission";
    static campaign__change_campaignround = "campaign.change_campaignround";
    static idea__change_information = "idea.change_information";
    static idea__add_star = "idea.add_star";
    static idea__delete_information = "idea.delete_information";
    static token_blacklist__view_outstandingtoken = "token_blacklist.view_outstandingtoken";
    static campaign__add_campaignround = "campaign.add_campaignround";
    static idea__delete_star = "idea.delete_star";
    static user__add_profile = "user.add_profile";
    static idea__view_star = "idea.view_star";
    static campaign__view_campaignround = "campaign.view_campaignround";
    static idea__change_comment = "idea.change_comment";
    static token_blacklist__add_outstandingtoken = "token_blacklist.add_outstandingtoken";
    static campaign__change_campaign = "campaign.change_campaign";
    static admin__delete_logentry = "admin.delete_logentry";
    static idea__change_star = "idea.change_star";
    static idea__delete_roundvotecount = "idea.delete_roundvotecount";
    static campaign__delete_campaignround = "campaign.delete_campaignround";
    static idea__delete_idea = "idea.delete_idea";
    static auth__add_user = "auth.add_user";
    static sessions__add_session = "sessions.add_session";
    static idea__view_idea = "idea.view_idea";
    static token_blacklist__change_blacklistedtoken = "token_blacklist.change_blacklistedtoken";
    static sessions__view_session = "sessions.view_session";
    static business__add_businessarea = "business.add_businessarea";
    static idea__add_idea = "idea.add_idea";
    static admin__change_logentry = "admin.change_logentry";
    static campaign__view_campaign = "campaign.view_campaign";
    static token_blacklist__delete_outstandingtoken = "token_blacklist.delete_outstandingtoken";
    static contenttypes__add_contenttype = "contenttypes.add_contenttype";
    static campaign__delete_campaign = "campaign.delete_campaign";
    static auth__view_group = "auth.view_group";
    static auth__delete_user = "auth.delete_user";
    static idea__view_roundvotecount = "idea.view_roundvotecount";
    static sessions__change_session = "sessions.change_session";
    static auth__add_permission = "auth.add_permission";
    static business__delete_businessarea = "business.delete_businessarea";
    static user__delete_profile = "user.delete_profile";
}

export function Secured({children, permissions}) {
    return <>
         { children } 
    </>
}