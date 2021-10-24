import React from 'react';
import { Text, View } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { Dimensions } from 'react-native';

const Bill_Details = (props) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <DropShadow style={{
            shadowColor: 'black',
            shadowOffset: {
                width: 2,
                height: 5
            },
            shadowOpacity: .2,
            shadowRadius: 3

        }}>
            <View style={{
                width: 115,
                height: 124,
                backgroundColor: 'white',
                borderRadius: 15,
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: '300',
                    margin: 5
                }}>{props.name}</Text>
                <View style={{
                    width: 80,
                    height: 80,
                    backgroundColor: props.color,
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 70,
                        height: 70,
                        backgroundColor: 'white',
                        borderRadius: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: props.color
                        }}>{props.cost}</Text>
                        <Text>Tk</Text>
                    </View>
                </View>
                <View>
                </View>
            </View>
        </DropShadow>
    );
};

export default Bill_Details;