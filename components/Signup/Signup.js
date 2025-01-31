import {
    ScrollView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image, ActivityIndicator
} from "react-native";
import MyStyle from "../../styles/MyStyle";
import Style from "./Style";
import React, {useEffect, useState} from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import VerifyOTP from "./auth";
import API, {endpoints} from "../../configs/API";

const SignupScreen = ({route, navigation}) => {

    const [showPassword, setShowPassword] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        // password: '',
        confirmPassword: '',
        email: '',
        avatar: '',
        // name: '',
        // date: new Date(),

    });
    const [image, setImage] = useState(null);

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };
    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    };
    const onChange = (selectedDate) => {
        const currentDate = selectedDate;
        // setFormData(prev => ({...prev, date: currentDate}));
        setDateOfBirth(formatDate(currentDate));
        setShowPicker(false);
    };


    const validateForm = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.avatar) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp");
            return false;
        }
        return true;
    }
    const register = async () => {
        if (!validateForm())
            return;

        let form = new FormData();

        for (let key in formData) {
            if (key === 'avatar') {
                const {uri, fileName, mimeType} = formData[key];

                if (uri) {
                    // gói thành 1 cái prop file.
                    form.append('avatar', {
                        uri: formData.avatar.uri,
                        name: fileName || 'avatar.jpg',
                        type: mimeType || 'image/jpeg',
                    });
                    console.log("FormData trước khi gửi:", Array.from(form.entries()));
                }
            } else {
                form.append(key, formData[key]);
            }
        }

        console.info("form: " + form);

        console.info("formData" + formData);

        try {
            setLoading(true);
            let res = await API.post(endpoints['register'],
                form, {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        timeout: 5000,
                    }
                });
            console.info(res.data);
            if (res.data.success) {
                Alert.alert("Thành công", "Đăng ký thành công!");
                navigation.navigate("LoginScreen");
            }

        } catch (ex) {
            // Xử lý các trường hợp lỗi
            console.error("Lỗi khi gửi API:", ex);

            if (ex.response) {
                console.error('Error Response:', ex.response.data);
                Alert.alert("Lỗi", ex.response.data.error || "Lỗi server.");
            } else if (ex.request) {
                console.error('Error Request:', ex.request);
                Alert.alert("Lỗi", "Không thể kết nối tới server.");
            } else {
                console.error('Error Message:', ex.message);
                Alert.alert("Lỗi", ex.message || "Đã xảy ra lỗi không xác định.");
            }
        } finally {
            setLoading(false); // Stop loading
        }
    }


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const pickImage = async () => {

        let {status} =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            let result =
                await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setFormData(prev => ({...prev, avatar: result.assets[0]}));
                console.log("image uri " + formData.avatar.uri);
                console.log("URI " + formData.avatar);

            } else {
                Alert.alert("you did not select any image")
            }
        }
    }

    return (
        <ScrollView>
            <SafeAreaView style={MyStyle.container}>
                <View style={MyStyle.content}>
                    <View style={MyStyle.header}>
                        <Text style={MyStyle.title}>ĐĂNG KÝ</Text>
                        {/*avatar*/}
                        <View style={MyStyle.imageContainer}>
                            {formData.avatar &&
                                <Image source={{uri: formData.avatar.uri}} style={MyStyle.image} resizeMode="cover"/>}
                            <TouchableOpacity style={MyStyle.editButton} onPress={pickImage}>
                                <AntDesign
                                    name={'camera'}
                                    size={30}
                                    color={'#4557F8'}
                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={MyStyle.form}>
                        {/* Name Input */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={MyStyle.label}>Họ và Tên</Text>
                            <TextInput
                                style={MyStyle.input}
                                placeholder="Nhập họ và tên"
                                value={formData.name}
                                // onChangeText={(text) => setFormData(prev => ({...prev, name: text}))}
                            />
                        </View>

                        {/* Date of Birth */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={MyStyle.label}>Ngày sinh</Text>
                            {showPicker && (
                                <DateTimePickerModal
                                    isVisible={showPicker}
                                    mode="date"
                                    onConfirm={onChange}
                                    onCancel={() => setShowPicker(false)}
                                    date={formData.date}
                                    maximumDate={new Date(2025, 0, 1)}
                                    minimumDate={new Date(1950, 0, 1)}
                                />
                            )}
                            <TouchableOpacity onPress={toggleDatePicker}
                                              activeOpacity={1}>
                                <TextInput
                                    style={[MyStyle.input, {color: dateOfBirth ? 'black' : 'gray'}]}
                                    placeholder="dd/MM/yyyy"
                                    value={dateOfBirth}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Email Input */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={MyStyle.label}>Email</Text>
                            <TextInput
                                style={MyStyle.input}
                                placeholder="example@gmail.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={formData.email}
                                onChangeText={(text) => setFormData(prev => ({...prev, email: text}))}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={MyStyle.label}>Mật khẩu</Text>
                            <View style={MyStyle.passwordContainer}>
                                <TextInput
                                    style={[MyStyle.input, {flex: 1}]}
                                    placeholder="Nhập mật khẩu"
                                    secureTextEntry={!showPassword}
                                    value={formData.password}
                                    onChangeText={(text) => setFormData(prev => ({...prev, password: text}))}
                                />
                                <TouchableOpacity onPress={togglePasswordVisibility}>
                                    <AntDesign
                                        name={showPassword ? 'eye' : 'eyeo'}
                                        size={24}
                                        color="#A0AEC0"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={MyStyle.label}>Xác nhận mật khẩu</Text>
                            <View style={MyStyle.passwordContainer}>
                                <TextInput
                                    style={[MyStyle.input, {flex: 1}]}
                                    secureTextEntry={!showPassword}
                                    value={formData.confirmPassword}
                                    onChangeText={(text) => setFormData(prev => ({...prev, confirmPassword: text}))}
                                />
                            </View>
                        </View>

                        {/* Signup Button */}
                        <TouchableOpacity
                            style={MyStyle.Button}
                            onPress={register}
                            disabled={loading}
                        >

                            <Text style={MyStyle.ButtonText}>Đăng Ký</Text>

                        </TouchableOpacity>
                        {loading && (
                                <ActivityIndicator size="small" color="#FFF"/>
                            )}
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>

    );
};


export default SignupScreen;