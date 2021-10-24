import React from 'react';
import { View, Text, StyleSheet,Alert } from 'react-native';
import { TextInput,Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AnimatedLoader from 'react-native-animated-loader';

const AddBills = (props) => {
    const [Type, setType] = React.useState(null);
    const [User, setUser] = React.useState(null);
    const [Cost,setCost] = React.useState(null);
    const [loader,setLoading] = React.useState(false);

    const Save=()=> {
        if(Type&&User&&Cost){
            setLoading(true);
            firestore().collection('History').add({
                Email:User,
                Date:new Date(),
                Type: Type,
                HostelCode:props.User.HostelCode,
                Cost:parseInt(Cost)
            }).then(()=>{
                const cost=firebase.firestore.FieldValue.increment(parseInt(Cost));
                if(Type=='HomeCredit'){
                    firestore().collection('UserInformation').doc(User).update({
                        HomeCredit: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }else if(Type=='MealCredit'){
                    firestore().collection('UserInformation').doc(User).update({
                        MealCredit: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }else if(Type=='ElectricityBill'){
                    firestore().collection('UserInformation').doc(User).update({
                        ElectricityBill: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }else if(Type=='GasBill'){
                    firestore().collection('UserInformation').doc(User).update({
                        GasBill: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }else if(Type=='WifiBill'){
                    firestore().collection('UserInformation').doc(User).update({
                        WifiBill: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }else if(Type=='CookingCost'){
                    firestore().collection('UserInformation').doc(User).update({
                        CookingCost: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }else if(Type=='HomeRent'){
                    firestore().collection('UserInformation').doc(User).update({
                        HomeRent: cost
                    }).then(()=>{
                        setLoading(false);
                        setCost('');
                        Alert.alert('Success','Updated successful');
                    })
                }
            })
        }else{
            Alert.alert('Wrong','Please set all types of information');
            return;
        }
    }
    const styles = StyleSheet.create({
        input: {
            width: props.width-30,
            backgroundColor: 'white'
        },
        text: {
            margin:10,
            fontSize:16,
            color:'#6535F6'
        }
    })
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <TextInput style={styles.input} placeholder="Enter cost here..."
                label="Cost" keyboardType='numeric'
                 onChangeText={val=>setCost(val)} value={Cost}/>
            <Text style={styles.text}>Select Bill Type:</Text>
            <Picker mode='dropdown' dropdownIconColor='blue' style={{
                backgroundColor: '#E1FDFE',
                margin: 5,
                borderRadius: 5,
                color: '#6535F6',
                width: props.width-30
            }}
                selectedValue={Type}
                onValueChange={(itemValue, itemIndex) =>
                    setType(itemValue)
                }>
                <Picker.Item label="Select Bill Type" value="" color="#6535F6" />
                <Picker.Item label="Meal Credit" value="MealCredit" color="#6535F6" />
                <Picker.Item label="Home Credit" value="HomeCredit" color="#6535F6" />
                <Picker.Item label="Electricity Bill" value="ElectricityBill" color="#6535F6" />
                <Picker.Item label="Home Rent" value="HomeRent" color="#6535F6" />
                <Picker.Item label="Gas Bill" value="GasBill" color="#6535F6" />
                <Picker.Item label="Cooking Cost" value="CookingCost" color="#6535F6" />
                <Picker.Item label="Wifi Bill" value="WifiBill" color="#6535F6" />
            </Picker>
            <Text style={styles.text}>Select User:</Text>
            <Picker mode='dropdown' dropdownIconColor='blue' style={{
                backgroundColor: '#E1FDFE',
                margin: 5,
                borderRadius: 5,
                color: '#6535F6',
                width:props.width-30
            }}
                selectedValue={User}
                onValueChange={(itemValue, itemIndex) =>
                    setUser(itemValue)
                }>
                <Picker.Item label='Select User' value='' color="#6535F6" />
                {
                    props.UserInfo?(
                        props.UserInfo.map(user=>{
                            if(user.User && props.User.HostelCode==user.HostelCode){
                                return <Picker.Item label={user.Name} value={user.Email} color="#6535F6" />
                            }
                        })
                    ):(
                        <Picker.Item label='Select User' value='' color="#6535F6" />
                    )
                }
            </Picker>
            <Button onPress={Save} mode='contained' style={{
                width:props.width-30,
                borderRadius:10,
                margin:10,
            }}>Save</Button>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(9, 180, 248, 0.068)"
                source={require("./../../files/lf30_editor_ifcirblf.json")}
                animationStyle={{
                    width: 150,
                    height: 150
                }}
                speed={1}
            />
        </View>
    );
};
const mapStateToProps=(state) => {
    return {
        UserInfo:state.User_Information
    }
}
export default connect(mapStateToProps)(AddBills);
