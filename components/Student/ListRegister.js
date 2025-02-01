// import React, { useState, useContext, useEffect } from "react";
// import { Alert, View, FlatList, Text } from 'react-native';
// import { DataTable } from "react-native-paper";
// import MyContext from "../../configs/MyContext";
// import { authApi, endpoints } from "../../configs/API";
// import styles from "./styles";

// const ListRegister = () => {
//     const [user] = useContext(MyContext);
//     const accessToken = user?.token;
//     const studentId = user?.student?.id;
//     const [loading, setLoading] = useState(true);
//     const [listRegister, setListRegister] = useState([]);
//     const [sortOrder, setSortOrder] = useState('asc'); 
//     const [sortedData, setSortedData] = useState([]);

//     const loadListRegister = async () => {
//         try {
//             setLoading(true);
//             const res = await authApi(accessToken).get(endpoints["list_register"](studentId));
//             setListRegister(res.data);
//             setSortedData(res.data); 
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//             const errorMessage = error.response?.data?.error || "Đăng ký thất bại.";
//             Alert.alert("Lỗi", errorMessage);
//         }
//     };

//     useEffect(() => {
//         loadListRegister();
//     }, []);

//     const handleSort = () => {
//         const order = sortOrder === 'asc' ? 'desc' : 'asc'; 
//         setSortOrder(order);

//         const sorted = [...listRegister].sort((a, b) => {
//             const pointA = a?.detail_extract_activity?.point || 0;
//             const pointB = b?.detail_extract_activity?.point || 0;
//             if (order === 'desc') {
//                 return pointA - pointB; 
//             } else {
//                 return pointB - pointA;
//             }
//         });
//         setSortedData(sorted);
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Các hoạt động đã đăng ký</Text>
//             <DataTable>
//                 <DataTable.Header>
//                     <DataTable.Title style={styles.sttColumn}>STT</DataTable.Title>
//                     <DataTable.Title style={styles.activityColumn}>Tên hoạt động</DataTable.Title>
//                     <DataTable.Title style={styles.detailColumn}>Chi tiết</DataTable.Title>
//                     <DataTable.Title style={styles.criteriaColumn}>Điều</DataTable.Title>
//                     <DataTable.Title style={styles.conditionColumn}>ĐRL</DataTable.Title>
//                     <DataTable.Title
//                         numeric
//                         style={styles.conditionColumn}
//                         sortDirection={sortOrder === 'asc' ? 'ascending' : 'descending'}
//                         onPress={handleSort}
//                     >
//                     </DataTable.Title>
//                 </DataTable.Header>

//                 {loading ? (
//                     <Text>Đang tải...</Text>
//                 ) : (
//                     <FlatList
//                         data={sortedData}
//                         renderItem={({ item, index }) => (
//                             <DataTable.Row key={item.id}>
//                                 <DataTable.Cell style={styles.sttColumn}>{index + 1}</DataTable.Cell>
//                                 <DataTable.Cell style={styles.activityColumn}>{item?.detail_extract_activity?.extract_activity?.name}</DataTable.Cell>
//                                 <DataTable.Cell style={styles.detailColumn}>{item?.detail_extract_activity?.name}</DataTable.Cell>
//                                 <DataTable.Cell style={styles.criteriaColumn}>{item?.detail_extract_activity?.extract_activity?.criteria}</DataTable.Cell>
//                                 <DataTable.Cell numeric style={styles.conditionColumn}>{item?.detail_extract_activity?.point}</DataTable.Cell>
//                             </DataTable.Row>
//                         )}
//                         keyExtractor={(item) => item.id.toString()}
//                     />
//                 )}
//             </DataTable>
//         </View>
//     );
// };

// export default ListRegister;

import React, { useState, useContext, useEffect } from "react";
import { Alert, View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper'; // Dùng Card để hiển thị đẹp hơn
import MyContext from "../../configs/MyContext";
import { authApi, endpoints } from "../../configs/API";
import ViewPointStyles from "./ViewPointStyles"; // Import styles mới
import { useNavigation } from "@react-navigation/native";

const ListRegister = () => {
    const [user] = useContext(MyContext);
    const accessToken = user?.token;
    const studentId = user?.student?.id;
    const [listPoint, setListPoint] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigation();

    const loadListPoint = async () => {
        try {
            setLoading(true);
            const res = await authApi(accessToken).get(endpoints["list_register"](studentId));
            console.log(res.data)
            setListPoint(res.data);
        } catch (error) {
            Alert.alert("Lỗi", error.response?.data?.error || "Đăng ký thất bại.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadListPoint();
    }, []);

    const groupedActivities = Array.isArray(listPoint) ? listPoint.reduce((groups, item) => {
        const criteria = item?.detail_extract_activity?.extract_activity?.criteria?.name  || "Chưa xác định";
        if (!groups[criteria]) groups[criteria] = [];
        groups[criteria].push(item);
        return groups;
    }, {}) : {};

    return (
        <View style={ViewPointStyles.container}>
            <Text style={ViewPointStyles.header}>📊 Các hoạt động đã đăng ký</Text>

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
                                            <Text style={ViewPointStyles.pointText}>🎯 Điểm: {item?.detail_extract_activity?.point}</Text>
                                        </Card.Content>
                                        <View style={ViewPointStyles.rightContainer}>
                                            <Text style={ViewPointStyles.statusText}>
                                                {item.status || "Chưa cập nhật"}
                                            </Text>
                                            <TouchableOpacity
                                                style={ViewPointStyles.reportButton}
                                                onPress={() => nav.navigate("Missing", {"detailActivityId":item?.detail_extract_activity?.id})}
                                            >
                                                <Text style={ViewPointStyles.reportButtonText}>Báo thiếu</Text>
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

export default ListRegister;
