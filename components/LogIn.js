import React from 'react';
import { View, Alert } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const LogIn = (props) => {
    const [Email, setEmail] = React.useState(null);
    const [Password, setPassword] = React.useState(null);

    const SignIn = () => {
        if (!Email || !Password) {
            Alert.alert("Wrong", "Email and Password can't be empty.");
            return;
        }
        props.route.params.Loader(true);
        auth().signInWithEmailAndPassword(Email, Password).then(() => {
            props.route.params.Loader(false);
            props.route.params.Alert(true,'LogIn Successful')
        }).catch(err => {
            Alert.alert('Error!', err.message);
            props.route.params.Loader(false);
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

            <TextInput onChangeText={value => setPassword(value)} label='Password' secureTextEntry placeholder="Enter Password...." underlineColor='#02B1B9' selectionColor='#0000ff' style={{
                width: 310,
                backgroundColor: '#ffff',
                color: '#02B1B9'
            }} />
            <Button mode='contained' onPress={() => SignIn()} style={{
                marginVertical: 50, width: 223, borderRadius: 20, backgroundColor: '#02B1B9'
            }}>
                LOG IN
            </Button>
            <Button mode='contained' onPress={() => props.navigation.navigate('Forget')} style={{
                marginVertical: -20, width: 223, borderRadius: 20, backgroundColor: '#02B1B9'
            }}>
                Forget Password?
            </Button>
        </View>
    );
};

export default LogIn;