const User_Information=(stste=null,action)=>{
    if(action.type=='CHANGE_USER_INFORMATION'){
        return action.playload;
    }
    return stste;
}
export default User_Information;