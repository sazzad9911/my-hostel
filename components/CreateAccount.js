import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const CreateAccount = (props) => {
    const [HostelCode, setHostelCode] = React.useState(null);
    const [Name, setName] = React.useState(null);
    const [Email, setEmail] = React.useState(null);
    const [Phone, setPhone] = React.useState(null);
    const [Password, setPassword] = React.useState(null);
    const [ConfirmPassword, setConfirmPassword] = React.useState(null);
    const [set, setSet] = React.useState(null);

    const CreateAccount = () => {
        if (!HostelCode) {
            Alert.alert("Wrong!", "HostelCode can't be empty.'");
            return;
        }
        if (!Name) {
            Alert.alert("Wrong!", "Name can't be empty'");
            return;
        } if (!Email) {
            Alert.alert("Wrong!", "Email can't be empty'");
            return;
        } if (!Phone) {
            Alert.alert("Wrong!", "Phone can't be empty'");
            return;
        } if (!Password) {
            Alert.alert("Wrong!", "Password can't be empty'");
            return;
        } if (Password != ConfirmPassword) {
            Alert.alert("Wrong!", "Password are not equal");
            return;
        }
        props.route.params.Loader(true);
        firestore().collection('Hostel').orderBy('HostelName', 'asc').get().then((docs) => {
            docs.forEach((doc) => {
                if (doc.get('HostelCode') === HostelCode) {
                    setSet(true);
                    auth()
                        .createUserWithEmailAndPassword(Email, Password)
                        .then(() => {
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
                                User: true,
                            }).then(() => {
                                props.route.params.Loader(false);
                                props.route.params.Alert(true, 'Account created successfully!');
                            })
                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                props.route.params.Loader(false);
                                Alert.alert('Error', 'That email address is already in use!');
                            }

                            if (error.code === 'auth/invalid-email') {
                                props.route.params.Loader(false);
                                Alert.alert('Error', 'That email address is invalid!');
                            }
                            props.route.params.Loader(false);
                            Alert.alert('Error', error.message);
                        });
                }
            });

            if (!set) {
                props.route.params.Loader(false);
                Alert.alert("Wrong!", "Hostel code is invalid. Please ask to your manager for code.");
                return;
            }
        })
    }
    return (
        <ScrollView style={{ backgroundColor: '#ffff' }}>
            <View style={{
                backgroundColor: '#ffff',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 50
            }}>
                <Icon name="user-circle-o" color="#02B1B9" size={50} />
                <TextInput onChangeText={value => setHostelCode(value)} mode='contained' label='Hostel Code' placeholder="Enter Hostel Code..."
                    underlineColor='#02B1B9'
                    style={{
                        width: 310,
                        backgroundColor: '#ffff',
                    }} />
                <TextInput onChangeText={value => setName(value)} mode='contained' label='Full Name' placeholder="Enter Full Name..."
                    underlineColor='#02B1B9'
                    style={{
                        width: 310,
                        backgroundColor: '#ffff',
                    }} />
                <TextInput onChangeText={value => setEmail(value)} mode='contained' type='email' label='Email' placeholder="Enter Email Address..."
                    underlineColor='#02B1B9'
                    style={{
                        width: 310,
                        backgroundColor: '#ffff',
                    }} />
                <TextInput onChangeText={value => setPhone(value)} mode='contained' type='number' label='Phone' placeholder="Enter Phone Number..."
                    underlineColor='#02B1B9'
                    style={{
                        width: 310,
                        backgroundColor: '#ffff',
                    }} />
                <TextInput onChangeText={value => setPassword(value)} mode='contained' secureTextEntry label='Password' placeholder="Enter Password..."
                    underlineColor='#02B1B9'
                    style={{
                        width: 310,
                        backgroundColor: '#ffff',
                    }} />
                <TextInput onChangeText={value => setConfirmPassword(value)} mode='contained' secureTextEntry label='Confirm Password' placeholder="Enter Password Again..."
                    underlineColor='#02B1B9'
                    style={{
                        width: 310,
                        backgroundColor: '#ffff',
                    }} />
                <Button onPress={() => CreateAccount()} mode='contained' style={{
                    backgroundColor: '#02B1B9',
                    borderRadius: 30,
                    width: 223,
                    marginVertical: 50
                }}>SIGN UP</Button>
            </View>
        </ScrollView>
    );
};

export default CreateAccount;