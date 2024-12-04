import type { User } from "./types/modals";

export const resolveAvatarUrl=(user:User,baseUploadPath:string,placeHolderUrl:string)=>{
    if(user?.profile?.avatar){
        return baseUploadPath+user.profile.avatar
    }

    if(user.profile?.googleAvatar){
        return user.profile.googleAvatar
    }

    return placeHolderUrl
}