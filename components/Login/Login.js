import React, { useState } from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Style from "./Style.js";



const LoginScreen = ({navigation}) => {
      const [showPassword, setShowPassword] = useState(false);
      const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
      });
      const handleLogin = () => {
        console.log('Form submitted:', formData);
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
                    <Text style={Style.label}>Email</Text>
                    <TextInput
                      style={Style.input}
                      placeholder="example@gmail.com"
                      value={formData.email}
                      onChangeText={(text) => setFormData(prev => ({...prev, email: text}))}
                    />
                  </View>

                  {/* Password Input */}
                  <View style={Style.inputContainer}>
                    <Text style={Style.label}>Password</Text>
                    <View style={Style.passwordContainer}>
                      <TextInput
                        style={[{borderColor:'white'}, {flex: 1}]}
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
                          <AntDesign name="check" size={16} color="white" />
                        )}
                      </View>
                      <Text style={Style.rememberText}>Remember me</Text>
                    </Pressable>

                    <TouchableOpacity>
                      <Text style={Style.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Login Button */}
                  <TouchableOpacity style={Style.loginButton} onPress={handleLogin}>
                    <Text style={Style.loginButtonText}>LOG IN</Text>
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
                    <TouchableOpacity style={Style.socialContainer} onPress={handleLogin}>
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