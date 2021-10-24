import React from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const ForgetPassword = (props) => {
    const [Email, setEmail] = React.useState(null);

    const ForgetPassword = () => {
        if (!Email) {
            Alert.alert("Wrong", "Email can't be empty.");
            return;
        }
        props.route.params.Loader(true);
        auth().sendPasswordResetEmail(Email).then((res) => {
            props.route.params.Loader(false);
            props.route.params.Alert(true,'Please check your email, we send you a email');
        }).catch((err) => {
            props.route.params.Loader(false);
            Alert.alert('Error!', err.message);
        })
    }
    return (
        <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center', backgroundColor: '#ffff' }}>
            <Icon name="user-circle-o" color="#02B1B9" size={50}></Icon>
            <TextInput onChangeText={value => setEmail(value)} label='Email' placeholder="Enter Email...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                width: 310,
                backgroundColor: '#ffff',
                color: '#02B1B9'
            }} />
            <Button mode='contained' onPress={() => ForgetPassword()} style={{
                marginVertical: 50, width: 223, borderRadius: 20, backgroundColor: '#02B1B9'
            }}>
                SEND
            </Button>
        </View>
    );
};

export default ForgetPassword;