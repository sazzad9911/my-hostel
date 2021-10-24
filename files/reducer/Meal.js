const Meal=(state=null,action)=>{
    if(action.type=='CHANGE_MEAL'){
        return action.playload;
    }
    return state;
}
export default Meal;