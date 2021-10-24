import React from 'react';
import {View,Alert,Text} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {TextInput, Button} from 'react-native-paper';
import firestore  from '@react-native-firebase/firestore';


const Contact = (props) => {
    const [text,setText] = React.useState('');

    React.useEffect(() => {
        firestore().collection('Suggestion').orderBy('Date','desc')
        .onSnapshot(doc=>{
            doc.forEach(s=>{
                if(!s.get('Seen') && props.admin){
                    Alert.alert(
                        s.get('Name'),
                        s.get('Text'),
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {
                              firestore().collection('Suggestion').doc(s.id).update({
                                  Seen: true
                              })
                          } }
                        ]
                      );
                }
            })
        })
    })

    const Send = () => {
       if(text){
        Alert.alert('Success','Suggest added successfully');
        firestore().collection('Suggestion').add({
            Date: new Date(),
            HostelCode:props.UserInfo.HostelCode,
            Email:props.UserInfo.Email,
            Name:props.UserInfo.Name,
            Text: text
        }).then(()=> {
            setText('');
        })
       }else{
        Alert.alert('Opps','Fill the field first.');
       }
    }
    return (
        <DropShadow style={{
            shadowColor:'black',
            shadowOffset:{
                width: 2,
                height:2
            },
            shadowOpacity:.2,
            shadowRadius:8,
            width:'100%',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <View style={{
                width:props.width-10,
                minHeight:200,
                marginVertical:10,
                borderRadius: 20,
                backgroundColor:'white',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <Text style={{
                textAlign: 'center',
                fontSize:22, fontWeight: '300'
            }}>Suggestion Box</Text>

            <TextInput value={text} onChangeText={val=>setText(val)} mode='flat' 
            label='Comments' placeholder='Enter Comments' style={{
                width:props.width-50,
                backgroundColor:'#FFFF',
            }}></TextInput>

            <Button onPress={Send} icon='send' mode='contained' style={{
                width:props.width-50,
                borderRadius: 20,
                marginVertical:10
            }}>Send</Button>
            </View>
            
        </DropShadow>
    );
};

export default Contact;