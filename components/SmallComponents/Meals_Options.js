import React from 'react';
import { View, ScrollView } from 'react-native';
import { Dialog, Portal, Text, Button, RadioButton, TextInput } from 'react-native-paper';
import { Alert, Modal, StyleSheet, Pressable } from "react-native";
import DropShadow from 'react-native-drop-shadow';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import AnimatedLoader from 'react-native-animated-loader';
import AllMeals from './../Admin/AllMeals';
import AddMeals from '../Admin/AddMeals';

const Meals_Options = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [headLine, setHeadLine] = React.useState('No Title');
    const [checked, setChecked] = React.useState('fixed');
    const [Cost, setCost] = React.useState(0);
    const [Hostel, setHostel] = React.useState(null);
    const [loader, setLoader] = React.useState(false);

    React.useEffect(() => {
        if (props.Hostel) {
            props.Hostel.forEach(document => {
                if (document.HostelCode === props.UserInfo.HostelCode) {
                    setHostel(document);
                    setCost(document.MealRate);
                    setChecked(document.MealType);
                }
            })
        }
    }, [props.Hostel])

    const SaveCost = () => {
        if (Cost && Hostel) {
            setLoader(true)
            firestore().collection('Hostel').doc(Hostel.HostelCode).update({
                MealRate: parseInt(Cost)
            }).then(() => {
                setLoader(false);
            })
        }
    }
    return (
        <DropShadow style={{
            shadowColor: '#0000',
            shadowOffset: {
                width: 2,
                height: 4
            },
            shadowOpacity: .2,
            shadowRadius: 5, alignItems: 'center'
        }}>
            <View style={{
                width: props.width-10,
                borderRadius: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10
            }}>
                <Text style={{
                    fontSize: 22, fontWeight: '400'
                }}>Meals Options</Text>
                <View style={{
                    width: props.width-10,
                    marginVertical: 5, flexDirection: 'row', justifyContent: 'center',
                }}>
                    <Button onPress={() => { setModalVisible(true); setHeadLine('All Meals'); }} mode="outlined" color="blue" style={{
                        width: props.width/2-30,
                        margin: 10
                    }}>All Meals</Button>
                    <Button disabled={!props.admin} onPress={() => { setModalVisible(true); setHeadLine('Add Meals'); }} mode="outlined" color="green" style={{
                        width: props.width/2-30,
                        margin: 10,
                    }}>Add Meals</Button>
                </View>
                <View style={{
                    width: props.width-10,
                    marginVertical: 5, flexDirection: 'row', justifyContent: 'center',
                }}>
                    <View style={{
                        width: props.width/2-5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <RadioButton
                            disabled={!props.admin}
                            value="first"
                            status={checked === 'fixed' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked('fixed')
                                firestore().collection('Hostel').doc(Hostel.HostelCode).update({
                                    MealType: 'fixed'
                                })
                            }}
                        />
                        <Text style={styles.text}>Fixed Calculation</Text>
                    </View>
                    <View style={{
                        width: props.width/2-5,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <RadioButton
                            disabled={!props.admin}
                            value="first"
                            status={checked === 'average' ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked('average')
                                firestore().collection('Hostel').doc(Hostel.HostelCode).update({
                                    MealType: 'average'
                                })
                            }}
                        />
                        <Text style={styles.text}>Average Calculation</Text>
                    </View>

                </View>
                <View style={{
                    width: props.width/2-5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TextInput theme={{ colors: { primary: '#03A486' } }} mode='flat' keyboardType='numeric' value={Cost.toString()} onChangeText={val => setCost(val)} disabled={checked === 'average' || !props.admin ? true : false}
                        placeholder='Enter Fixed Cost' label="Fixed Cost" style={{
                            width: props.width/2,
                            margin: 10,
                            backgroundColor: 'white'
                        }}></TextInput>
                    <Button mode='contained' onPress={SaveCost} disabled={checked === 'average' || !props.admin ? true : false} style={{
                        margin: 10,
                        width: 80,
                        backgroundColor: '#03A486'
                    }}>Save</Button>
                </View>
            </View>
            <View style={styles.centeredView}>
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
                            <Text style={styles.modalText}>{headLine}</Text>
                            <ScrollView style={{width:props.width}}>
                                {
                                    headLine == 'All Meals' ? (
                                        <AllMeals UserInfo={props.UserInfo} width={props.width}/>
                                    ) : (
                                        <AddMeals UserInfo={props.UserInfo} width={props.width}/>
                                    )
                                }
                            </ScrollView>
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
        </DropShadow>
    );
};
const mapStateToProps = (state) => {
    return {
        Hostel: state.Hostel
    }
}
export default connect(mapStateToProps)(Meals_Options);
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
        fontSize: 16, fontWeight: '300', marginBottom: 10
    }
});
