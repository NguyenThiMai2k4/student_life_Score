import React, { useState, useContext, useEffect } from "react";
import { Alert, View, Text, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import MyContext from "../../configs/MyContext";
import { authApi, endpoints } from "../../configs/API";
import Style from "./styles";

const Missing = ({ route }) => {
    const detailActivityId = route.params?.detailActivityId;
    const [evidence, setEvidence] = useState("");  // Dữ liệu minh chứng
    const [loading, setLoading] = useState(false);  // Trạng thái loading khi gửi dữ liệu
    const [user, dispatch] = useContext(MyContext);
    const accessToken = user?.token;
    const formData = new FormData();
    formData.append('evidence', evidence);

    // Hàm gửi dữ liệu minh chứng lên API
    const submitEvidence = async () => {
        if (!accessToken) {
            Alert.alert("Lỗi", "Bạn cần đăng nhập để gửi minh chứng.");
            return;
        }
        if (!evidence) {
            Alert.alert("Lỗi", "Vui lòng nhập minh chứng.");
            return;
        }

        setLoading(true); // Bắt đầu trạng thái loading
        try {
            const response = await authApi(accessToken).post(
                endpoints["missing_detail_activity"](detailActivityId),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Nếu cần gửi tệp, nhưng bạn gửi chuỗi thì không cần thiết
                    },
                }
            );
            if (response.status === 201) {
                Alert.alert("Thành công", "Minh chứng đã được gửi thành công!");
                setEvidence(""); // Xóa trường nhập liệu sau khi gửi thành công
            } else {
                Alert.alert("Lỗi", "Không thể gửi minh chứng. Vui lòng thử lại.");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể kết nối đến server.");
        } finally {
            setLoading(false); // Kết thúc trạng thái loading
        }
    };

    return (
        <ScrollView style={Style.container}>
            <Card style={Style.card}>
                <Card.Content>
                    <Text style={Style.detail}>Nhập minh chứng:</Text>
                    <TextInput
                        style={Style.input}
                        value={evidence}
                        onChangeText={setEvidence}
                        placeholder="Nhập minh chứng"
                        multiline
                        numberOfLines={4}
                    />
                </Card.Content>
            </Card>

            <View style={Style.buttonContainer}>
                <TouchableOpacity
                    style={Style.submitButton}
                    onPress={submitEvidence}
                    disabled={loading}
                >
                    <Text style={Style.submitButtonText}>
                        {loading ? "Đang gửi..." : "Xác nhận"}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Missing;
