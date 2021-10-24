import React from 'react';
import { View, Text } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import { DataTable } from 'react-native-paper';
import {connect} from 'react-redux';
import firestore  from '@react-native-firebase/firestore';
import { useLinkProps } from '@react-navigation/native';

const optionsPerPage = [2, 3, 4];


const Meal_routine = (props) => {

    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const [Data,setData] = React.useState(null);
    
    React.useEffect(() => {
        setPage(0);
        firestore().collection('Routine').orderBy('Day','asc').onSnapshot(doc=>{
            let array =[];
            doc.forEach(day=>{
                array.push(day.data());
            });
            setData(array);
        })
    }, [itemsPerPage]);
    return (
        <DropShadow style={{
            shadowColor: 'black',
            shadowOpacity: {
                width: 2,
                height: 2
            },
            shadowOpacity: .1,
            shadowRadius: 4,
            width: '100%', alignItems: 'center',
        }}>
            <View style={{
                width: props.width-10,
                minHeight: 400,
                marginVertical: 10,
                backgroundColor: '#FFFF',
                borderRadius: 20,
            }}>
                <Text style={{
                    fontSize: 22, fontWeight: '300', textAlign: 'center', marginVertical: 5
                }}>Daily Meal Routine</Text>

               {
                   Data? (
                    <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Day</DataTable.Title>
                        <DataTable.Title >Breakfast</DataTable.Title>
                        <DataTable.Title >Lunch</DataTable.Title>
                        <DataTable.Title >Dinner</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell>SAT</DataTable.Cell>
                        <DataTable.Cell>{Data[0].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[0].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[0].Dinner} </DataTable.Title>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>SUN</DataTable.Cell>
                        <DataTable.Cell>{Data[1].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[1].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[1].Dinner}</DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>MON</DataTable.Cell>
                        <DataTable.Cell>{Data[2].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[2].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[2].Dinner}</DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>TUE</DataTable.Cell>
                        <DataTable.Cell>{Data[3].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[3].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[3].Dinner}</DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>WED</DataTable.Cell>
                        <DataTable.Cell>{Data[4].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[4].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[4].Dinner}</DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>THU</DataTable.Cell>
                        <DataTable.Cell>{Data[5].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[5].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[5].Dinner}</DataTable.Title>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell>FRI</DataTable.Cell>
                        <DataTable.Cell>{Data[6].Breakfast}</DataTable.Cell>
                        <DataTable.Cell>{Data[6].Lunch}</DataTable.Cell>
                        <DataTable.Title >{Data[6].Dinner}</DataTable.Title>
                    </DataTable.Row>
                </DataTable>
                   ):(
                       <Text style={{
                           fontSize:15,
                           color:'red',
                           textAlign:'center'
                       }}>Loading...</Text>
                   )
               }
            </View>
        </DropShadow>
    );
};
const mapStateToProps=(state) => {
    return {
        Item: state.Item
    }
}
export default connect(mapStateToProps)(Meal_routine);