import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./components/Login/Login";
import LoginScreen from "./components/Login/Login.js";
import SignupScreen from "./components/Signup/Signup";
import Home from './components/Home/Home.js';
import Style from "./components/Login/Style";
import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import VerifyOTP from "./components/Signup/auth";


const  Stack= createNativeStackNavigator()
export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              {/* <Stack.Screen name="LoginScreen" component={LoginScreen}/>
              <Stack.Screen name="SignupScreen" component={SignupScreen}/>
              <Stack.Screen name="VerifyOTP" component={VerifyOTP}/> */}
              <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>

      </NavigationContainer>

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
