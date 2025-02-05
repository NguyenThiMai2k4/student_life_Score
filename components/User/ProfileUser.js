import React, { useState, useContext, useEffect } from "react";
import { Alert, View, Text, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import MyContext from "../../configs/MyContext";
import { authApi, endpoints } from "../../configs/API";
import Style from "./Style";

const ProfileUser = () => {
    const [profile, setProfile] = useState({});
    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const accessToken = user?.token;
    const userId = user?.id;

    const loadProfile = async () => {
        try {
            setLoading(true);
            const res = await authApi(accessToken).get(endpoints["profile"](userId));
            setProfile(res.data);
            console.log(res.data);
        } catch (error) {
            Alert.alert("Lỗi", error.response?.data?.error || "Không thể tải hồ sơ.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 50 }} />;

    return (
        <ScrollView style={Style.container}>
            <Card style={Style.profileCard}>
                <View style={Style.avatarContainer}>
                    <Image source={{ uri: profile.avatar }} style={Style.avatar} />
                    <Text style={Style.name}>{profile.email}</Text>
                    <Text style={Style.role}>{profile.role}</Text>
                </View>
                <View style={Style.infoSection}>
                    <View style={Style.infoRow}>
                        <Text style={Style.infoLabel}>Email:</Text>
                        <Text style={Style.infoValue}>{profile.email}</Text>
                    </View>

                    <View style={Style.infoRow}>
                        <Text style={Style.infoLabel}>ID User:</Text>
                        <Text style={Style.infoValue}>{profile.id}</Text>
                    </View>
                    {profile.student && (
                        <>
                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>ID sinh viên:</Text>
                                <Text style={Style.infoValue}>{profile.student.id}</Text>
                            </View>
                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>Tên:</Text>
                                <Text style={Style.infoValue}>{profile.student.name}</Text>
                            </View>

                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>Giới tính:</Text>
                                <Text style={Style.infoValue}>
                                    {profile.student.gender === "MALE" ? "Nam" : "Nữ"}
                                </Text>
                            </View>

                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>Ngày sinh:</Text>
                                <Text style={Style.infoValue}>{profile.student.dob}</Text>
                            </View>

                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>Lớp:</Text>
                                <Text style={Style.infoValue}>{profile.student.class_student?.name || "Chưa cập nhật"}</Text>
                            </View>

                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>Ngành:</Text>
                                <Text style={Style.infoValue}>{profile.student.class_student?.major?.name || "Chưa cập nhật"}</Text>
                            </View>

                            <View style={Style.infoRow}>
                                <Text style={Style.infoLabel}>Khoa:</Text>
                                <Text style={Style.infoValue}>{profile.student.class_student?.major?.faculty?.name || "Chưa cập nhật"}</Text>
                            </View>
                        </>
                    )}
                </View>

                <TouchableOpacity style={Style.editButton}>
                    <Text style={Style.editButtonText}>Chỉnh sửa hồ sơ</Text>
                </TouchableOpacity>
            </Card>
        </ScrollView>
    );
};

export default ProfileUser;
