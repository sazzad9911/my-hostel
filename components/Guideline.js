import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const Guideline = ({ navigation }) => {
    return (
        <ScrollView style={{ backgroundColor: '#ffff' }}>
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 20, fontWeight: 'bold', marginVertical: 30
                }}>Guideline</Text>
            </View>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>1. If you are manager of a Hostel/Mess you have
                create an account first. Give all the information and create a hostel.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>2. After creating account, you will able to see your Dashboard. Now you can change
                your meal settings in dashboard. In the Dashboard you can set fixed calculation or average calculation
                In fixed calculation the rate will be fixed for all member and for average calculation the rate will depends on the daily meal expenses.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>3. We divide all the bills into two parts. Home Bill contains all other bills such as
                Electricity bill, House rent, Wifi Bill ect. But in the meal account only meal calculation will save.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>4. In meal status bar, You can open or close your meals and also can set guest meal. This
                area will work automatically. So, be serious about it.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>5. Admin Activity, In this area you can add bazar cost for meal also can add expenses for your home account if you are admin. You can also check My History for you credit operations. Manger can see all user's activity in All History option.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>6. If you are manager you can find all user details in the User Information area.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>7. Daily meal routine will depends on favorite item, where user can like items for add item into their routine.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>8. In the suggestion area user can freely ask any question or their opinion.</Text>
            <Text style={{
                fontSize:20,
                fontWeight:'300',
                marginHorizontal:15,
                marginVertical:5
            }}>
                9. For more information, you can contact with us.
            </Text>
            <Text style={{
                margin:10, fontWeight: '800',fontSize:16
            }}>
                Developers: Chamber of Secret, Scientistx LTD(Sazzad, Amanullah, Emon)
                Website: http://www.safta.cu.ma Facebook: http://www.facebook.com/saftafood
            </Text>
            <View style={{
                alignItems: 'center',
                margin: 10
            }}>
                <Button color='#02B1B9' onPress={() => navigation.navigate('CreateHostel')} mode="outlined" style={{
                    width: 223,
                    marginVertical: 50,
                    borderRadius: 20,
                }}>Agree</Button>
            </View>
        </ScrollView>
    );
};

export default Guideline;