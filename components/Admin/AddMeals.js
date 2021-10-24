import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import AnimatedLoader from 'react-native-animated-loader';

const AddMeals = (props) => {
    const [oldDate, setOldDate] = React.useState(null);
    const [AllUsers, setAllUsers] = React.useState(null);
    const [Meals, setMeals] = React.useState(null);
    const [TotalMeal, setTotalMeal] = React.useState(null);
    const [Hostel, setHostel] = React.useState(null);
    const [loader, setLoader] = React.useState(false);
    const [button, setButton] = React.useState(false);

    React.useEffect(() => {
        if (props.UserInformation && props.Hostel) {
            let arr = [];
            props.UserInformation.forEach(user => {
                if (user.User && user.MealQuantity > 0 &&
                     props.UserInfo.HostelCode==user.HostelCode) {
                    arr.push(user);
                }
            });
            setAllUsers(arr);

            //
            props.Hostel.forEach(hostel => {
                if (hostel.HostelCode == props.UserInfo.HostelCode) {
                    setHostel(hostel);
                }
            })
            firestore().collection('Meal').orderBy('Date', 'desc').onSnapshot(docs => {
                let arr = [];
                let totalMeal = 0;
                docs.forEach(doc => {
                    if (doc.get('HostelCode') == props.UserInfo.HostelCode) {
                        arr.push(doc.data());
                        totalMeal = totalMeal + doc.get('Meal');
                    }
                });
                if (arr[0]) {
                    let oldDate = arr[0].Date.toDate();
                    oldDate = oldDate.getDate() + '-' + oldDate.getMonth() + '-' + oldDate.getFullYear();
                    let newDate = new Date();
                    newDate = newDate.getDate() + '-' + newDate.getMonth() + '-' + newDate.getFullYear();
                    //
                    //console.log(newDate);
                    if (oldDate == newDate) {
                        setOldDate(true);
                        setButton(true);
                    } else {
                        setButton(false);
                    }
                }
                setMeals(arr);
                setTotalMeal(totalMeal);
            });
        }
    }, [props.UserInformation])
    const Delete = (email) => {
        if (AllUsers) {
            let arr = [];
            AllUsers.forEach(user => {
                if (user.Email != email) {
                    arr.push(user);
                }
            })
            setAllUsers(arr);
        }
    }
    const Save = () => {
        if (AllUsers) {
            setLoader(true);
            const db = firebase.firestore();
            const batch = db.batch();
            AllUsers.forEach(user => {
                const ref = db.collection('Meal').doc();
                batch.set(ref, {
                    Date: new Date(),
                    Meal: user.MealQuantity,
                    Email: user.Email,
                    HostelCode: user.HostelCode,
                    Fixed: Hostel.MealRate,
                });
            });
            batch.commit().then(() => {
                setLoader(false);
                Alert.alert('Success', 'Successfully added meal to collection');
            });
        }
    }
    return (
        <View style={{
            width: props.width,
            height: '100%',
        }}>
            <ScrollView>
                {
                    AllUsers ? (
                        oldDate ? (
                            <Text style={{
                                color: 'red',
                                textAlign: 'center'
                            }}>Meal already saved for today</Text>
                        ) : (
                            AllUsers.length > 0 ? (
                                AllUsers.map((user, i) => (
                                    <Views width={props.width} user={user} key={i} Delete={val => Delete(val)} />
                                ))
                            ) : (
                                <Text style={{
                                    color: 'red',
                                    textAlign: 'center'
                                }}>No User</Text>
                            )
                        )
                    ) : (
                        <Text style={{
                            color: 'red',
                            textAlign: 'center'
                        }}>Loading...</Text>
                    )
                }
            </ScrollView>
            <View style={{
                alignItems: 'center'
            }}>
                <Button mode='contained' disabled={button} onPress={() => Save()} style={{
                    backgroundColor: '#03A486',
                    width: props.width-20,
                    borderRadius: 20
                }}>Save</Button>
            </View>
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
const mapStateToProps = (state) => {
    return {
        UserInformation: state.User_Information,
        Hostel: state.Hostel,
    }
}
export default connect(mapStateToProps)(AddMeals);

const Views = (props) => {

    return (
        <View style={{
            width: props.width-20,
            backgroundColor: '#03A486',
            margin: 10,
            borderRadius: 20,
            padding: 5,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    flex: 1
                }}>
                    <Avatar.Image size={40} source={{ uri: props.user.Image }} />
                </View>
                <View style={{
                    flex: 2
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: '#ffff',
                        marginHorizontal: 10
                    }}>{props.user.Name}</Text>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Text style={{
                        fontSize: 17,
                        color: '#ffff',
                        marginHorizontal: 10
                    }}>Meal: {props.user.MealQuantity}</Text>
                </View>
                <View style={{
                    flex: .5
                }}>
                    <TouchableOpacity onPress={() => props.Delete(props.user.Email)}>
                        <Icon name='circle-with-cross' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}