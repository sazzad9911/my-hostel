import React from 'react';
import { View, Text, Modal, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import DropShadow from 'react-native-drop-shadow';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import logo from './../../files/image/logo.png';
import firebase from '@react-native-firebase/app';
import AnimatedLoader from 'react-native-animated-loader';

const EventCart = (props) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [Information, setInformation] = React.useState(null);
    const [Status, setStatus] = React.useState(false);
    const [admin, setAdmin] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [closeTicket,setCloseTicket] = React.useState(false);

    React.useEffect(() => {
        if (props.data.Status && props.admin) {
            setStatus(false);
            setCloseTicket(false);
        } else {
            setStatus(true);
            setCloseTicket(true);
        }
        if (props.UserInformation && props.Hostel) {
            firestore().collection('EventTicket').onSnapshot(docs => {
                let arr2 = [];
                let array = [];
                //console.log(props.email)
                docs.forEach(doc => {
                    array.push(doc.data());
                    props.UserInformation.forEach(user => {
                        if (doc.get('Email') === user.Email && doc.get('Id') === props.data.Id) {
                            if (doc.get('Email') === props.email) {
                                setStatus(true);
                            }
                            arr2.push(user);
                        }
                    })
                })
                setInformation(arr2);
                props.changeEventTicket(array);
            });

        }
    }, [props.UserInformation + props.Hostel])

    const CloseTicket = () => {
        firestore().collection('Event').doc(props.data.Id).update({
            Status: false,
        });
        setModalVisible(false);
        setStatus(true);
        setCloseTicket(true);
    }
    const BuyTicket = () => {
        setLoader(true);
        setStatus(true);
        const extra = firebase.firestore.FieldValue.increment(props.data.Cost);
        firestore().collection('EventTicket').add({
            Date: new Date(),
            Email: props.email,
            Id: props.data.Id,
        }).then(() => {
            firestore().collection('UserInformation').doc(props.email).update({
                ExtraCost: extra,
            }).then(() => {
                Alert.alert('Success', 'Ticket added successfully');
                setLoader(false);
            })
        }).catch(err => {
            Alert.alert('Error', err.message);
            setLoader(false);
        })
    }
    return (
        <DropShadow style={{
            shadowColor: 'black',
            shadowOffset: {
                width: 2,
                height: 2
            },
            shadowOpacity: .2,
            shadowRadius: 8,
            width: props.width, alignItems: 'center',
            marginVertical: 5,
        }}>
            <View style={{
                width: props.width-10,
                minHeight: 100,
                marginVertical: 5,
                backgroundColor: 'white',
                borderRadius: 10
            }}>
                <Text style={{
                    fontSize: 22, fontWeight: '300', marginHorizontal: 10, marginVertical: 5
                }}>{props.head}</Text>
                <Text style={{
                    fontSize: 18, fontWeight: '300', marginHorizontal: 10, marginVertical: 5
                }}>{props.body}</Text>
                <Text style={{ fontSize: 18, fontWeight: '300', color: 'red', marginHorizontal: 10, marginVertical: 5 }}>
                    Ticket Fare: {props.cost}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                }}>
                    <Button mode='contained' onPress={()=>BuyTicket()} disabled={Status} style={{
                        width: props.width/2-25,
                        borderRadius: 10,
                        margin: 10,
                        backgroundColor: '#049F9C',
                    }}>Buy Ticket</Button>
                    <Button mode='contained' disabled={admin} onPress={() => setModalVisible(true)} style={{
                        width: props.width/2-25,
                        borderRadius: 10,
                        margin: 10,
                        backgroundColor: '#34495E',
                    }}>View Ticket</Button>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Ticket Buyer's Information</Text>
                        <ScrollView style={{ width: props.width-10 }}>
                            {
                                Information != null ? (
                                    <View>
                                        {
                                            Information.length > 0 ? (
                                                Information.map((data, key) => (
                                                    <Buyer key={key} Name={data.Name} Phone={data.Phone} Image={data.Image} />
                                                ))
                                            ) : (
                                                <Text style={{ textAlign: 'center' }}>No one here</Text>
                                            )
                                        }
                                    </View>
                                ) : (
                                    <Text style={{ textAlign: 'center' }}>Loading...</Text>
                                )
                            }
                        </ScrollView>
                        <Button onPress={() => CloseTicket()} disabled={closeTicket} style={styles.button} mode='contained'>Close Ticket</Button>
                        <Button style={styles.button} onPress={() => setModalVisible(false)} mode='contained'>Close</Button>
                    </View>
                </View>
            </Modal>
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
        UserInformation: state.User_Information,
        Hostel: state.Hostel,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeEventTicket: value => dispatch({ type: 'CHANGE_EVENT_TICKET', playload: value })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventCart);

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
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
        elevation: 2,
        width: 200,
        backgroundColor: "#2196F3",
        margin: 20
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        fontSize: 20,
        fontWeight: '300',
        textAlign: "center"
    }
});
const Buyer = (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: '#D3F4F9',
            borderRadius: 10,
            marginVertical: 10,
            marginHorizontal: 5
        }}>
            <View>
                <Image style={{
                    width: 50,
                    height: 50,
                    margin: 5,
                    borderRadius: 25
                }} source={{ uri: props.Image }} />
            </View>
            <View style={{
                marginLeft: 10,
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: '300',
                    marginVertical: 3
                }}>{props.Name}</Text>
                <Text>{props.Phone}</Text>
            </View>
        </View>
    )
}