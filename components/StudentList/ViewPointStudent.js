import React, { useState, useContext, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity,ScrollView, ActivityIndicator } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import MyContext from "../../configs/MyContext";
import APIs, {authApi, endpoints } from "../../configs/API";
import { useNavigation } from "@react-navigation/native";
import ViewPointStyles from "./ViewPointStudentStyle";
import { Card } from 'react-native-paper'; 

const ViewPointStudent = ({route}) => {
    const [user] = useContext(MyContext);
    const accessToken = user?.token;
    const studentId = route.params?.studentId;
    const [listPoint, setListPoint] = useState([]);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);

    const loadListPoint = async () => {
        try {
            setLoading(true);
            const res = await authApi(accessToken).get(endpoints["list_point"](studentId));
            setListPoint(res.data.activities);
            setInfo(res.data);
            console.log(res.data);
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
        // Sử dụng criteria.name để nhóm
        const criteria = item?.detail_extract_activity?.extract_activity?.criteria?.name || "Chưa xác định";
        if (!groups[criteria]) groups[criteria] = [];
        groups[criteria].push(item);
        return groups;
    }, {}) : {};

    return (
        <View style={ViewPointStyles.container}>
            <Text style={ViewPointStyles.header}>📊 Thành tích sinh viên </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <ScrollView>
                    {info && (
                        <Card style={ViewPointStyles.card}>
                            <Card.Content>
                                <Text style={ViewPointStyles.studentName}>{info.student_name}</Text>
                                <Text style={ViewPointStyles.totalPoints}>⭐ Tổng điểm rèn luyện: {info.total_points}</Text>
                                <Text style={ViewPointStyles.classification}>🏆 Xếp loại: {info.classification}</Text>
                            </Card.Content>
                        </Card>
                    )}
                    {Object.keys(groupedActivities).length > 0 ? (
                        Object.keys(groupedActivities).map((criteria, index) => (
                            <View key={index} style={ViewPointStyles.criteriaContainer}>
                                <Text style={ViewPointStyles.criteriaTitle}>📌 Điều {criteria}  Điểm tối đa: {groupedActivities[criteria][0]?.detail_extract_activity?.extract_activity?.criteria?.max_point || 'Chưa xác định'}</Text> 
                                {groupedActivities[criteria].map((item, idx) => (
                                    <Card key={idx} style={ViewPointStyles.activityCard}>
                                        <Card.Content>
                                            <Text style={ViewPointStyles.activityTitle}>📝 {item?.detail_extract_activity?.extract_activity?.name}</Text>
                                            <Text style={ViewPointStyles.detailText}>🔹 {item?.detail_extract_activity?.name}</Text>
                                            <Text style={ViewPointStyles.pointText}>🎯 Điểm: {item?.detail_extract_activity?.point}</Text>
                                        </Card.Content>
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

export default ViewPointStudent;