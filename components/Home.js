import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LogIn from './LogIn';
import CreateHostel from './CreateHostel';
import CreateAccount from './CreateAccount';
import Guideline from './Guideline';
import Dashboard from './Dashboard';
import ForgetPassword from './ForgetPassword';
import Event from './Event';
import Item from './Item';
import Profile from './Profile';
import Ionicons from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import { Snackbar } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

const Home = (props) => {
    const [user, setUser] = useState(null);
    const [snackbar, setSnackbar] = React.useState({ 'visible': false, 'message': 'ok' });
    const [loader, setLoader] = React.useState(false);
    const [notify, setNotify] = React.useState(0);
    const [HostelCode,setHostelCode] = React.useState(null);

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setUser(user);
        });
    }, [])
    useEffect(() => {
       if(props.UserInfo && user){
           props.UserInfo.forEach(users =>{
               if(users.Email===user.email){
                let count = 0;
                firestore().collection('Event').orderBy('Date','desc').onSnapshot(docs=>{
                    docs.forEach(doc =>{
                        if(doc.get('Status') && doc.get('HostelCode')==users.HostelCode){
                            count++;
                        }
                    });
                    setNotify(count);
                })
               }
           })
       }
    }, [props.UserInfo])
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();
    const SnackBar = (visible, message) => {
        if (visible == true) {
            setSnackbar({ 'visible': true, 'message': message });
        } else {
            setSnackbar({ 'visible': false, 'message': message });
        }
    }

    return (
        <NavigationContainer>
            {
                !user ? (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name='Home' component={Page} />
                        <Stack.Screen name='CreateAccount' component={CreateAccount} initialParams={{ Alert: (visible, message) => SnackBar(visible, message), Loader: (value) => setLoader(value) }} />
                        <Stack.Screen name='CreateHostel' component={CreateHostel} initialParams={{ Alert: (visible, message) => SnackBar(visible, message), Loader: (value) => setLoader(value) }} />
                        <Stack.Screen name='LogIn' component={LogIn} initialParams={{ Alert: (visible, message) => SnackBar(visible, message), Loader: (value) => setLoader(value) }} />
                        <Stack.Screen name='Forget' component={ForgetPassword} initialParams={{ Alert: (visible, message) => SnackBar(visible, message), Loader: (value) => setLoader(value) }} />
                        <Stack.Screen name='GuideLine' component={Guideline} />
                    </Stack.Navigator>
                ) : (
                    <Tab.Navigator screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Dashboard') {
                                iconName = focused
                                    ? 'dashboard'
                                    : 'dashboard';
                            } else if (route.name === 'Profile') {
                                iconName = focused ? 'user-circle-o' : 'user-circle-o';
                            } else if (route.name === 'Event') {
                                iconName = focused ? 'calendar' : 'calendar';
                            } else if (route.name === 'Item') {
                                iconName = focused ? 'shopping-basket' : 'shopping-basket';
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#02B1B9',
                        tabBarInactiveTintColor: 'gray',
                        headerTitleAlign: 'center',
                    })}>
                        <Tab.Screen name="Dashboard" component={Dashboard} initialParams={{ email: user.email }} />
                        <Tab.Screen name="Profile" component={Profile} initialParams={{ email: user.email }}/>
                        <Tab.Screen name="Event" options={{ tabBarBadge: notify }} component={Event} initialParams={{ email: user.email}}/>
                        <Tab.Screen name="Item" component={Item} initialParams={{ email: user.email }}/>
                    </Tab.Navigator>
                )
            }
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
            <Snackbar visible={snackbar.visible} onDismiss={() => setSnackbar({ visible: false })}>
                {snackbar.message}
            </Snackbar>
        </NavigationContainer>
    )
}
const mapStateToProps=(state)=>{
    return {
        Hostel:state.Hostel,
        UserInfo:state.User_Information
    }
}
export default connect(mapStateToProps)(Home);

const Page = ({ navigation }) => {
    return (
        <View style={{
            backgroundColor: '#fff', width: '100%',
            height: '100%', justifyContent: 'center', alignItems: 'center'
        }}>
            <Icon name="user-circle-o" color="#02B1B9" size={50} />
            <Button onPress={() => navigation.navigate('LogIn')} mode="contained" color="#02B1B9" style={{
                borderRadius: 20,
                width: 223,
                margin: 10
            }}>SIGN IN</Button>
            <Text>or</Text>
            <Button onPress={() => navigation.navigate('CreateAccount')} mode="contained" color="#02B1B9" style={{
                borderRadius: 20,
                width: 223,
                margin: 10
            }}>SIGN UP</Button>
            <Text>or</Text>
            <Button onPress={() => navigation.navigate('GuideLine')} mode="contained" color="#02B1B9" style={{
                borderRadius: 20,
                width: 223,
                margin: 10
            }}>CREATE HOSTEL</Button>
        </View>
    )
}