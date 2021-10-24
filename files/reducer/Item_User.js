const Item_User=(state=null,action)=>{
    if(action.type=='CHANGE_ITEM_USER'){
        return action.playload;
    }
    return state;
}
export default Item_User;