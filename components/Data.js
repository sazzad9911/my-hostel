import React, { Component } from 'react';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';
import Home from './Home';

class Data extends Component {

    constructor(props) {
        super(props);
        this.getUserInfo();
        this.getHostel();
        this.getMeal();
        this.getBazarList();
    }
    getUserInfo=async ()=> {
        const userInfo =await firestore().collection('UserInformation').get();
        let arr=[];
        userInfo.forEach(doc=>{
            arr.push(doc.data());
            //console.log(doc.data());
        })
        this.props.changeUserInfo(arr);
    }
    getHostel=async ()=>{
        const Hostel= await firestore().collection('Hostel').get();
        let arr=[];
        Hostel.forEach(doc=>{
            arr.push(doc.data());
        })
        this.props.changeHostel(arr);
    }
    getMeal=async ()=>{
        const Meal= await firestore().collection('Meal').get();
        let arr=[];
        Meal.forEach(doc=>{
            arr.push(doc.data());
        })
        this.props.changeMeal(arr);
    }
    getBazarList=async ()=>{
        const BazarList= await firestore().collection('BazarList').get();
        let arr=[];
        BazarList.forEach(doc=>{
            arr.push(doc.data());
        })
        this.props.changeBazarList(arr);
    }
    componentDidMount() {
        this.props.setIsLoaded(true);

    }
    render() {
        return (
                <Home/>
        );
    }
}
const mapDispatchToProps=(dispatch)=>{

    return {
        changeUserInfo:(value)=>{dispatch({type:'CHANGE_USER_INFORMATION',playload:value})},
        changeHostel:(value)=>{dispatch({type:'CHANGE_HOSTEL',playload:value})},
        changeMeal:(value)=>{dispatch({type:'CHANGE_MEAL',playload:value})},
        changeBazarList:(value)=>{dispatch({type:'CHANGE_BAZAR_ACTIVITY',playload:value})},
        changeItem:(value)=>{dispatch({type:'CHANGE_ITEM',playload:value})}
    }
}
export default connect(null,mapDispatchToProps)(Data);