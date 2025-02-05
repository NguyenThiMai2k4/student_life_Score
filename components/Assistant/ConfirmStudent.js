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
import React, { useContext, useEffect, useState } from "react";
import { Card, Searchbar } from "react-native-paper"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import API, { authApi, endpoints } from "../../configs/API";
import APIs from "../../configs/API";
import MyContext from "../../configs/MyContext";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import confirmStyles from "./confirmStyles";
import MissingListStyle from "../MissingList/MissingListStyle";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const ConfirmStudent = ({ route, navigation }) => {
    const activityId = route.params?.activityId;
    const [activityData, setActivityData] = useState({});
    const [listDetail, setListDetail] = React.useState([]);
    const [roleChoose, setRoleChoose] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [user, dispatch] = useContext(MyContext);
    const accessToken = user?.token;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [studentsData, setStudentsData] = useState([]);

    const loadDetail = async (id) => {
        try {
            setLoading(true);
            const res = await authApi(accessToken).get(endpoints["get_register_detail_activity"](id));
            setListDetail(res.data);

        } catch (error) {
            console.error("Lỗi khi load detail:", error);
            setError("Không thể tải chi tiết hoạt động");
            Alert.alert("Lỗi", "Không thể tải chi tiết hoạt động");
        } finally {
            setLoading(false);
        }
    };
    const loadActivity = async () => {
        try {
            setLoading(true);
            const res = await authApi(accessToken).get(endpoints["activity_delete"](activityId));

            // Lưu thông tin activity
            setActivityData(res.data);

            // Nếu load activity thành công, load detail
            if (res.data?.id) {
                await loadDetail(res.data.id);
            }

        } catch (error) {
            console.error("Lỗi khi load activity:", error);
            setError("Không thể tải hoạt động");
            Alert.alert("Lỗi", "Không thể tải hoạt động");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (activityId) {
            loadActivity();
        }
    }, [activityId]);
    const handleStatusChange = (itemId) => {
        setListDetail(prevList =>
            prevList.map(item => 
                item.id === itemId ? {...item, status: 'CONFIRMED'} : item
            )
        );
    };
    
    const cancelStatusChange = (itemId) => {
        setListDetail(prevList =>
            prevList.map(item => 
                item.id === itemId ? {...item, status: 'CANCELED'} : item
            )
        );
    };
    
    const updateStatus = async () => {
        try {
            const promises = listDetail.map(async (item) => {
                if (item.status === "CONFIRMED") {
                    await authApi(accessToken).post(endpoints["confirm_register_detail_activity"](item.id));
                } else if (item.status === "CANCELED") {
                    await authApi(accessToken).post(endpoints["cancel_register_detail_activity"](item.id));
                }
            });
    
            await Promise.all(promises);
            console.log("Cập nhật trạng thái thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            Alert.alert("Lỗi", "Không thể cập nhật trạng thái.");
        }
    };
    
    const exportToCSV = async () => {
        try {
            setLoading(true);
    
            // Gọi API cập nhật trạng thái trước khi xuất CSV
            await updateStatus();
    
            const headers = "Student ID,Evidence,Status\n";
            const csvContent = listDetail.reduce((acc, item) => {
                return acc + `${item.student},"${item.evidence}",${item.status}\n`;
            }, headers);
    
            const fileName = `activity_${activityId}_${new Date().getTime()}.csv`;
            const filePath = `${FileSystem.documentDirectory}${fileName}`;
    
            await FileSystem.writeAsStringAsync(filePath, csvContent, {
                encoding: FileSystem.EncodingType.UTF8
            });
    
            if (Platform.OS === 'android' || Platform.OS === 'ios') {
                const canShare = await Sharing.isAvailableAsync();
                if (canShare) {
                    await Sharing.shareAsync(filePath);
                } else {
                    Alert.alert("Lỗi", "Không thể chia sẻ file trên thiết bị này.");
                }
            }
    
            Alert.alert("Thành công", "File CSV đã được tạo và trạng thái đã được cập nhật.");
        } catch (error) {
            console.error("Lỗi khi xuất CSV:", error);
            Alert.alert("Lỗi", "Không thể xuất file CSV.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={MissingListStyle.container}>
                {activityData?.id && (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={confirmStyles.title}>
                                {activityData.name}
                            </Text>
                        </Card.Content>
                    </Card>
                )}
                {loading && <ActivityIndicator size="large" color="#2973B2" />}
                <FlatList
                    data={listDetail}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card style={MissingListStyle.card}>
                            <Card.Content>
                                <Text style={MissingListStyle.statusText}>
                                    {item.status || "Chưa cập nhật"}
                                </Text>
                                <Text style={MissingListStyle.studentName}>{`ID sinh viên: ${item.student}`}</Text>
                                <Text
                                    style={MissingListStyle.title}>{`Hoạt động: ${item.detail_extract_activity.extract_activity.name}`}</Text>
                                <Text
                                    style={MissingListStyle.activityDetail}>{`Hình thức: ${item.detail_extract_activity.name}`}</Text>
                                <Text style={MissingListStyle.evidence}>{`Minh chứng: ${item.evidence}`}</Text>
                            </Card.Content>
                            <Card.Actions>
                                {item.status === 'PENDING' && (
                                    <>
                                        <TouchableOpacity
                                            style={MissingListStyle.confirmButton}
                                            onPress={() => handleStatusChange(item.id)}
                                        >
                                            <Text style={MissingListStyle.confirmButtonText}>Xác nhận</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={MissingListStyle.rejectButton}
                                            onPress={() => cancelStatusChange(item.id)}
                                        >
                                            <Text style={MissingListStyle.rejectButtonText}>Từ chối</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                                {item.status === 'CONFIRMED' && (
                                    <Text style={MissingListStyle.detailButtonText}>Đã xác nhận</Text>
                                )}

                                {item.status === 'CANCELED' && (
                                    <Text style={MissingListStyle.detailButtonText}>Đã từ chối</Text>
                                )}
                            </Card.Actions>

                        </Card>

                    )}
                />
                <TouchableOpacity style={MissingListStyle.confirmButton} onPress={exportToCSV}
                >
                    <Text style={MissingListStyle.confirmButtonText}>Xuất dạng CSV</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};


export default ConfirmStudent