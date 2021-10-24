import React from 'react';
import { ScrollView, Text, View, Modal, StyleSheet, Alert } from 'react-native';
import ItemCart from './SmallComponents/ItemCart';
import { connect } from 'react-redux';
import { FAB, TextInput, Button, Chip } from 'react-native-paper';
import AnimatedLoader from 'react-native-animated-loader';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import { Dimensions } from 'react-native';

const Item = (props) => {
    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [admin, setAdmin] = React.useState(true);
    const [upload, setUpload] = React.useState(false);
    const [Head, setHead] = React.useState(null);
    const [Body, setBody] = React.useState(null);
    const [url, setUrl] = React.useState(null);
    const [imageName, setImageName] = React.useState(null);
    const [selected, setSelected] = React.useState(false);
    const [selected1, setSelected1] = React.useState(false);
    const [selected2, setSelected2] = React.useState(false);
    const [select, setSelect] = React.useState(null);
    const params = props.route.params;
    const [loader, setLoader] = React.useState(false);
    const [Data, setData] = React.useState(null);
    const [Id, setId] = React.useState(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const OpenLibrary = () => {
        setUpload(true);
        const options = {
            mediaType: 'photo',
            quality: .8
        }
        launchImageLibrary(options, response => {
            if (response.errorMessage) {
                Alert.alert('Opps!', response.errorMessage);
            } else if (response.assets) {
                setUrl(response.assets[0].uri);
                setImageName(response.assets[0].fileName);
                // console.log(response.assets[0].uri);
            }
        })
    }
    const AddItem = () => {
        if (Head && Body && url && select && imageName && Id) {
            setLoader(true);
            const ref = storage().ref('Item/' + imageName);
            ref.putFile(url).then(() => {
                ref.getDownloadURL().then((uri) => {
                    firestore().collection('Item').doc(Id).set({
                        Head: Head,
                        Body: Body,
                        Date: new Date(),
                        Type: select,
                        Email: params.email,
                        Image: uri,
                        Id: Id
                    }).then((doc) => {
                        Alert.alert('Success!', 'Successfully done to add item.');
                        setLoader(false);
                        setModalVisibility(false);
                    })
                });
            })
        } else {
            Alert.alert('Error', 'Fields are not set correctly.');
        }

    }
    React.useEffect(() => {
        setId(uuid.v1());
        firestore().collection('Item').orderBy('Date', 'desc').onSnapshot(docs => {
            let arr = [];
            docs.forEach(doc => {
                arr.push(doc.data());
            })
            setData(arr);
            //console.log(arr);
            props.changeItem(arr);
        })
    }, [props.UserInformation + props.Hostel])
    return (
        <View style={{
            width: windowWidth,
            height: '100%',
        }}>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {
                        Data ? (
                            Data.map((data, i) => (
                                <ItemCart key={i} data={data}
                                    email={params.email} width={windowWidth} />
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center' }}>Loading...</Text>
                        )
                    }
                </View>
            </ScrollView>
            <FAB onPress={() => setModalVisibility(true)} disabled={!admin} icon='plus' style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 20,
                right: 20,
            }}>

            </FAB>
            <Modal visible={modalVisibility} animationType="fade" transparent={true} onRequestClose={
                () => setModalVisibility(!modalVisibility)}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#ffff',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '300',
                    }}>Add Item Menu</Text>
                    <TextInput mode='flat' onChangeText={value => setHead(value)} placeholder='Enter Item Name....'
                        label='Item Name' style={styles.input}></TextInput>
                    <TextInput mode='flat' onChangeText={value => setBody(value)} placeholder='Enter Item Details....'
                        label='Item Details' multiple={true} style={styles.input}></TextInput>
                    <Button icon='plus' disabled={upload} mode='contained' style={styles.button} onPress={OpenLibrary}>Food Image</Button>
                    <View style={{ flexDirection: 'row' }}>
                        <Chip mode='flat' onPress={() => { setSelect('Lunch'); setSelected(!selected) }}
                            selectedColor='#521CF7' selected={selected}>Lunch</Chip>
                        <Chip mode='flat' onPress={() => { setSelect('Dinner'); setSelected1(!selected1) }}
                            selectedColor='#521CF7' selected={selected1}>Dinner</Chip>
                        <Chip mode='flat' onPress={() => { setSelect('Breakfast'); setSelected2(!selected2) }}
                            selectedColor='#521CF7' selected={selected2}>Breakfast</Chip>
                    </View>
                    <Button icon='plus' mode='contained' style={styles.button} onPress={AddItem}>Add Item</Button>
                    <Button icon='close' mode='contained' style={styles.button}
                        onPress={() => setModalVisibility(!modalVisibility)}>Close</Button>
                </View>
            </Modal>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(9, 180, 248, 0.068)"
                source={require("./../files/lf30_editor_ifcirblf.json")}
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
        UserInformation: state.User_Information,
        Hostel: state.Hostel,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeItem: value => dispatch({ type: 'CHANGE_ITEM', playload: value })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Item);
const styles = StyleSheet.create({
    input: {
        width: 250,
        backgroundColor: '#FFFFFF',
    },
    button: {
        width: 250,
        marginVertical: 20,
        borderRadius: 20

    }
})