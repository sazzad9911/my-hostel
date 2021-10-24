import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

const AllMeals = (props) => {
    const [Data, setData] = React.useState(null);

    React.useEffect(() => {
        if(props.UserInformation){
            firestore().collection('Meal').orderBy('Date', 'desc').onSnapshot(docs => {
                let arr = [];
                docs.forEach(doc => {
                    if (doc.get('HostelCode') == props.UserInfo.HostelCode) {
                        props.UserInformation.forEach(userInfo =>{
                            if(userInfo.Email == doc.get('Email')){
                                arr.push({"Date":doc.get('Date'), "Name": userInfo.Name,"Meal":doc.get('Meal')});
                            }
                        })
                    }
                });
                setData(arr);
            })
        }
    },[props.UserInformation])
    return (
        <ScrollView>
            {
                Data ? (
                    Data.length > 0 ? (
                        Data.map((data,i) => (
                            <Views data={data} key={i} width={props.width}/>
                        ))
                    ) : (
                        <Text style={{
                            color: 'red',
                            textAlign: 'center'
                        }}>No Meal Available</Text>
                    )
                ) : (
                    <Text style={{
                        color: 'red',
                        textAlign: 'center'
                    }}>Loading....</Text>
                )
            }
        </ScrollView>
    );
};
const mapStateToProps = (props) => {
    return {
        UserInformation: props.User_Information,
    }
}
export default connect(mapStateToProps)(AllMeals);
const Views=(props)=>{
    let month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date=props.data.Date.toDate();
    date=date.getDate()+' '+month[date.getMonth()]+' '+date.getFullYear();
    return (
        <View style={{
            minHeight:50,
            backgroundColor: '#03A486',
            width:props.width-10,
            flexDirection:'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:10,
            marginVertical:5,
            marginHorizontal:5,
        }}>
        <View style={{flex:3,margin:5}}>
        <Text style={{
            color:'#ffff'
        }}>{date}</Text>
        </View>
        <View style={{
            flex:3,
            margin:5
        }}>
        <Text style={{
            color:'#ffff'
        }}>{props.data.Name}</Text>
        </View>
        <View style={{flex:3,margin:5}}>
        <Text style={{
            color:'#ffff'
        }}>{props.data.Meal}</Text>
        </View>
        </View>
    )
}