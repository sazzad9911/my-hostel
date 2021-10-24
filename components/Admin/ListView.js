import React from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';

const ListView = (props) => {
    const [UserInformation,setUserInformation]=React.useState(null);
    const [date,setDate]=React.useState(null);
    React.useEffect(() =>{
        if(props.UserInfo){
            props.UserInfo.forEach(userInfo =>{
                if(userInfo.Email===props.data.Email){
                    setUserInformation(userInfo);
                    let date=props.data.Date.toDate();
                    date=date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
                    setDate(date);
                }
            });
        }
    },[props.UserInfo])
    if(UserInformation){
        return (
            <View style={{
                width:props.width-30,
                justifyContent: 'center',
                padding:5,
                borderRadius:10,
                backgroundColor:'#E1DCF9',
                margin:5
            }}>
                <View style={{
                    flexDirection:'row'
                }}>
                <Text style={{
                    fontSize:18,
                    fontWeight:'500',
                    color:'#424949'
                }}>{props.data.Type}</Text>
                <Text style={{
                    fontSize:18,
                    fontWeight:'500',
                    color:'#424949',
                    marginLeft:100
                }}>{props.data.Cost} Tk</Text>
                </View>
               <View style={{flexDirection:'row'}}>
               <Text style={{
                    color:'red',
                    marginTop:10,
                    fontSize:14
                }}>{date}</Text>
                <Text style={{
                    color:'blue',
                    marginTop:10,
                    marginLeft:20,
                    fontSize:15,
                    fontWeight:'500',
                }}>{UserInformation.Name}</Text>
               </View>
            </View>
        )
    }else{
        return(
            <Text style={{textAlign: 'center'}}>Loading....</Text>
        )
    }
};
const mapStateToProps=(state)=>{
    return{
        UserInfo: state.User_Information
    }
}
export default connect(mapStateToProps)(ListView);