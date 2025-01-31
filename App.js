import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Login from "./components/Login/Login";
import LoginScreen from "./components/Login/Login.js";
import SignupScreen from "./components/Signup/Signup"
import Style from "./components/Login/Style";
import React, {useReducer} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import VerifyOTP from "./components/Signup/auth";
import HomeScreen from "./components/Home/Home";
import DetailActivity from "./components/Home/DetailActivity"
import MyUserReducer from "./reducers/MyUserReducer";
import MyContext from "./configs/MyContext";
import logout from "./components/Login/logout";
import {ScreenStackItem} from "react-native-screens";

const Stack = createNativeStackNavigator()
export default function App() {
    const [user, dispatch] = useReducer(MyUserReducer, null);
    return (
        <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerRight: logout}}>
                    {user === null ? <>
                        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                    </> : <>
                        {/*<Stack.Screen name="Logout" component={logout} options={{headerShown:false}}/>*/}
                        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                            title: user?.email || 'Home',
                            headerStyle: {
                                backgroundColor: 'white',
                            },
                            headerTintColor: '#007aff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                        }}/>
                    </>
                    }
                    <Stack.Screen name="SignupScreen" component={SignupScreen}/>
                    <Stack.Screen name="VerifyOTP" component={VerifyOTP}/>
                    <Stack.Screen name="DetailActivity" component={DetailActivity}></Stack.Screen>

                </Stack.Navigator>

            </NavigationContainer>
        </MyContext.Provider>

    );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
