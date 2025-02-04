import React, { useState, useEffect } from "react";
import { Alert, View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import APIs, { endpoints } from "../../configs/API";
import Style from "./StudentDetailStyle";
import { useNavigation } from "@react-navigation/native";

const StudentDetail = ({ route }) => {
    const studentId = route.params?.studentId;
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const nav = useNavigation();
    const loadProfile = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(`${endpoints["student"]}/${studentId}`);
            setProfile(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải thông tin:", ex);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <ScrollView style={Style.container}>
        <Card style={Style.profileCard}>
            <View style={Style.avatarContainer}>
                <Text style={Style.name}>Hồ sơ sinh viên</Text>
            </View>
            <View style={Style.infoSection}>
                <View style={Style.infoRow}>
                    <Text style={Style.infoLabel}>Email:</Text>
                    <Text style={Style.infoValue}>{profile.email}</Text>
                </View>

                <View style={Style.infoRow}>
                    <Text style={Style.infoLabel}>ID Sinh viên:</Text>
                    <Text style={Style.infoValue}>{profile.id}</Text>
                </View>
                    <>
                        <View style={Style.infoRow}>
                            <Text style={Style.infoLabel}>Tên:</Text>
                            <Text style={Style.infoValue}>{profile.name}</Text>
                        </View>

                        <View style={Style.infoRow}>
                            <Text style={Style.infoLabel}>Giới tính:</Text>
                            <Text style={Style.infoValue}>
                                {profile.gender === "MALE" ? "Nam" : "Nữ"}
                            </Text>
                        </View>

                        <View style={Style.infoRow}>
                            <Text style={Style.infoLabel}>Ngày sinh:</Text>
                            <Text style={Style.infoValue}>{profile.dob}</Text>
                        </View>

                        <View style={Style.infoRow}>
                            <Text style={Style.infoLabel}>Lớp:</Text>
                            <Text style={Style.infoValue}>{profile.class_student?.name || "Chưa cập nhật"}</Text>
                        </View>

                        <View style={Style.infoRow}>
                            <Text style={Style.infoLabel}>Ngành:</Text>
                            <Text style={Style.infoValue}>{profile.class_student?.major?.name || "Chưa cập nhật"}</Text>
                        </View>

                        <View style={Style.infoRow}>
                            <Text style={Style.infoLabel}>Khoa:</Text>
                            <Text style={Style.infoValue}>{profile.class_student?.major?.faculty?.name || "Chưa cập nhật"}</Text>
                        </View>
                    </>
            </View>

            <TouchableOpacity style={Style.editButton}
              onPress={() => nav.navigate("ViewPointStudent", {"studentId": profile.id})}>
                <Text style={Style.editButtonText}>Xem thành tích ĐRL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Style.editButton}
                   onPress={() => nav.navigate("MissingStudent", {"studentId": profile.id})}>
                <Text style={Style.editButtonText}>Xem danh sách báo thiếu</Text>
            </TouchableOpacity>
        </Card>
    </ScrollView>
    );
};

export default StudentDetail;
