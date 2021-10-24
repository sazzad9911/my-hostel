import React from 'react';
import {View} from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnacksBar = (props) => {
    const [visible,setVisible] = React.useState(props.visible);
    return (
        <View>
            <Snackbar visible={visible} onDismiss={()=>setVisible(false)}>
            {props.text}
            </Snackbar>
        </View>
    );
};

export default SnacksBar;