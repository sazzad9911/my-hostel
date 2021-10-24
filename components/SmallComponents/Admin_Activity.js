import React from 'react';
import { View, ScrollView } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { Alert, Modal, StyleSheet, Pressable } from "react-native";
import DropShadow from 'react-native-drop-shadow';
import AddCost from './AddCost';
import AddExpenses from './AddExpenses';
import AllHistory from './AllHistory';
import AddBills from './AddBills';
import { Dimensions } from 'react-native';

const Admin_Activity = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [headLine, setHeadLine] = React.useState('No Title');

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

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
                width: windowWidth-20,
                borderRadius: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10
            }}>
                <Text style={{
                    fontSize: 22, fontWeight: '400'
                }}>Admin Activity</Text>
                <View style={{
                    width: windowWidth-20,
                    marginVertical: 5, flexDirection: 'row', justifyContent: 'center',
                }}>
                    <Button disabled={!props.admin} onPress={() => { setModalVisible(true); setHeadLine('Bazar List'); }} mode="outlined" color="red" style={{
                        width: windowWidth/2-30,
                        margin: 10
                    }}>Bazar List</Button>
                    <Button disabled={!props.admin} onPress={() => { setModalVisible(true); setHeadLine('Expense List'); }} mode="outlined" color="red" style={{
                        width: windowWidth/2-30,
                        margin: 10,
                    }}>Expense List</Button>
                </View>
                <View style={{
                    width: windowWidth-20,
                    marginVertical: 5, flexDirection: 'row', justifyContent: 'center',
                }}>
                    <Button onPress={() => { setModalVisible(true); setHeadLine('All History'); }} mode="outlined" color="blue" style={{
                        width: windowWidth/2-30,
                        margin: 10
                    }}>All History</Button>
                    <Button disabled={!props.admin} onPress={() => { setModalVisible(true); setHeadLine('Add Bills'); }} mode="outlined" color="green" style={{
                        width: windowWidth/2-30,
                        margin: 10,
                    }}>Add Bills</Button>
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
                            <ScrollView style={{width: windowWidth}}>
                                {
                                    headLine=='Bazar List'?(
                                        <AddCost UserInfo={props.UserInfo} headLine={headLine} width={windowWidth}/>
                                    ):
                                    headLine=='Expense List'?(
                                        <AddExpenses UserInfo={props.UserInfo} headLine={headLine} width={windowWidth}/>
                                    ):
                                    headLine=='All History'?(
                                       <AllHistory UserInfo={props.UserInfo} headLine={headLine} width={windowWidth}/>
                                    ):
                                    (
                                        <AddBills User={props.UserInfo} headLine={headLine} width={windowWidth}/>
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
        </DropShadow>
    );
};

export default Admin_Activity;
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
        backgroundColor: "#00BFAF",
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
    }
});
