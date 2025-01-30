import React, {useContext, useState} from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Pressable,
    Alert,
    ActivityIndicator
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Style from "./Style.js";
import MyContext from "../../configs/MyContext";
import API, {authApi, endpoints} from "../../configs/API";


const LoginScreen = ({navigation}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rememberMe: false,
    });
    const [user, dispatch] = useContext(MyContext)
    const [loading, setLoading] = useState(false);
    const login = async () => {
        try {
            setLoading(true);
            let res = await API.post(endpoints['login'], {
                "username": formData.username,
                "password": formData.password,
                "client_id": "IEY1ol3eB2ehrUoypxO7kRhnDKRuwo8oKrAevCBB",
                "client_secret": "wTlFggjHmplFbFPf9I78Zbqj3bZn7OhvkdATaMs7pnbiYeicvzlM1LDwsXRnzbxa8Ml3wzNa5wuqDuldyCF1ZOcZtpq3nD8TMQok7MUC1uMyE4QLEpOsFh0ZoXowMqHL",
                "grant_type": "password",

            });
            console.info("token" + res.data.access_token);
            console.info("username: " + formData.username);
            console.info("password: " + formData.password);

            let user = await authApi(res.data.access_token).get(endpoints['current-user'])
            dispatch({
                "type": "login",
                "payload": user.data,
            });
            console.info("id user:"+user.data.id);

            if (res.data.success) {
                 navigation.navigate("HomeScreen");
                Alert.alert("Đăng nhập thành công")
            }
            if(res.data.response)
                Alert.alert("Đăng nhập thất bại")
        } catch (ex) {
            console.error("Lỗi:", ex)
        } finally {
            setLoading(false)
        }

        // if (formData.username === 'admin' && formData.password === '123') {
        //     dispatch({
        //         "type": "login",
        //         "payload": {
        //             "username": "admin",
        //         }
        //     });
        //     navigation.navigate("HomeScreen");
        // }
    };
    const googleIcon = require('../../assets/glogo.png');
    const goToSignup = () => {
        navigation.navigate('SignupScreen');
    };


    return (
        <SafeAreaView style={Style.container}>
            <View style={Style.content}>
                {/* Header */}
                <View style={Style.header}>
                    <Text style={Style.title}>Log In</Text>
                    <Text style={Style.subtitle}>
                        Please sign in to your existing account
                    </Text>
                </View>

                {/* Form Section */}
                <View style={Style.form}>
                    {/* Email Input */}
                    <View style={Style.inputContainer}>
                        <Text style={Style.label}>Username</Text>
                        <TextInput
                            style={Style.input}
                            placeholder="example@gmail.com"
                            value={formData.username}
                            onChangeText={(text) => setFormData(prev => ({...prev, username: text}))}
                        />
                    </View>

                    {/* Password Input */}
                    <View style={Style.inputContainer}>
                        <Text style={Style.label}>Password</Text>
                        <View style={Style.passwordContainer}>
                            <TextInput
                                style={[{borderColor: 'white'}, {flex: 1}]}
                                secureTextEntry={!showPassword}
                                value={formData.password}
                                onChangeText={(text) => setFormData(prev => ({...prev, password: text}))}
                            />
                            <TouchableOpacity
                                style={Style.eyeIcon}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <AntDesign
                                    name={showPassword ? 'eyeo' : 'eye'}
                                    size={24}
                                    color="#A0AEC0"
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    {/* Remember Me & Forgot Password */}
                    <View style={Style.rememberContainer}>
                        <Pressable
                            style={Style.checkboxContainer}
                            onPress={() => setFormData(prev => ({
                                ...prev,
                                rememberMe: !prev.rememberMe
                            }))}
                        >
                            <View style={[
                                Style.checkbox,
                                formData.rememberMe && Style.checkboxChecked
                            ]}>
                                {formData.rememberMe && (
                                    <AntDesign name="check" size={16} color="white"/>
                                )}
                            </View>
                            <Text style={Style.rememberText}>Remember me</Text>
                        </Pressable>

                        <TouchableOpacity>
                            <Text style={Style.forgotPassword}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Login Button */}
                    <TouchableOpacity style={Style.loginButton}
                                      onPress={login}>
                        <Text style={Style.loginButtonText}>LOG IN</Text>
                        {loading && (
                            <ActivityIndicator size="small" color="#FFF"/>
                        )}
                    </TouchableOpacity>

                    {/* Sign Up Section */}
                    <View style={Style.signUpContainer}>
                        <Text style={Style.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={goToSignup}>
                            <Text style={Style.signUpLink}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Or Divider */}
                    <View style={Style.dividerContainer}>
                        <Text style={Style.dividerText}>Or</Text>
                    </View>

                    {/* Social Buttons */}
                    {/*<View style={Style.socialContainer}>*/}
                    <TouchableOpacity style={Style.socialContainer} onPress={login}>
                        <Image
                            source={googleIcon}
                            style={Style.icon}
                        />
                        <Text>Sign in with Google</Text>
                    </TouchableOpacity>
                    {/*</View>*/}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;