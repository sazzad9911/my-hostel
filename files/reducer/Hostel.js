const Hostel=(state=null,action)=>{
    if(action.type=='CHANGE_HOSTEL'){
        return action.playload;
    }
    return state;
}
export default Hostel;