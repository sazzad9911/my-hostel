import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import Bill_Container from './SmallComponents/Bill_Container';
import Mill_Status from './SmallComponents/Mill_Status';
import Bill_Details from './SmallComponents/Bill_Details';
import Admin_Activity from './SmallComponents/Admin_Activity';
import Meals_Options from './SmallComponents/Meals_Options';
import User_Information from './SmallComponents/User_Information';
import Meal_routine from './SmallComponents/Meal_routine';
import Contact from './SmallComponents/Contact';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { Dimensions } from 'react-native';

const Dashboard = (props) => {
    const [UserInformation, setUserInformation] = React.useState(null);
    const [mealRate, setMealRate] = React.useState(0);
    const [TotalMeals, setTotalMeals] = React.useState(0);
    const [MealDue, setMealDue] = React.useState(0);
    const params = props.route.params;
    const [MyMeals, setMyMeals] = React.useState(0);
    const [BazarCost, setBazarCost] = React.useState(0);
    const [admin, setAdmin] = React.useState(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    React.useEffect(() => {
        if (props.UserInformation && props.Hostel && props.Meal && props.BazarList) {
            firestore().collection('UserInformation').doc(params.email).onSnapshot(doc => {
                setUserInformation(doc.data());

                let totalMeals = 0;
                let myMeals = 0;
                let myExpenses = 0;
                props.Meal.forEach(m => {
                    if (m.HostelCode === doc.get('HostelCode')) {
                        totalMeals = totalMeals + m.Meal;
                        if (m.Email === params.email) {
                            myMeals = myMeals + m.Meal;
                            myExpenses = myExpenses + (m.Meal * m.Fixed);
                        }
                    }
                });
                setMyMeals(myMeals);
                setTotalMeals(totalMeals);

                //bazarList
                let bazarList = 0;
                props.BazarList.forEach(b => {
                    if (b.HostelCode === doc.get('HostelCode')) {
                        bazarList = bazarList + b.Cost;
                    }
                });
                setBazarCost(bazarList);
                //console.log(bazarList);
                props.Hostel.forEach(h => {
                    if (h.HostelCode === doc.get('HostelCode')) {
                        if (h.MealType === 'fixed') {
                            setMealRate(h.MealRate);
                            setMealDue((myExpenses - doc.get('MealCredit')));
                        } else {
                            setMealRate((bazarList / totalMeals).toFixed(2));
                            let rate = bazarList / totalMeals;
                            rate = rate * myMeals;
                            setMealDue((rate - doc.get('MealCredit')).toFixed(2));
                        }

                        //admin
                        if (h.Manager === params.email || params.email == 'sazzad15-2521@diu.edu.bd' ||
                            params.email == 'jayanta15-2641@diu.edu.bd') {
                            setAdmin(true);
                        }else{
                            setAdmin(false);
                        }
                    }
                });
            });
        }
    }, [props.UserInformation + props.Hostel + props.Meal + props.BazarList]);

    return (
        <ScrollView style={{ backgroundColor: '#ffff', width: '100%', height: '100%' }}>
            {
                UserInformation != null && admin!=null ? (
                    <View>
                        <Bill_Container color='#9974E4' headLine='Meal Credit' cost={UserInformation.MealCredit} />
                        <Bill_Container color='#9EE1F3' headLine='Home Credit' cost={UserInformation.HomeCredit} />
                        <Bill_Container color='#E185DA' headLine='Meal Due' cost={MealDue} />
                        <Bill_Container color='#4BAC55' headLine='Home Due' cost={UserInformation.HomeRent +
                            UserInformation.GasBill + UserInformation.CookingCost + UserInformation.WifiBill
                            + UserInformation.ElectricityBill + UserInformation.ExtraCost - UserInformation.HomeCredit} />
                        <Bill_Container color='#5D65D9' headLine='Total Meal' cost={MyMeals} />
                        <Bill_Container color='#C55D5D' headLine='Meal Rate' cost={mealRate} />
                        <Mill_Status UserInformation={UserInformation} />
                        <View style={{
                            flexDirection: 'row',
                            flexWrap:'wrap',
                            width:windowWidth,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Bill_Details name='Home Rent' color='#F87D7D' cost={UserInformation.HomeRent} />
                            <Bill_Details name='Cooking Cost' color='#EC43DB' cost={UserInformation.CookingCost} />
                            <Bill_Details name='Gas Bill' color='#9ED47B' cost={UserInformation.GasBill} />
                            <Bill_Details name='Wifi Bill' color='#9260BC' cost={UserInformation.WifiBill} />
                            <Bill_Details name='Electricity Bill' color='#7CBFA2' cost={UserInformation.ElectricityBill} />
                            <Bill_Details name='Extra Cost' color='#F6F15B' cost={UserInformation.ExtraCost} />
                        </View>
                        <Admin_Activity UserInfo={UserInformation} admin={admin} />
                        <Meals_Options UserInfo={UserInformation} admin={admin} width={windowWidth}/>
                        <User_Information UserInfo={UserInformation} admin={admin} width={windowWidth}/>
                        <Meal_routine width={windowWidth}/>
                        <Contact UserInfo={UserInformation} admin={admin} width={windowWidth}/>
                    </View>
                ) : (
                    <View>
                        <Text style={{ textAlign: 'center' }}>Loading...</Text>
                    </View>
                )
            }
            
        </ScrollView>
    );
};
const mapStateToProps = (state) => {
    return {
        UserInformation: state.User_Information,
        Hostel: state.Hostel,
        Meal: state.Meal,
        BazarList: state.Bazar_Activity
    }
}
export default connect(mapStateToProps)(Dashboard);