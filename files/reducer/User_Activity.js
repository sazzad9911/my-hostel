const User_Activity=(stste=null,action)=>{
    if(action.type=='CHANGE_USER_ACTIVITY'){
        return action.playload;
    }
    return stste;
}
export default User_Activity;