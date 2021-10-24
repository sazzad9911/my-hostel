import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import DropShadow from "react-native-drop-shadow";
import firestore from '@react-native-firebase/firestore';
import { Dimensions } from 'react-native';


const Mill_Status = (props) => {
    const [checked, setChecked] = React.useState('CloseMeal');
    const [c, setC] = React.useState(null);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    React.useEffect(() => {
        if (props.UserInformation.MealQuantity == 0) {
            setChecked('CloseMeal');
        } else if (props.UserInformation.MealQuantity == 1) {
            setChecked('OpenMeal');
        } else if (props.UserInformation.MealQuantity == 2) {
            setChecked('OneGuest');
        } else if (props.UserInformation.MealQuantity == 3) {
            setChecked('TwoGuest');
        }
    }, [props.UserInformation])

    return (
        <DropShadow
            style={{
                shadowColor: "#0000",
                shadowOffset: {
                    width: 2,
                    height: 5,
                },
                shadowOpacity: .1,
                shadowRadius: 1,
            }}
        >
            <View style={{
                width: windowWidth,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                marginVertical: 10
            }}>
                <View style={{
                    width: windowWidth-10,
                    minHeight: 100,
                    borderRadius: 20,
                    backgroundColor: 'white',
                    padding: 0,
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '400',
                        fontSize: 22
                    }}>Meal Status</Text>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                    }}>
                        <View style={{
                            width: windowWidth/2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            <RadioButton
                                value="first"
                                status={checked === 'OpenMeal' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('OpenMeal');
                                    firestore().collection('UserInformation').doc(props.UserInformation.Email).update({
                                        MealQuantity: 1
                                    })
                                }}
                            />
                            <Text>Open Meal</Text>
                        </View>
                        <View style={{
                            width: windowWidth/2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <RadioButton
                                value="first"
                                status={checked === 'OneGuest' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('OneGuest');
                                    firestore().collection('UserInformation').doc(props.UserInformation.Email).update({
                                        MealQuantity: 2
                                    })
                                }}
                            />
                            <Text>With 1 Guest</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginVertical: 10
                    }}>
                        <View style={{
                            width: windowWidth/2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <RadioButton
                                value="first"
                                status={checked === 'CloseMeal' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('CloseMeal');
                                    firestore().collection('UserInformation').doc(props.UserInformation.Email).update({
                                        MealQuantity: 0
                                    })
                                }}
                            />
                            <Text>Close Meal</Text>
                        </View>
                        <View style={{
                            width:windowWidth/2,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row'
                        }}>
                            <RadioButton
                                value="first"
                                status={checked === 'TwoGuest' ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setChecked('TwoGuest');
                                    firestore().collection('UserInformation').doc(props.UserInformation.Email).update({
                                        MealQuantity: 3
                                    })
                                }}
                            />
                            <Text>With 2 Guest</Text>
                        </View>
                    </View>
                </View>
            </View>
        </DropShadow>
    );
};


export default Mill_Status;