import React,{ useState} from 'react';
import { Text, View } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import { Dimensions } from 'react-native';

const Bill_Container = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={{ alignItems: 'center', width: windowWidth }}>
            <DropShadow
                style={{
                    shadowColor: "#0000",
                    shadowOffset: {
                        width: 1,
                        height: 5,
                    },
                    shadowOpacity: .1,
                    shadowRadius: 1,
                }}
            >
                <View style={{
                    backgroundColor: props.color,
                    width: windowWidth-20,
                    height: 80,
                    margin: 10,
                    borderRadius: 20,
                }}>
                <View style={{
                    backgroundColor: '#ffff',
                    width: windowWidth-40,
                    height: 80,
                    borderRadius: 20,
                    marginLeft:20,
                    flexDirection:'row',
                }}>
                <View style={{
                    padding:10,
                    width:windowWidth/2,
                    height:80,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color:props.color,
                        fontWeight:'bold',
                        fontSize:22
                    }}>{props.headLine}</Text>
                    <Text style={{
                        color:'#000',
                        fontWeight:'bold',
                        fontSize:22
                    }}>
                        {props.cost}
                    </Text>
                </View>
                <View style={{
                    width:windowWidth/2-40,
                    height:80,
                    backgroundColor:props.color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius:60,
                    borderTopRightRadius:20,
                    borderBottomEndRadius:20
                }}>

                </View>
                </View>
                </View>
            </DropShadow>

        </View>
    );
};

export default Bill_Container;