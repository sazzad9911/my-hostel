import React from 'react';
import { ScrollView, View, Text, Modal,StyleSheet,Alert } from 'react-native';
import EventCart from './SmallComponents/EventCart';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { FAB, Button, TextInput } from 'react-native-paper';
import AnimatedLoader from 'react-native-animated-loader';
import { Dimensions } from 'react-native';

const Event = (props) => {
    const [UserInformation, setUserInformation] = React.useState(null);
    const [Hostel, setHostel] = React.useState(null);
    const [Data, setData] = React.useState(null);
    const params = props.route.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [Head, setHead] = React.useState(null);
    const [Body, setBody] = React.useState(null);
    const [Cost, setCost] = React.useState(null);
    const [loader, setLoader]= React.useState(false);
    const [admin,setAdmin] = React.useState(false);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    React.useEffect(() => {
        if (props.UserInformation && props.Hostel) {
            props.UserInformation.forEach(user => {
                if (user.Email === params.email) {
                    setUserInformation(user);
                    props.Hostel.forEach(doc => {
                        if (doc.HostelCode === user.HostelCode) {
                            setHostel(doc);
                        }
                        if(doc.Manager===params.email || params.email=='sazzad15-2521@diu.edu.bd' || 
                        params.email=='jayanta15-2641@diu.edu.bd'){
                            setAdmin(true);
                        }
                    });

                    firestore().collection('Event').orderBy('Date', 'desc').onSnapshot(docs => {
                        let array = [];
                        let arr = [];
                        docs.forEach(doc => {
                            arr.push(doc.data())
                            if (user.HostelCode === doc.get('HostelCode')) {
                                array.push(doc.data());
                            }
                        })
                        setData(array);
                        props.changeEvent(arr);
                    })
                }
            })

        }
    }, [props.UserInformation + props.Hostel]);

    const AddEvent = () => {
        if(!Head || !Body || !Cost){
            Alert.alert('Wrong','Please enter all information');
            return;
        }
        setLoader(true);
        firestore().collection('Event').add({
            Date: new Date(),
            HostelCode:Hostel.HostelCode,
            Email: UserInformation.Email,
            Head: Head,
            Body: Body,
            Cost:parseInt(Cost),
            Status: true,
        }).then((doc) => {
            firestore().collection('Event').doc(doc.id).update({
                Id:doc.id
            }).then(() => {
                setLoader(false);
                setModalVisible(false);
            })
        })
    }

    const styles = StyleSheet.create({
        input: {
            width: windowWidth-50,
            backgroundColor: 'white',
        },
        button: {
            borderRadius: 20,
            width: 120,
            margin: 20
        }
    })
    return (

        <View>
            {
                UserInformation != null && Hostel != null && Data != null ? (
                    <ScrollView style={{ width: windowWidth, height: '100%' }}>
                        {
                            Data.length > 0 ? (
                                Data.map(data => (
                                    <EventCart key={data.Id} data={data} head={data.Head}
                                     body={data.Body} cost={data.Cost} email={params.email}
                                      width={windowWidth} admin={admin}/>
                                ))
                            ) : (
                                <Text style={{ textAlign: 'center' }}>No Data Available</Text>
                            )
                        }

                    </ScrollView>
                ) : (
                    <View>
                        <Text style={{ textAlign: 'center' }}>Loading...</Text>
                    </View>
                )
            }
            <FAB small icon="plus" disabled={!admin} onPress={() => setModalVisible(true)} style={{
                backgroundColor: '#049F9C',
                position: 'absolute',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                bottom: 20,
                right: 20,
            }}></FAB>
            <Modal animationType='fade' visible={modalVisible}
                transparent={true} onRequestClose={() => setModalVisible(false)}>
                <View style={{
                    flex: 1, justifyContent: 'center', alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '300' }}>Add Event</Text>
                    <TextInput onChangeText={value => setHead(value)} value={Head} style={styles.input} mode='flat' label='HeadLine' placeholder='Enter head line...' />
                    <TextInput onChangeText={value => setBody(value)} value={Body} style={styles.input} mode='flat' label='Content' multiline={true} placeholder='Enter content...' />
                    <TextInput onChangeText={value => setCost(value)} value={Cost} style={styles.input} mode='flat' label='Cost' keyboardType='numeric' placeholder='Enter event cost...' />
                    <View style={{ flexDirection: 'row' }}>
                        <Button onPress={() => AddEvent()} style={styles.button} mode='contained'>Save</Button>
                        <Button style={styles.button} onPress={() => setModalVisible(!modalVisible)} mode='contained'>Close</Button>
                    </View>
                </View>
            </Modal>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(9, 180, 248, 0.068)"
                source={require("./../files/lf30_editor_ifcirblf.json")}
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
const mapDispatchToProps = (dispatch) => {
    return {
        changeEvent: value => dispatch({ type: 'CHANGE_EVENT', playload: value })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Event);
