import React, { useState,useEffect } from 'react';
import { Text, View, Modal, Pressable, StyleSheet,ScrollView,Alert} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const User_Information = (props) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [UserInfo,setUserInfo] = useState(null);
    const [HomeDue,setHomeDue] = useState(0);
    const [MealDue,setMealDue] = useState(0);
    const [TotalMeal,setTotalMeal]= useState(0);

    React.useEffect(() => {
        if(UserInfo && props.Hostel && props.Meal && props.BazarList){
            let home=(UserInfo.ElectricityBill+ UserInfo.WifiBill+ 
                UserInfo.GasBill+ UserInfo.CookingCost+ UserInfo.ExtraCost+ UserInfo.HomeRent)-
                UserInfo.HomeCredit;
                setHomeDue(home);


                //
                let myMeal=0,totalMeal=0,expenses=0;
                props.Meal.forEach(m=>{
                    if(m.HostelCode===UserInfo.HostelCode){
                        totalMeal=totalMeal+m.Meal;
                        if(m.Email===UserInfo.Email){
                            myMeal=myMeal+m.Meal;
                            expenses=expenses+(m.Meal*m.Fixed);
                        }
                    }
                });
                setTotalMeal(myMeal);
                //
                let AvgExpenses=0;
                props.BazarList.forEach(b=>{
                    if(b.HostelCode===UserInfo.HostelCode){
                        AvgExpenses=AvgExpenses+b.Cost;
                    }
                });
                AvgExpenses=AvgExpenses/totalMeal;
                AvgExpenses=AvgExpenses*myMeal;
                props.Hostel.forEach(h=>{
                    if(h.HostelCode==UserInfo.HostelCode){
                        if(h.MealType=='fixed'){
                            //
                            setMealDue(expenses-UserInfo.MealCredit);
                        }else{
                            setMealDue((AvgExpenses-UserInfo.MealCredit).toFixed(2));
                        }
                    }
                })
        }
    },[UserInfo])


    const DeleteUser=()=>{
        firestore().collection('UserInformation').doc(UserInfo.Email).update({
            User:false,
        }).then(()=>{
            Alert.alert('Success','Delete user record successfully');
        })
    }
    const MakeAdmin=()=>{
        firestore().collection('Hostel').doc(UserInfo.HostelCode).update({
            Manager:UserInfo.Email
        }).then(()=>{
            Alert.alert('Success','Admin changed successfully');
        })
    }
    return (
        <View>
            <DropShadow style={{
                shadowColor: 'black',
                shadowOffset: {
                    width: 2,
                    height: 3
                },
                shadowOpacity: .2,
                shadowRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    width: props.width-10,
                    minHeight: 150,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    marginVertical: 10,
                }}>
                    <Text style={{
                        fontSize: 22, fontWeight: '300', textAlign: 'center'
                    }}>User Information</Text>
                    <Picker mode='dropdown' dropdownIconColor='blue' style={{
                        backgroundColor: '#E1FDFE',
                        margin: 5,
                        borderRadius: 5,
                        color: 'green'
                    }}
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }>
                        <Picker.Item label="Select User" value="" color="green" />
                        {
                           props.UserInformation?(
                            props.UserInformation.map((user, index)=>{
                                if(user.User && user.HostelCode===props.UserInfo.HostelCode){
                                    return <Picker.Item label={user.Name} value={user.Email} key={index} color="green" />
                                }
                            })
                           ):(
                            <Picker.Item label="Select User" value="" color="green" />
                           )
                        }
                    </Picker>
                    <Button disabled={!props.admin} onPress={()=>{
                        if(selectedLanguage){
                            props.UserInformation.forEach((user)=>{
                                if(selectedLanguage===user.Email) {
                                    setUserInfo(user);
                                    setModalVisible(true);
                                }
                            });
                        }else{
                            Alert.alert('Opps!','Please select user first.');
                        }
                    }} mode='contained' color="green" style={{
                        width:props.width-100,
                        marginVertical:5,
                        borderRadius:20,
                        marginLeft:50
                    }}>View</Button>
                </View>
            </DropShadow>
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>User Information</Text>
                            <ScrollView style={{ width: props.width }}>
                            {
                                UserInfo?(
                                    <View style={{
                                        width:props.width-10,
                                        marginVertical: 10,
                                        marginHorizontal:5,
                                        backgroundColor:'#03A486',
                                        padding:10,
                                        borderRadius:10
                                    }}>
                                    <Text style={styles.text}>Name: {UserInfo.Name}</Text>
                                    <Text style={styles.text}>Phone: {UserInfo.Phone}</Text>
                                    <Text style={styles.text}>Email: {UserInfo.Email}</Text>
                                    <Text style={styles.text}>NID: {UserInfo.NID}</Text>
                                    <Text style={styles.text}>Father Name: {UserInfo.FatherName}</Text>
                                    <Text style={styles.text}>Father Phone: {UserInfo.FatherPhone}</Text>
                                    <Text style={styles.text}>Home Due: {HomeDue}</Text>
                                    <Text style={styles.text}>Meal Due: {MealDue}</Text>
                                    <Text style={styles.text}>Total Meal: {TotalMeal}</Text>
                                    </View>
                                ):(
                                    <Text>Please select user first</Text>
                                )
                            }
                            </ScrollView>
                            <View style={{
                                flexDirection:'row',
                                width:props.width-10,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Button onPress={DeleteUser} mode='contained' style={{
                                backgroundColor:'red',
                                margin:10,
                                borderRadius:20,
                                width:props.width/2-20,
                                marginBottom:20
                            }}>Delete User</Button>
                            <Button onPress={MakeAdmin} style={{
                                backgroundColor:'green',
                                margin:10,
                                borderRadius:20,
                                width:props.width/2-20,
                                marginBottom:20
                            }} mode='contained'>Make Admin</Button>
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};
const mapStateToProps = (state)=>{
    return {
        UserInformation: state.User_Information,
        Hostel: state.Hostel,
        Meal: state.Meal,
        BazarList: state.Bazar_Activity
    }
}
export default connect(mapStateToProps)(User_Information);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: "white",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        width: 223,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 22,
        fontWeight: '400',
        textAlign: "center"
    },
    text: {
        fontSize:20,
        color: "#FFFFFF",
        margin:5
    }
});
