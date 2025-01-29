import React, {useState} from 'react';
import {
    StatusBar,
    ImageBackground,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Pressable
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Style from "./Style.js";
import MyStyle from "../../styles/MyStyle";
import {setStatusBarHidden} from "expo-status-bar";

const HomeScreen = () => {
    return (

        <View style={MyStyle.container}>

            <ImageBackground
                style={[Style.headerImg, {paddingTop: StatusBar.currentHeight}]}
                source={require('../../assets/extraActivity.png')}
            >
                <StatusBar translucent backgroundColor="#872f2b"/>
            </ImageBackground>
        </View>
    );

};
export default HomeScreen;