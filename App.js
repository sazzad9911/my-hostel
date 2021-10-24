import React, { useState } from 'react';
import { View, Text, Button, Image,StatusBar } from 'react-native';
import AnimatedSplash from "react-native-animated-splash-screen";
import logo from './files/image/logo.png';
import Home from './components/Home';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import User_Information from './files/reducer/User_Information';
import User_Activity from './files/reducer/User_Activity';
import Meal from './files/reducer/Meal';
import Item from './files/reducer/Item';
import Item_User from './files/reducer/Item_User';
import Hostel from './files/reducer/Hostel';
import Home_Expense from './files/reducer/Home_Expense';
import Event from './files/reducer/Event';
import Bazar_Activity from './files/reducer/Bazar_Activity';
import Data from './components/Data';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  //combined reducers
  const combine=combineReducers({
    User_Information:User_Information,
    User_Activity: User_Activity,
    Meal: Meal,
    Item: Item,
    Item_User: Item_User,
    Hostel: Hostel,
    Home_Expense: Home_Expense,
    Event: Event,
    Bazar_Activity: Bazar_Activity

  });
  const store=createStore(combine);
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor={"rgba(240, 248, 255, 0)"}
      customComponent={
        <View style={{ backgroundColor: 'rgba(240, 248, 255, 0)' }}>
          <Image source={logo} style={{ height: 100, width: 100 }} />
          <Text style={{
            fontSize: 16, fontWeight: '600',
            color: '#02B1B9', marginLeft: 14,
            fontFamily: 'sans-serif'
          }}>MY HOSTEL</Text>
        </View>
      }
    >
      <Provider store={store}>
      <StatusBar
        hidden={false}
        barStyle='dark-content'
        showHideTransition='fade'
        animated={true}
        backgroundColor='rgba(240, 248, 255, 0)'
      />
      <Data setIsLoaded={(value) =>setIsLoaded(value)} />
      </Provider>
    </AnimatedSplash>

  )
}
export default App;