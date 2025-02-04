import { Alert, View, StatusBar, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect,useContext } from "react";
import APIs, { authApi,endpoints } from "../../configs/API";
import { Card, Searchbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MissingListStyle from "./MissingListStyle";
import MyContext from "../../configs/MyContext";

const MissingList = ({ route }) => {
    const navigation = useNavigation();
    const facultyId = route.params?.facultyId;
    const [loading, setLoading] = useState(true);
    const [listMissing, setListMissing] = useState([]);
    const [q, setQ] = React.useState("");
    const [user, dispatch] = useContext(MyContext)
    const accessToken = user?.token;


    const loadListMissing = async () => {
        setLoading(true);
        try {
            let url = `${endpoints['get_list_missing'](facultyId)}`;
            if (q) {
                let queryParams = [`student=${q}`];
                url = `${url}?&${queryParams.join('&')}`;
            }
            let res = await APIs.get(url);
            setListMissing(res.data);
            console.log(res.data)
        } catch (ex) {
            console.error(ex);
        } finally {
            setLoading(false);
        }
    };

    const confirmMissing = async (itemId) => {
        try {
            const response = await authApi(accessToken).post(endpoints["confirm_register_detail_activity"](itemId));
            Alert.alert("Xác nhận thành công!");
            await loadListMissing();
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
            await loadListMissing();
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response?.data?.error || "Từ chối thất bại.";
                Alert.alert("Lỗi", errorMessage); 
            } else {
                Alert.alert("Lỗi", "Không thể kết nối đến server.");
            }
        }
    }


    useEffect(() => {
        loadListMissing();
    }, [q]);
    const search = (value, callback) => {
        callback(value);
    };

    return (
        <View style={MissingListStyle.container}>
            <Searchbar
                placeholder="Tìm mã sinh viên..."
                value={q}
                onChangeText={t => search(t, setQ)}
                style={{ marginBottom: 10 }}
            />
            {loading && <ActivityIndicator size="large" color="#2973B2" />}
            <FlatList
                data={listMissing}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={MissingListStyle.card}>
                        <Card.Content>
                            <Text style={MissingListStyle.statusText}>
                                {item.status || "Chưa cập nhật"}
                            </Text>
                            <Text style={MissingListStyle.studentName}>{`ID sinh viên: ${item.student}`}</Text>
                            <Text style={MissingListStyle.title}>{`Hoạt động: ${item.detail_extract_activity.extract_activity.name}`}</Text>
                            <Text style={MissingListStyle.activityDetail}>{`Hình thức: ${item.detail_extract_activity.name}`}</Text>
                            <Text style={MissingListStyle.evidence}>{`Minh chứng: ${item.evidence}`}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <TouchableOpacity style={MissingListStyle.detailButton} onPress={() => cancelMissing(item.id)}>
                                <Text style={MissingListStyle.detailButtonText}>Từ chối</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={MissingListStyle.confirmButton} onPress={() => confirmMissing(item.id)}>
                                <Text style={MissingListStyle.confirmButtonText}>Xác nhận</Text>
                            </TouchableOpacity>
                        </Card.Actions>
                    </Card>
                )}
            />
        </View>
    );
};

export default MissingList;
