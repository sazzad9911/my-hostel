import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CreateHostel = (props) => {
    const [Email, setEmail] = React.useState(null);
    const [HostelName, setHostelName] = React.useState(null);
    const [HostelAddress, setHostelAddress] = React.useState(null);
    const [HostelCode, setHostelCode] = React.useState(null);
    const [Name, setName] = React.useState(null);
    const [Phone, setPhone] = React.useState(null);
    const [Password, setPassword] = React.useState(null);
    const [ConfirmPassword, setConfirmPassword] = React.useState(null);

    const CreateHostel = () => {
        if (!Email) {
            Alert.alert("Wrong!", "Email can't be empty.");
            return;
        }
        if (!HostelName) {
            Alert.alert("Wrong!", "Hostel Name can't be empty.");
            return;
        }
        if (!HostelAddress) {
            Alert.alert("Wrong!", "Hostel Address can't be empty.");
            return
        }
        if (!HostelCode) {
            Alert.alert("Wrong!", "Hostel Code can't be empty.");
            return;
        }
        if (!Name) {
            Alert.alert("Wrong!", "Name can't be empty.");
            return;
        }
        if (!Phone) {
            Alert.alert("Wrong!", "Phone can't be empty.");
            return;
        }
        if (!Password) {
            Alert.alert("Wrong!", "Password can't be empty.");
            return;
        }
        if (Password != ConfirmPassword) {
            Alert.alert("Wrong!", "Password are not same.");
            return;
        }
        if (HostelCode.length < 6) {
            Alert.alert("Wrong!", "Hostel code will 6 digit.");
            return;
        }
        props.route.params.Loader(true);
        firestore().collection('Hostel').orderBy('HostelName', 'asc').get().then((docs) => {
            docs.forEach((doc) => {
                if (doc.get('HostelCode') === HostelCode) {
                    Alert.alert("Wrong!", "Hostel code already exist.");
                    return;
                }
            });
            auth()
                .createUserWithEmailAndPassword(Email, Password)
                .then(() => {
                    firestore().collection('Hostel').doc(HostelCode).set({
                        HostelCode: HostelCode,
                        HostelName: HostelName,
                        HostelAddress: HostelAddress,
                        Manager: Email,
                        MealType: 'fixed',
                        MealRate: 0
                    });
                    firestore().collection('UserInformation').doc(Email).set({
                        Name: Name,
                        Email: Email,
                        Phone: Phone,
                        HostelCode: HostelCode,
                        NID: 'Empty',
                        FatherName: 'Empty',
                        FatherPhone: 'Empty',
                        Image: 'https://i.ibb.co/YNmzXkH/safta-food.png',
                        Address: 'empty',
                        SeatNo: 'empty',
                        MealCredit: 0,
                        HomeCredit: 0,
                        ElectricityBill: 0,
                        WifiBill: 0,
                        GasBill: 0,
                        CookingCost: 0,
                        ExtraCost: 0,
                        MealQuantity: 0,
                        MealDebit: 0,
                        Notification: 0,
                        HomeRent: 0,
                        User:true,
                    }).then(() => {
                        props.route.params.Loader(false);
                        props.route.params.Alert(true, 'Hostel created successfully!');
                    })
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        props.route.params.Loader(false);
                        Alert.alert('Error!', 'That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        props.route.params.Loader(false);
                        Alert.alert('Error!', 'That email address is invalid!');
                    }
                    props.route.params.Loader(false);
                    Alert.alert("Error!", error.message);
                });
        })
    }

    return (
        <ScrollView style={{ backgroundColor: '#ffff' }}>
            <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#ffff', marginVertical: 30 }}>
                <Icon name="user-circle-o" color="#02B1B9" size={50}></Icon>
                <TextInput onChangeText={value => setHostelName(value)} label='Hostel Name' placeholder="Enter Hostel Name...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setHostelAddress(value)} label='Hostel Address' placeholder="Enter Hostel Address...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setHostelCode(value)} label='Hostel Code' placeholder="New Hostel Code...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setName(value)} label='Name' placeholder="Enter Your Name...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setEmail(value)} label='Email' placeholder="Enter Your Email...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setPhone(value)} label='Phone Number' placeholder="Enter Your Phone Number...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setPassword(value)} label='Create Password' secureTextEntry placeholder="Enter Create Password...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <TextInput onChangeText={value => setConfirmPassword(value)} label='Confirm Password' secureTextEntry placeholder="Enter Confirm Password...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                    width: 310,
                    backgroundColor: '#ffff',
                    color: '#02B1B9'
                }} />
                <Button mode='contained' onPress={() => CreateHostel()} style={{
                    marginVertical: 50, width: 223, borderRadius: 20, backgroundColor: '#02B1B9'
                }}>
                    CREATE MESS
                </Button>

            </View>
        </ScrollView>
    );
};

export default CreateHostel;