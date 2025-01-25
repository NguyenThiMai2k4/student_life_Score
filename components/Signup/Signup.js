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
    Image
} from "react-native";
import MyStyle from "../../styles/MyStyle";
import Style from "./Style";
import React, {useState} from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';
import VerifyOTP from "./auth";

const SignupScreen = ({route, navigation}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        avatar: null,
        name: '',
        date: new Date(),
        gender: '',
        faculty: '',
        major: '',
        class: '',
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
        setFormData(prev => ({...prev, date: currentDate}));
        setDateOfBirth(formatDate(currentDate));
        setShowPicker(false);
    };

    const onConfirm = () => {
        const currentDate = date;
        setFormData(prev => ({...prev, date: currentDate}));
        setDateOfBirth(formatDate(currentDate));
        // toggleDatePicker();
    };
    const handleSignup = () => {
        // Validate form data
        const {name, email, password, confirmPassword, date} = formData;

        // Basic validation
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu không khớp");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Lỗi", "Địa chỉ email không hợp lệ");
            return;
        }

        // TODO: Implement actual signup logic (e.g., API call)
        console.log("Signup data:", formData);
        Alert.alert("Thành công", "Đăng ký tài khoản thành công");
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Hoặc All nếu muốn chọn cả ảnh và video
            allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
            // setImage(result.assets[0].uri);
            setFormData(prev => ({...prev, avatar: result.assets[0].uri}));
        }else{
            alert("you đi not select any image")
        }
    };
    const goToVerifyOTP = (formData) => {

          navigation.navigate("VerifyOTP", { userData: formData });
    };

    return (
        <ScrollView>
            <SafeAreaView style={MyStyle.container}>
                <View style={MyStyle.content}>
                    <View style={MyStyle.header}>
                        <Text style={MyStyle.title}>ĐĂNG KÝ</Text>
                        {/*avatar*/}
                        <View style={MyStyle.imageContainer}>
                            {formData.avatar &&
                                    <Image source={{ uri: formData.avatar }} style={MyStyle.image} resizeMode="cover"/>}
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
                                onChangeText={(text) => setFormData(prev => ({...prev, name: text}))}
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
                            onPress={()=> goToVerifyOTP(formData)}
                        >
                            <Text style={MyStyle.ButtonText}>Đăng Ký</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>

    );
};


export default SignupScreen;