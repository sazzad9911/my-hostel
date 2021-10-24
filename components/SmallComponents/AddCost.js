import React from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import AnimatedLoader from 'react-native-animated-loader';
import ListView from './../Admin/ListView';
import { connect } from 'react-redux';

const AddCost = (props) => {
    const [HandCash, setHandCash] = React.useState(0);
    const [TotalExpenses, setTotalExpenses] = React.useState(0);
    const [Cost, setCost] = React.useState(null);
    const [Type, setType] = React.useState(null);
    const [Data, setData] = React.useState(null);
    const [loader, setLoading] = React.useState(false);

    React.useState(() => {
        if (props.UserInformation) {
            firestore().collection('BazarList').orderBy('Date', 'desc').onSnapshot(docs => {
                let arr = [];
                let cost = 0;
                docs.forEach(doc => {
                    if (doc.get('HostelCode') === props.UserInfo.HostelCode) {
                        arr.push(doc.data());
                        cost = cost + doc.get('Cost');
                    }
                });
                setTotalExpenses(cost);
                setData(arr);

                let total = 0;
                props.UserInformation.forEach(doc => {
                    if (doc.HostelCode === props.UserInfo.HostelCode) {
                        total = total + doc.MealCredit;
                    }
                });

                setHandCash(total-cost);
            });
        }
    }, [props.UserInformation])
    const AddCost = () => {
        if (Cost && Type) {
            setLoading(true);
            firestore().collection('BazarList').add({
                HostelCode: props.UserInfo.HostelCode,
                Email: props.UserInfo.Email,
                Cost: parseInt(Cost),
                Type: Type,
                Date: new Date()
            }).then(() => {
                setLoading(false);
                Alert.alert('Success!', 'Meal Added Successful.');
                setCost('');
                setType('');
            })
        } else {
            Alert.alert('Wrong', 'Please enter all inputs.');
        }
    }
    const styles = StyleSheet.create({
        input: {
            width: props.width-50,
            backgroundColor: '#FFFFFF',
        },
        headLine: {
            fontSize: 20,
            fontWeight: 'bold',
            margin: 5,
            color: '#FFFFFF',
        },
        text: {
            fontSize: 15,
            fontWeight: '300',
            margin: 5,
            color: '#FFFFFF',
        },
        box: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
        }
    })
    return (
        <View style={{
            width: props.width-10,
            minHeight: 100,
            backgroundColor: 'white',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 5
        }}>
            <View style={{
                flex: 1,
                backgroundColor: '#5E47FB',
                flexDirection: 'row',
                borderRadius: 20
            }}>
                <View style={styles.box}>
                    <Text style={styles.headLine}>{HandCash}</Text>
                    <Text style={styles.text}>HandCash</Text>
                </View>
                <View style={styles.box}>
                    <Text style={styles.headLine}>{TotalExpenses}</Text>
                    <Text style={styles.text}>TotalExpenses</Text>
                </View>
            </View>
            <Text style={{
                fontSize: 20,
                fontWeight: '300',
                textAlign: 'center',
                margin: 5
            }}>Add New</Text>
            <TextInput onChangeText={(val) => setCost(val)} mode='flat' value={Cost}
                label="Cost" placeholder='Enter Cost..' style={styles.input} keyboardType='numeric' />
            <TextInput onChangeText={(val) => setType(val)} mode='flat' label="Details"
                placeholder="Enter Details...." style={styles.input} value={Type} />
            <Button onPress={() => AddCost()} mode='contained' style={{
                width: props.width-50,
                borderRadius: 15,
                margin: 15,
                backgroundColor:'#4524E5'
            }}>Save</Button>
            <ScrollView>
                {
                    Data ? (
                        <View>
                            {
                                Data.length > 0 ? (
                                    Data.map((data, i) => (
                                        <ListView data={data} key={i} width={props.width}/>
                                    ))
                                ) : (
                                    <Text style={{ textAlign: 'center' }}>No Data!</Text>
                                )
                            }
                        </View>
                    ) : (
                        <Text style={{ textAlign: 'center' }}>Loading....</Text>
                    )
                }
            </ScrollView>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(9, 180, 248, 0.068)"
                source={require("./../../files/lf30_editor_ifcirblf.json")}
                animationStyle={{
                    width: 150,
                    height: 150
                }}
                speed={1}
            />
        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        UserInformation: state.User_Information
    }
}
export default connect(mapStateToProps)(AddCost);
