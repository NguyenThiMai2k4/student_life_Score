import {
    FlatList,
    Modal,
    ScrollView,
    Platform,
    Pressable,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
    Image,
    ActivityIndicator
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import MyStyle from "../../styles/MyStyle";
import React, {useContext, useEffect, useState} from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import API, {authApi, endpoints} from "../../configs/API";
import APIs from "../../configs/API";
import MyContext from "../../configs/MyContext";
import styles from "./styles";
import addDetailActivity from "./AddDetailActivity";

const AddExtractActivity = ({route, navigation}) => {
    const [user, dispatch] = useContext(MyContext)
    const accessToken = user?.token;
    const [loading, setLoading] = useState(false);
    const [datePickerConfig, setDatePickerConfig] = useState({
        isVisible: false,
        currentField: null // 'start' or 'end'
    });
    const [formData, setFormData] = useState({
        name: '',
        startDate: null,
        endDate: null,
        discription: '',
        criteria: null,
    });
    const [criteria, setCriteria] = React.useState([]);
    // Dropdown state
    const [openCriteria, setOpenCriteria] = useState(false);
    const [criteriaValue, setCriteriaValue] = useState(null);
    const [activityCurrentId, setActivityCurrentId] = React.useState("")
    const loadCriteria = async () => {
        let res = await APIs.get(endpoints['criteria']);
        const formattedCriteria = res.data.results.map(item => ({
            label: `Điều ${item.name}`,
            value: item.name,
            semester: item.semester
            // Assuming the API returns an item with a 'name' property
            // Assuming the API returns an item with a 'code' property
        }));
        setCriteria(formattedCriteria);
        console.info("Dieu:" + JSON.stringify(criteria));
        console.info("res:" + JSON.stringify(res.data.results));
    }
    useEffect(() => {
        loadCriteria();
    }, []);

    const validateForm = () => {
        if (!formData.name || !formData.endDate || !formData.startDate || !formData.discription || !formData.criteria) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
            return false;
        }
        return true;
    }
    const formatDateForAPI = (date) => {
        if (!date) return '';
        const dateObj = new Date(date);
        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    };

    const goToAddDetailActivity = (activityCurrentId) => {

    }
    const createExtractActivity = async () => {
        if (!validateForm())
            return;

        let form = new FormData();
        form.append('name', formData.name);
        form.append('start_date', formatDateForAPI(formData.startDate));
        form.append('end_date', formatDateForAPI(formData.endDate));
        form.append('description', formData.discription);
        form.append('criteria', formData.criteria);
        console.info(form)
        try {
            setLoading(true);
            let res = await authApi(accessToken).post(endpoints['create_extract_activity'](formData.criteria),
                form, {
                    headers: {
                        "Content-Type": 'multipart/form-data',
                        // "Authorization": `bearer ${accessToken}`

                    }
                });

            console.info(res.data.id);
            Alert.alert("Thành công", "Đăng ký thành công!");
            navigation.navigate("AddDetailActivity", {
                activityId: res.data.id, // Pass the ID
                activityData: {
                    name: formData.name,
                    criteria: formData.criteria,
                    description: formData.discription,
                    startDate: formatDate(formData.startDate),
                    endDate: formatDate(formData.endDate)
                }
            });



        } catch (ex) {
            // Xử lý các trường hợp lỗi
            console.error("Lỗi khi gửi API:", ex);
            console.info("API URL:", formData.criteria);
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

    const formatDate = (date) => {
        if (!date) return '';
        let dateObj = new Date(date);
        let year = dateObj.getFullYear();
        let month = String(dateObj.getMonth() + 1).padStart(2, '0');
        let day = String(dateObj.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
    };
    const showDatePicker = (fieldType) => {
        setDatePickerConfig({
            isVisible: true,
            currentField: fieldType
        });
    };
    const hideDatePicker = () => {
        setDatePickerConfig({
            isVisible: false,
            currentField: null
        });
    };
    const handleDateConfirm = (selectedDate) => {
        if (datePickerConfig.currentField) {
            setFormData(prev => ({
                ...prev,
                [datePickerConfig.currentField === 'start' ? 'startDate' : 'endDate']: selectedDate
            }));
        }
        hideDatePicker();
    };

    // Validate dates when either is changed
    useEffect(() => {
        if (formData.startDate && formData.endDate && formData.endDate < formData.startDate) {
            Alert.alert(
                "Lỗi",
                "Ngày kết thúc phải sau ngày bắt đầu",
                [{text: "OK"}]
            );
            setFormData(prev => ({
                ...prev,
                endDate: prev.startDate
            }));
        }
    }, [formData.startDate, formData.endDate]);

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={MyStyle.content}>
                    <View style={MyStyle.header}>
                        <Text style={MyStyle.title}>THÊM HOẠT ĐỘNG NGOẠI KHÓA</Text>
                    </View>

                    <View style={MyStyle.form}>
                        {/* Name Input */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={styles.labelForm}>Tên hoạt động:</Text>
                            <TextInput
                                style={MyStyle.input}
                                placeholder="Nhập tên hoạt động..."
                                value={formData.name}
                                onChangeText={(text) => setFormData(prev => ({...prev, name: text}))}
                            />
                        </View>

                        {/* Start Date */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={styles.labelForm}>Ngày bắt đầu:</Text>
                            <TouchableOpacity
                                onPress={() => showDatePicker('start')}
                                activeOpacity={1}
                            >
                                <TextInput
                                    style={[
                                        MyStyle.input,
                                        {color: formData.startDate ? 'black' : 'gray'}
                                    ]}
                                    placeholder="dd/MM/yyyy"
                                    value={formData.startDate ? formatDate(formData.startDate) : 'dd/MM/yyyy'}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* End Date */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={styles.labelForm}>Ngày kết thúc:</Text>
                            <TouchableOpacity
                                onPress={() => showDatePicker('end')}
                                activeOpacity={1}
                            >
                                <TextInput
                                    style={[
                                        MyStyle.input,
                                        {color: formData.endDate ? 'black' : 'gray'}
                                    ]}
                                    placeholder="dd/MM/yyyy"
                                    value={formData.endDate ? formatDate(formData.endDate) : 'dd/MM/yyyy'}
                                    editable={false}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Shared DatePicker Modal */}
                        <DateTimePickerModal
                            isVisible={datePickerConfig.isVisible}
                            mode="date"
                            onConfirm={handleDateConfirm}
                            onCancel={hideDatePicker}
                            date={datePickerConfig.currentField === 'start' ?
                                (formData.startDate || new Date()) :
                                (formData.endDate || new Date())}
                            maximumDate={new Date(2026, 1, 1)}
                            minimumDate={new Date(1950, 0, 1)}
                        />

                        {/* Description Input */}
                        <View style={MyStyle.inputContainer}>
                            <Text style={styles.labelForm}>Chi tiết hoạt động:</Text>
                            <TextInput
                                style={MyStyle.input}
                                autoCapitalize="none"
                                value={formData.discription}
                                onChangeText={(text) => setFormData(prev => ({...prev, discription: text}))}
                            />
                        </View>

                        {/* Criteria Dropdown */}
                        <View style={[MyStyle.inputContainer, {zIndex: 1000}]}>
                            <Text style={styles.labelForm}>Loại hoạt động:</Text>
                            <DropDownPicker
                                open={openCriteria}
                                value={criteriaValue}
                                items={criteria}
                                setOpen={setOpenCriteria}
                                setValue={setCriteriaValue}
                                placeholder="Chọn loại hoạt động"
                                placeholderStyle={{color: 'gray'}}
                                style={[
                                    MyStyle.input,
                                ]}
                                dropDownContainerStyle={{
                                    borderColor: '#dfdfdf',
                                    borderWidth: 1,
                                }}
                                onSelectItem={(item) => {
                                    console.info("select item:", item.value)
                                    setFormData(prev => ({...prev, criteria: item.value}));
                                }}
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            style={MyStyle.Button}
                            onPress={createExtractActivity}
                            disabled={loading}
                        >
                            <Text style={MyStyle.ButtonText}>
                                {loading ? "Đang gửi..." : "xác nhận"}
                            </Text>
                        </TouchableOpacity>


                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default AddExtractActivity;