import MyStyle from "../../styles/MyStyle";
import {Button, Alert, View, RefreshControl, StatusBar, ScrollView, ImageBackground, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import React, { useState,useContext, useEffect } from "react";
import APIs, { authApi, endpoints } from "../../configs/API";
import { Card } from "react-native-paper";
import MyContext from "../../configs/MyContext";
import ListRegister from "../Student/ListRegister";
import styles from "./styles"

const Feature = ({navigation}) => {
    const [user, dispatch]= useContext(MyContext);
    if(user.role == "STUDENT"){
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate("Tool", { screen: "ListRegister" })}
                >
                    <Text style={styles.buttonText}>Xem hoạt động đã đăng ký</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate("Tool", { screen: "ViewPoint" })}
                >
                    <Text style={styles.buttonText}>Xem điểm rèn luyện</Text>
                </TouchableOpacity>
            </View>
        );
    }
    else if(user.role == "ASSISTANT" || user.role == "ADVISOR"){
        return(
            <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate("Tool", { screen: "StatsFaculty" })}
            >
                <Text style={styles.buttonText}>Xem thống kê</Text>
            </TouchableOpacity>
        </View>
        );
    }
    
    return(
        <View>
            <Text>Hello </Text>
        </View>
    )
}

export default Feature