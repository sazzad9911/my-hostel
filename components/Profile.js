import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { Avatar, Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import AnimatedLoader from 'react-native-animated-loader';
import { Dimensions } from 'react-native';

const Profile = (props) => {
    const [text, setText] = React.useState('');
    const [edit, setEdit] = React.useState(true);
    const params = props.route.params;
    const [UserInformation, setUserInformation] = React.useState(null);
    const [Hostel, setHostel] = React.useState(null);
    const [loader, setLoader] = React.useState(false);
    //User define--
    const [Name, setName] = React.useState(null);
    const [NID, setNID] = React.useState(null);
    const [Phone, setPhone] = React.useState(null);
    const [FatherName, setFatherName] = React.useState(null);
    const [FatherPhone, setFatherPhone] = React.useState(null);
    const [SeatNo, setSeatNo] = React.useState(null);
    const [Address, setAddress] = React.useState(null);
    const [Image, setImage] = React.useState(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    //executable functions
    const Save = () => {
        if (Name && NID && Phone && FatherName && FatherPhone && SeatNo && Address) {
            setEdit(true);
            firestore().collection('UserInformation').doc(params.email).update({
                Name: Name,
                NID: NID,
                Phone: Phone,
                FatherName: FatherName,
                FatherPhone: FatherPhone,
                SeatNo: SeatNo,
                Address: Address
            })
        } else {
            Alert.alert('Wrong!', 'Inputs cannot be empty.');
        }
    };

    const OpenLibrary = () => {
        const option = {
            mediaType: 'photo',
            quality: .8,
        }
        launchImageLibrary(option, response => {
            if (response.didCancel) {
                Alert.alert('Opps!', 'You close the library.');
            } else if (response.errorMessage) {
                Alert.alert('Opps!', response.errorMessage);
            } else if (response.assets) {
                setImage(response.assets[0].uri);
                setLoader(true);

                const reference = storage().ref('photo/' + response.assets[0].fileName);
                reference.putFile(response.assets[0].uri).then(() => {
                    reference.getDownloadURL().then((url) => {
                        firestore().collection('UserInformation').doc(params.email).update({
                            Image: url,
                        }).then(() => {
                            setLoader(false);
                        })
                    })
                })
            }
        })
    }
    React.useEffect(() => {
        if (props.UserInformation && props.Hostel) {
            props.UserInformation.forEach(user => {
                if (user.Email === params.email) {
                    setUserInformation(user);
                    setName(user.Name);
                    setNID(user.NID);
                    setPhone(user.Phone);
                    setFatherName(user.FatherName);
                    setFatherPhone(user.FatherPhone);
                    setSeatNo(user.SeatNo);
                    setAddress(user.Address);
                    setImage(user.Image);
                    props.Hostel.forEach(doc => {
                        if (doc.HostelCode === user.HostelCode) {
                            setHostel(doc);
                        }
                    })
                }
            })

        }

    }, [props.UserInformation + props.Hostel])
    if (UserInformation && Hostel) {
        return (
            <View>
                <DropShadow style={{
                    shadowColor: 'black',
                    shadowOffset: {
                        width: 2,
                        height: 2
                    },
                    shadowOpacity: .3,
                    shadowRadius: 6,
                    height: 330,
                }}>

                    <View
                        style={{
                            width: 800,
                            minHeight: 800,
                            backgroundColor: '#f0ffff',
                            borderRadius: 400,
                            top: -480,
                            left: -100,
                            zIndex: -2,
                            position: 'absolute'
                        }}>
                    </View>
                    <View style={{
                        width: 800,
                        minHeight: 800,
                        backgroundColor: '#ffffff',
                        borderRadius: 400,
                        flexDirection: 'row',
                        top: -600,
                        left: -300,
                        position: 'absolute'

                    }}>
                    </View>
                    <View
                        style={{
                            width: 400,
                            minHeight: 400,
                            backgroundColor: '#dcdcdc',
                            borderRadius: 200,
                            flexDirection: 'row',
                            top: -100,
                            left: 200,
                            position: 'absolute',
                            zIndex: -1

                        }}>
                    </View>
                    <View style={{
                        top: 50,
                        position: 'absolute',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: windowWidth,
                        color: 'black'
                    }}>
                        <TouchableOpacity style={{
                            width: 90,
                            height: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }} onPress={() => OpenLibrary()}>
                            <Avatar.Image style={{
                                backgroundColor: '#f0ffff',
                            }} size={80} source={{ uri: Image }} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: '300'
                        }}>{Name}</Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '100',
                            margin: 5,
                            color: 'green'
                        }}>HOSTEL NAME: {Hostel.HostelName} </Text>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '100',
                            margin: 5,
                            color: 'green'
                        }}>HOSTEL CODE: {Hostel.HostelCode}</Text>
                    </View>
                </DropShadow>
                <ScrollView style={{
                    top: -330,
                    zIndex: 4, width: windowWidth
                }}>
                    <DropShadow style={{
                        shadowColor: 'black',
                        shadowOffset: {
                            width: 2,
                            height: 2
                        },
                        shadowOpacity: .1,
                        shadowRadius: 4, alignItems: 'center', marginTop: 340
                    }}>
                        <View style={{
                            width: windowWidth-10,
                            minHeight: 400,
                            borderRadius: 20,
                            backgroundColor: '#C9F8FB',
                            alignItems: 'center',
                            marginBottom: 15,
                        }}>
                            <Text style={{ fontSize: 22, fontWeight: '300' }}>Information</Text>
                            <View style={{
                                width: windowWidth-10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 10,
                                flexDirection: 'row',
                            }}>
                                <Button icon='memory' mode='contained' disabled={edit} onPress={() => Save()} style={{
                                    width: windowWidth/2-70,
                                    borderRadius: 20,
                                    backgroundColor: '#00AAB5',
                                    marginRight: 10
                                }}>Save</Button>

                                <Button icon='memory' mode='contained' onPress={() => OpenLibrary()} style={{
                                    width: windowWidth/2,
                                    borderRadius: 20,
                                    backgroundColor: '#00AAB5',
                                    marginRight: 10
                                }}>Change Image</Button>
                                <TouchableOpacity onPress={() => setEdit(false)}>
                                    <Icon name="edit" size={30} color='#00AAB5'></Icon>
                                </TouchableOpacity>
                            </View>
                            <TextInput onChangeText={(value) => setName(value)} label='Name' value={Name} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 10
                            }}></TextInput>
                            <TextInput onChangeText={(value) => setNID(value)} label='NID/SID' value={NID} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 10
                            }}></TextInput>
                            <TextInput onChangeText={(value) => setPhone(value)} label='Phone' value={Phone} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 10
                            }}></TextInput>
                            <TextInput onChangeText={(value) => setFatherName(value)} label='Father/Mother Name' value={FatherName} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 10
                            }}></TextInput>
                            <TextInput onChangeText={(value) => setFatherPhone(value)} label="Father/Mother Phone" value={FatherPhone} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 10
                            }}></TextInput>
                            <TextInput onChangeText={(value) => setSeatNo(value)} label='Seat No' value={SeatNo} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 10
                            }}></TextInput>
                            <TextInput onChangeText={(value) => setAddress(value)} label='Permanent Address' value={Address} mode='flat' disabled={edit} style={{
                                width: windowWidth-50, backgroundColor: '#C9F8FB', marginBottom: 40
                            }}></TextInput>
                        </View>
                    </DropShadow>
                </ScrollView>
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
        )
    } else {
        return (
            <View><Text style={{
                textAlign: 'center'
            }}>Loading...</Text></View>
        )
    }
};
const mapStateToProps = (state) => {
    return {
        UserInformation: state.User_Information,
        Hostel: state.Hostel
    }
}
export default connect(mapStateToProps)(Profile);
const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 5
    }
})