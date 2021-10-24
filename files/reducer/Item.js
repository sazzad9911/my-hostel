const Item=(state=null,action)=>{
    if(action.type=='CHANGE_ITEM'){
        return action.playload;
    }
    return state;
}
export default Item;