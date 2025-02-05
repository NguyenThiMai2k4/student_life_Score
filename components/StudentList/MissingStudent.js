import React, { useState, useContext, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import MyContext from "../../configs/MyContext";
import APIs, { authApi, endpoints } from "../../configs/API";
import { useNavigation } from "@react-navigation/native";
import ViewPointStyles from "./ViewPointStudentStyle";
import { Card } from 'react-native-paper'; 

const MissingStudent = ({ route }) => {
    const [user] = useContext(MyContext);
    const accessToken = user?.token;
    const studentId = route.params?.studentId;
    const [listPoint, setListPoint] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadListPoint = async () => {
        try {
            setLoading(true);
            const res = await authApi(accessToken).get(endpoints["list_missing"](studentId));
            setListPoint(res.data);
        } catch (error) {
            Alert.alert("Lỗi", error.response?.data?.error || "Tải thất bại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadListPoint();
    }, []);

    const groupedActivities = Array.isArray(listPoint) ? listPoint.reduce((groups, item) => {
        const criteria = item?.detail_extract_activity?.extract_activity?.criteria?.name || "Chưa xác định";
        if (!groups[criteria]) groups[criteria] = [];
        groups[criteria].push(item);
        return groups;
    }, {}) : {};

    const handleAccept = (itemId) => {

        console.log(`Accepted: ${itemId}`);
    };

    const handleReject = (itemId) => {
        console.log(`Rejected: ${itemId}`);
    };
        const confirmMissing = async (itemId) => {
            try {
                const response = await authApi(accessToken).post(endpoints["confirm_register_detail_activity"](itemId));
                Alert.alert("Xác nhận thành công!");
                await loadListPoint();
            } catch (error) {
                if (error.response) {
                    const errorMessage = error.response?.data?.error || "Xác nhận thất bại.";
                    Alert.alert("Lỗi", errorMessage); 
                } else {
                    Alert.alert("Lỗi", "Không thể kết nối đến server.");
                }
            }
        }
        const cancelMissing = async (itemId) => {
            try {
                const response = await authApi(accessToken).post(endpoints["cancel_register_detail_activity"](itemId));
                Alert.alert("Từ chối thành công!");
                await loadListPoint();
            } catch (error) {
                if (error.response) {
                    const errorMessage = error.response?.data?.error || "Từ chối thất bại.";
                    Alert.alert("Lỗi", errorMessage); 
                } else {
                    Alert.alert("Lỗi", "Không thể kết nối đến server.");
                }
            }
        }

    return (
        <View style={ViewPointStyles.container}>
            <Text style={ViewPointStyles.header}>📊 Danh sách báo thiếu</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <ScrollView>
                    {Object.keys(groupedActivities).length > 0 ? (
                        Object.keys(groupedActivities).map((criteria, index) => (
                            <View key={index} style={ViewPointStyles.criteriaContainer}>
                                <Text style={ViewPointStyles.criteriaTitle}>📌 Điều {criteria}  Điểm tối đa: {groupedActivities[criteria][0]?.detail_extract_activity?.extract_activity?.criteria?.max_point || 'Chưa xác định'}</Text> 
                                {groupedActivities[criteria].map((item, idx) => (
                                    <Card key={idx} style={ViewPointStyles.activityCard}>
                                        <Card.Content>
                                            <Text style={ViewPointStyles.activityTitle}>📝 {item?.detail_extract_activity?.extract_activity?.name}</Text>
                                            <Text style={ViewPointStyles.detailText}>🔹 {item?.detail_extract_activity?.name}</Text>
                                            <Text style={ViewPointStyles.detailText}>🔹Minh chứng: {item.evidence}</Text>
                                            <Text style={ViewPointStyles.pointText}>🎯 Điểm: {item?.detail_extract_activity?.point}</Text>
                                        </Card.Content>
                                        <View style={ViewPointStyles.rightContainer}>
                                            <Text style={ViewPointStyles.statusText}>
                                                {item.status || "Chưa cập nhật"}
                                            </Text>
                                            <TouchableOpacity 
                                                style={[ViewPointStyles.reportButton, { backgroundColor: "#2973B2" }]} 
                                                onPress={() => confirmMissing(item.id)}
                                            >
                                                <Text style={ViewPointStyles.reportButtonText}>Xác nhận</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={[ViewPointStyles.reportButton, { backgroundColor: "#ff4444" }]} 
                                                onPress={() => cancelMissing(item.id)}
                                            >
                                                <Text style={ViewPointStyles.reportButtonText}>Từ chối</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                ))}
                            </View>
                        ))
                    ) : (
                        <Text style={ViewPointStyles.noDataText}>😔 Không có dữ liệu</Text>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

export default MissingStudent;
