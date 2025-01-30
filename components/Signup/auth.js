import React, {useRef, useState} from "react";
import {TextInput, TouchableOpacity, Text, View, Alert} from "react-native";
import MyStyle from "../../styles/MyStyle";
import firebase from "firebase/compat/app";
import {FirebaseRecaptchaVerifierModal} from "expo-firebase-recaptcha";
import {firebaseConfig} from "../../firebaseConfig";

const VerifyOTP = ({route}) => {
    const {userData} = route.params; // Lấy dữ liệu từ navigation
    const email = userData.email; // Lấy email từ formData

    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const sendOTP = async () => {
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            setVerificationId(true);
            console.log("CODE:"+verificationId);
            Alert.alert("Thành công", "Mã OTP đã được gửi đến email của bạn");
        } catch (error) {
            Alert.alert("Lỗi", error.message);
        }
    };

    const confirmOTP = async () => {
        try {
            await firebase.auth().confirmPasswordReset(verificationId, otp);
            Alert.alert("Thành công", "Email đã được xác thực");
            // Thực hiện các hành động tiếp theo sau khi xác thực
        } catch (error) {
            Alert.alert("Lỗi", "Mã OTP không chính xác");
        }
    };

    return (
        <View style={MyStyle.container}>
            <View style={MyStyle.content}>
                <View style={MyStyle.header}>
                    <Text style={MyStyle.title}>Xác thực Email</Text>
                    <Text style={MyStyle.subtitle}>Vui lòng mở Email để nhập OTP xác thực</Text>
                    <Text style={MyStyle.subtitle}>{email}</Text>
                </View>
                <View style={MyStyle.inputContainer}>
                    <TextInput
                        style={MyStyle.input}
                        placeholder={"Nhập mã OTP"}
                        keyboardType={"numeric"}
                        onChangeText={setOtp}
                    />
                    <TouchableOpacity
                        style={MyStyle.Button}
                        onPress={verificationId ? confirmOTP : sendOTP}>
                        <Text style={MyStyle.ButtonText}>
                            {verificationId ? "Xác nhận" : "Gửi mã"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
                title="Xác thực email"
                cancelLabel="Hủy"
            />
        </View>
    );
};

export default VerifyOTP;