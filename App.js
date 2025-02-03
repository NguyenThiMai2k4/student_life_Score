import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Login from "./components/Login/Login";
import LoginScreen from "./components/Login/Login.js";
import SignupScreen from "./components/Signup/Signup"
import Style from "./components/Login/Style";
import React, {useReducer} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import VerifyOTP from "./components/Signup/auth";
import HomeScreen from "./components/Home/Home";
import MyUserReducer from "./reducers/MyUserReducer";
import MyContext from "./configs/MyContext";
import AddExtractActivity from "./components/Assistant/ExtractActivity";
import AddDetailActivity from "./components/Assistant/AddDetailActivity";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const assistantScreen = () => {
    return (
        <Stack.Navigator initialRouteName="AddExtractActivity">
            <Stack.Screen name={"AddExtractActivity"} component={AddExtractActivity} options={{headerShown:false}}/>
            <Stack.Screen name={"AddDetailActivity"} component={AddDetailActivity} options={{title:"Thêm chi tiết hoạt động"}}/>
        </Stack.Navigator>
    )

}
export default function App() {
    const [user, dispatch] = useReducer(MyUserReducer, null);

    return (
        <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                {user === null ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen name="SignupScreen" component={SignupScreen}/>

                    </Stack.Navigator>
                ) : (
                    <Drawer.Navigator>
                        <Drawer.Screen
                            name="HomeScreen"
                            component={HomeScreen}
                            options={{
                                // headerShown: false,
                                title: user?.email || 'Home',

                            }}
                        />

                        <Drawer.Screen name="Hoạt động ngoại khóa" component={assistantScreen}/>
                        <Drawer.Screen name="VerifyOTP" component={VerifyOTP}/>
                    </Drawer.Navigator>
                )}
            </NavigationContainer>
        </MyContext.Provider>
    );
}