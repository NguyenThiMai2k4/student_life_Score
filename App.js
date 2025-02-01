import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginScreen from "./components/Login/Login.js";
import Logout from './components/Login/logout.js';
import SignupScreen from "./components/Signup/Signup";
import React, { useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import VerifyOTP from "./components/Signup/auth";
import HomeScreen from "./components/Home/Home";
import DetailActivity from "./components/Home/DetailActivity";
import MyUserReducer from "./reducers/MyUserReducer";
import MyContext from "./configs/MyContext";
import Feature from './components/Feature/Feature.js';
import ListRegister from './components/Student/ListRegister.js';
import ViewPoint from './components/Student/ViewPoint.js';
import Missing from './components/Student/Missing.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator cho màn hình chính
const HomeStack = ({ user }) => (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: user?.email || 'Home' }} />
        <Stack.Screen name="DetailActivity" component={DetailActivity} options={{ title: "Chi tiết hoạt động" }} />
        <Stack.Screen name="Missing" component={Missing} options={{title: "Báo thiếu hoạt động"}}/>
    </Stack.Navigator>
);
const Tool = () => (
    <Stack.Navigator>
        <Stack.Screen name="Feature"  component={Feature} />
        <Stack.Screen name="ListRegister" component={ListRegister}/>
        <Stack.Screen name="ViewPoint" component={ViewPoint} options={{title:"Xem điểm rèn luyện"}} />
        <Stack.Screen name="Missing" component={Missing} options={{title: "Báo thiếu hoạt động"}}/>
    </Stack.Navigator>
)

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
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="SignupScreen" component={SignupScreen} />
                    </Stack.Navigator>
                ) : (
                    <Drawer.Navigator>
                        {/* Truyền user vào HomeStack */}
                        <Drawer.Screen
                            name="HomeStack"
                            options={{ title: "Trang chủ" }}
                        >
                            {() => <HomeStack user={user} />}
                        </Drawer.Screen>
                        <Drawer.Screen name="Tool" component={Tool} options={{ title:"Chức năng" }}  />
                        <Drawer.Screen name="VerifyOTP" component={VerifyOTP} />
                        <Drawer.Screen name="Logout" component={Logout} />
                    </Drawer.Navigator>
                )}
            </NavigationContainer>
        </MyContext.Provider>
    );
}
