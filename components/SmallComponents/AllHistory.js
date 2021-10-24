import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { connect } from 'react-redux';

const AllHistory = (props) => {
    const [All, setAll] = React.useState(null);

    React.useEffect(() => {
        if (props.UserInformation) {
            firestore().collection('History').orderBy('Date', 'desc').onSnapshot(data => {
                let all = [];
                data.forEach(history => {
                    if(history.get('HostelCode')===props.UserInfo.HostelCode){
                        props.UserInformation.forEach(userInfo => {
                            if (history.get('Email') === userInfo.Email) {
                                all.push({
                                    "Name": userInfo.Name, "Cost": history.get('Cost'),
                                    "Type": history.get('Type'), "Date": history.get('Date')
                                });
                            }
                        });
                    }
                });
                setAll(all);
            });
        }

    }, [props.UserInformation])

    const Views = (props) => {
        let date = props.data.Date.toDate();
        date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>Type: {props.data.Type}</Text>
                    <Text style={{
                        fontSize: 17,
                        color: '#ffff',
                        margin: 5,
                        marginLeft:40
                    }}>Cost: {props.data.Cost} Tk</Text>
                </View>
                <Text style={styles.text}>User: {props.data.Name}</Text>
                <Text style={{
                    color:'yellow',
                    margin: 5,
                }}>Date: {date}</Text>
            </View>
        )
    }
    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#1A5276',
            margin: 10,
            width: 150
        },
        container: {
            width: props.width-10,
            minHeight: 50,
            backgroundColor: '#009075',
            margin: 5,
            padding: 5,
            borderRadius: 10,
        },
        text: {
            fontSize: 17,
            color: '#ffff',
            margin: 5,
        }
    })
    return (
        <View style={{
            width: props.width
        }}>
            <View style={{
                flexDirection: 'row',
            }}>
            </View>
            <ScrollView>
                {
                    All ? (
                        All.length > 0 ? (
                            All.map((d, i) => (
                                <Views key={i} data={d} width={props.width}/>
                            ))
                        ) : (
                            <Text style={{
                                textAlign: 'center',
                                color: 'red'
                            }}>No Data Available</Text>
                        )
                    ) : (
                        <Text style={{ textAlign: 'center' }}>Loading.....</Text>
                    )
                }
            </ScrollView>
        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        UserInformation: state.User_Information
    }
}
export default connect(mapStateToProps)(AllHistory);
