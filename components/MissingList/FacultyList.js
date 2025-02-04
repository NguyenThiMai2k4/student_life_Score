import MyStyle from "../../styles/MyStyle";
import { Alert, View, RefreshControl, StatusBar, ScrollView, ImageBackground, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Pressable, ActivityIndicator, FlatList } from 'react-native';
import Style from "./Style.js";
import React, { useState, useContext, useEffect } from "react";
import APIs, { authApi, endpoints } from "../../configs/API";
import { Chip, Searchbar, List } from "react-native-paper";
import MyContext from "../../configs/MyContext";
import { useNavigation } from "@react-navigation/native";

const FacultyList = () => {
    const [q, setQ] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [faculty, setFaculty] = React.useState([]);

    const navigation = useNavigation();

    const loadFaculty = async () => {
        setLoading(true);
        try {
            let url = `${endpoints['faculty']}`;
            if (q) {
                let queryParams = [`q=${q}`];
                url = `${url}?&${queryParams.join('&')}`;
            }
            let res = await APIs.get(url);
            setFaculty(res.data.results);
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFaculty();
    }, [q]);

    const search = (value, callback) => {
        callback(value);
    };

    return (
        <View style={Style.container}>
            <ImageBackground
                style={[Style.headerImg, { paddingTop: StatusBar.currentHeight }]}
                source={require('../../assets/missing.png')}
            />
            
            <Searchbar 
                placeholder="Tìm khoa..." 
                value={q} 
                onChangeText={t => search(t, setQ)} 
                style={{ marginBottom: 10 }}
            />

            {loading && <ActivityIndicator size="large" color="#2973B2" />}

            <FlatList 
                data={faculty} 
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={Style.facultyCard} 
                        onPress={() => navigation.navigate("MissingList", { "facultyId": item.id })}
                    >
                        <Image source={require("../../assets/missing.png")} style={Style.thumb} />
                        <Text style={Style.facultyText}>{item.name}</Text>
                        <TouchableOpacity style={Style.detailButton} onPress={() => navigation.navigate("MissingList", { "facultyId": item.id })}>
                            <Text style={Style.detailButtonText}>Xem</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default FacultyList;
