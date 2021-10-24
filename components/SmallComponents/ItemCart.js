import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import image from './../../files/image/logo.png';
import Icon from 'react-native-vector-icons/AntDesign';
import { TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ItemCart = (props) => {
    const [like, setLike] = React.useState(false);
    const [unlike, setUnlike] = React.useState(false);
    const [comment, setComment] = React.useState(null);
    const [Data, setData] = React.useState(null);
    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [likeNumber, setLikeNumber] = React.useState(0);
    const [disLikeNumber, setDisLikeNumber] = React.useState(0);
    const [user, setUser] = React.useState(null);

    const Comments = (props) => {
        return (
            <View style={{
                width: '100%',
                justifyContent: 'center'
            }}>
                <View style={{
                    width: props.width-50,
                    padding: 5,
                    minHeight: 50,
                    backgroundColor: '#D8CDF8',
                    borderRadius: 10,
                    margin: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image source={{ uri: props.Image }} style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                    }} />
                    <View style={{
                        marginLeft: 10
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>{props.Body}</Text>
                        <Text style={{
                            fontSize: 15,
                            fontWeight: '200'
                        }}>{props.Name}</Text>
                    </View>
                </View>
            </View>
        )
    }
    React.useEffect(() => {
        if (props.UserInformation) {
            firestore().collection('ItemUser').orderBy('Date', 'desc').onSnapshot(doc => {
                if (!doc.empty) {
                    let like = 0;
                    let unlike = 0;
                    doc.forEach(item => {
                        if (item.get('Like') && item.get('Id')==props.data.Id) {
                            like++;
                        } if (item.get('UnLike') && item.get('Id')==props.data.Id) {
                            unlike++;
                        }
                        if (item.get('Email') === props.email && item.get('Id')==props.data.Id) {
                            setLike(item.get('Like'));
                            setUnlike(item.get('UnLike'));
                        }
                    })
                    if (like) {
                        setLikeNumber(like);
                    } else if (unlike) {
                        setDisLikeNumber(unlike);
                    }
                }
            });
            props.UserInformation.forEach(user => {
                if (user.Email === props.data.Email) {
                    setUser(user);
                }
            });
            firestore().collection('ItemComments').orderBy('Date', 'desc').onSnapshot(docs => {
                let arr = [];
                docs.forEach(doc => {
                    props.UserInformation.forEach(user => {
                        if (doc.get('Id') === props.data.Id && doc.get('Email') == user.Email) {
                            arr.push({ "Name": user.Name, Image: user.Image, Comment: doc.get('Comment') });
                        }
                    })
                })
                //console.log(arr);
                setData(arr);
            })
        }
    }, [props.UserInformation + props.Hostel])
    const Like = () => {
        //setLike(true);
        if (like) {
            firestore().collection('ItemUser').add({
                Like: false,
                Date: new Date(),
                Email: props.email,
                UnLike: false,
                Id:props.data.Id
            })
        } else if (!like) {
            firestore().collection('ItemUser').add({
                Like: true,
                Date: new Date(),
                Email: props.email,
                UnLike: false,
                Id:props.data.Id
            })
        }
    }
    const UnLike = () => {
        if (unlike) {
            firestore().collection('ItemUser').add({
                Like: false,
                Date: new Date(),
                Email: props.email,
                UnLike: false,
                Id:props.data.Id
            })
        } else if (!unlike) {
            firestore().collection('ItemUser').add({
                Like: false,
                Date: new Date(),
                Email: props.email,
                UnLike: true,
                Id:props.data.Id
            })
        }
    }
    const Comment = () => {
        if (comment) {
            firestore().collection('ItemComments').add({
                Email: props.email,
                Comment: comment,
                Date: new Date(),
                Id: props.data.Id
            }).then(() => {
                setComment('');
            })
        } else {
            return;
        }
    }
    return (
        <View>
            <DropShadow style={{
                shadowColor: 'black',
                shadowOffset: {
                    width: 2,
                    height: 2
                },
                shadowOpacity: .2,
                shadowRadius: 8
            }}>
                <View style={{
                    width: props.width/2-10,
                    minHeight: props.width/2,
                    backgroundColor: '#ffffff',
                    margin: 5,
                    borderRadius: 10
                }}>
                    <TouchableOpacity onPress={() => setModalVisibility(true)}>
                        <Image source={{ uri: props.data.Image }} style={{
                            width: props.width/2-10,
                            height: props.width/2-10,
                            borderRadius: 10,
                        }}></Image>
                    </TouchableOpacity>
                    <Text style={{
                        margin: 5,
                        fontSize: 18,
                        fontWeight: '300'
                    }}>{props.data.Head}</Text>
                    <View style={{
                        flexDirection: 'row',
                        margin: 5,
                    }}>
                        <TouchableOpacity onPress={() => Like()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.text}>{likeNumber}</Text>
                            <Icon style={styles.icon} name={like ? 'like1' : 'like2'} size={30}></Icon>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => UnLike()} style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                            <Text style={styles.text}>{disLikeNumber}</Text>
                            <Icon style={styles.icon} name={unlike ? 'dislike1' : 'dislike2'} size={30}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>
            </DropShadow>
            <Modal visible={modalVisibility} transparent={true} animationType='slide'
                onRequestClose={() => setModalVisibility(!modalVisibility)}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    backgroundColor: '#FFFF'
                }}>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: '300',
                        margin: 20
                    }}>Item Details</Text>
                    <ScrollView>
                        <View style={{ alignItems: 'center',
                        width:props.width,
                        justifyContent:'center'
                        
                         }}>
                            <Image style={{
                                width: props.width-50,
                                height: props.width-90,
                                borderRadius: 20,
                                marginVertical:10
                            }} source={{ uri: props.data.Image }}></Image>
                        </View>
                        {
                            user ? (
                                <View style={{ flexDirection: 'row', alignItems: 'center',
                                backgroundColor:'#AC9CF9',borderRadius:25,width:props.width-40,
                                marginLeft:15
                                 }}>
                                    <Image source={{ uri: user.Image }} style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 25,
                                    }} />
                                    <Text style={{ fontSize: 17, marginLeft: 20,color: 'white' }}>{user.Name}</Text>
                                </View>
                            ) : (
                                <Text>loading...</Text>
                            )
                        }
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            margin: 5,
                            marginLeft:10
                        }}>{props.data.Head}</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '200',
                            margin: 5,
                            marginLeft:10
                        }}>{props.data.Body}</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#521CF7',
                            marginLeft:10
                        }}>Comments::</Text>
                        {
                            Data != null ? (
                                <View>
                                    {
                                        Data.length > 0 ? (
                                            Data.map((data, i) => (
                                                <Comments key={i} Name={data.Name} 
                                                Body={data.Comment} Image={data.Image} width={props.width}/>
                                        ))
                                        ) : (
                                            <Text>No comment</Text>
                                        )
                                    }
                                </View>
                            ) : (
                                <Text style={{ textAlign: 'center' }}>Loading...</Text>
                            )
                        }
                    </ScrollView>
                    <View style={{ flexDirection: 'row'}}>
                        <TextInput mode="flat" label='Comment' onChangeText={(value) => setComment(value)}
                            value={comment} placeholder="Enter your comment...."
                            style={{
                                width: props.width-120,
                                margin: 10,
                                backgroundColor: '#ffff'
                            }}></TextInput>
                        <Button onPress={() => Comment()} icon='send'
                            style={{
                                height: 50,
                                width: 80, marginTop: 25
                            }}>Send</Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};
const mapStateToProps = (state) => {
    return {
        UserInformation: state.User_Information,
        Hostel: state.Hostel,
    }
}
export default connect(mapStateToProps)(ItemCart);
const styles = StyleSheet.create({
    icon: {
        margin: 5
    },
    text: {
        fontSize: 16,
        fontWeight: '200',
        letterSpacing: -.6,
        margin: 5,
    }
})