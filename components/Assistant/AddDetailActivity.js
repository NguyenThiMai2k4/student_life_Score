import {
    ImageBackground,
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
    ActivityIndicator, Button
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import MyStyle from "../../styles/MyStyle";
import React, {useContext, useEffect, useState} from "react";
import {Card} from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import API, {authApi, endpoints} from "../../configs/API";
import APIs from "../../configs/API";
import MyContext from "../../configs/MyContext";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";


const AddDetailActivity = ({route, navigation}) => {
    const activityId = route.params?.activityId;
    const activityData = route.params?.activityData;
    const [user, dispatch] = useContext(MyContext)
    const accessToken = user?.token;
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [detailActivities, setDetailActivities] = useState([]);
    const [newDetail, setNewDetail] = useState({
        title: '',
        description: ''
    });

    const submitAllDetails = async () => {
        if (detailActivities.length === 0) {
            Alert.alert("Thông báo", "Vui lòng thêm ít nhất một chi tiết hoạt động");
            return;
        }

        setLoading(true);
        try {
            // Create an array to store all promises
            const postPromises = detailActivities.map(async (detail) => {
                const form = new FormData();
                form.append('name', detail.title);
                form.append('point', detail.description); // Assuming description contains the score

                return authApi(accessToken).post(endpoints['detail_activity_create'](activityId),
                    form,
                    {
                        headers: {
                            "Content-Type": 'multipart/form-data',
                        }
                    }
                );
            });

            // Wait for all posts to complete
            await Promise.all(postPromises);

            Alert.alert(
                "Thành công",
                "Đã thêm tất cả chi tiết hoạt động thành công!",
                [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate("HomeScreen")
                    }
                ]
            );

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
    const handleSave = () => {
        if (newDetail.title && newDetail.description) {
            setDetailActivities([...detailActivities, newDetail]);
            setNewDetail({title: '', description: ''});
            setModalVisible(false);
        } else {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
        }
    };
    const handleDelete = (indexToDelete) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa chi tiết hoạt động này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: () => {
                        const updatedActivities = detailActivities.filter((_, index) => index !== indexToDelete);
                        setDetailActivities(updatedActivities);
                    },
                    style: "destructive"
                }
            ]
        );
    };
    return (
        <ScrollView style={styles.container}>
            <ImageBackground
                style={[styles.headerImg]}
                source={require('../../assets/extractActivity.png')}
            />
           
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.description}>Tên hoạt động: {activityData?.name}</Text>
                    <Text style={styles.detail}>{activityData?.criteria_name}</Text>
                    <Text style={styles.detail}>Mô tả: {activityData?.description} </Text>
                    <Text style={styles.detail}>Ngày bắt đầu: {activityData?.startDate}</Text>
                    <Text style={styles.detail}>Ngày kết thúc: {activityData?.endDate}</Text>
                </Card.Content>
            </Card>
          

            <Text style={styles.sectionTitle}>Thêm chi tiết hoạt động:</Text>

            {detailActivities.map((detail, index) => (
                <Card key={index} style={styles.card}>
                    <Card.Content>
                        <View style={styles.cardHeader}>
                            <View style={styles.cardContent}>
                                <Text style={styles.description}>Tên: {detail.title}</Text>
                                <Text style={styles.description}>Điểm: {detail.description}</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => handleDelete(index)}
                                style={MyStyle.iconDelete}
                            >
                                <AntDesign name="delete" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    </Card.Content>
                </Card>
            ))}

 
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Card style={styles.addCard}>
                    <Card.Content style={styles.addCardContent}>
                        <AntDesign name='plus' size={24} color="#666"/>
                    </Card.Content>
                </Card>
            </TouchableOpacity>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Thêm chi tiết hoạt động</Text>
                        <Text style={MyStyle.label}>Tên:</Text>
                        <TextInput
                            style={styles.input}
                            value={newDetail.title}
                            onChangeText={(text) => setNewDetail({...newDetail, title: text})}
                        />
                        <Text style={MyStyle.label}>Điểm cộng:</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType={"numeric"}
                            maxLength={2}
                            value={newDetail.description}
                            onChangeText={(text) => setNewDetail({...newDetail, description: text})}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, styles.saveButton]}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

             <TouchableOpacity
                style={[MyStyle.Button]}
                onPress={submitAllDetails}
                disabled={loading}
            >
                <Text style={MyStyle.ButtonText}>
                    {loading ? "Đang xử lý..." : "Xác nhận thêm"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );

};

export default AddDetailActivity;