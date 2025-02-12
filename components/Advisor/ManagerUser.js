import MyStyle from "../../styles/MyStyle";
import {
    Button,
    Alert,
    View,
    RefreshControl,
    StatusBar,
    ScrollView,
    ImageBackground,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    Pressable,
    ActivityIndicator,
    FlatList
} from 'react-native';
import React, { useState, useContext, useEffect } from "react";
import APIs, { authApi, endpoints } from "../../configs/API";
import { Card, List, Searchbar } from "react-native-paper";
import MyContext from "../../configs/MyContext";
import ListRegister from "../Student/ListRegister";
import styles from "./styles"
import Style from "../User/Style";
import AntDesign from "react-native-vector-icons/AntDesign";

const ManagerUser = ({ navigation }) => {
    const [user, dispatch] = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const accessToken = user?.token;
    const [role, setRole] = React.useState("")
    const [profile, setProfile] = useState({});
    const [userId, setUserId] = React.useState("")
    const [listUser, setListUser] = React.useState([]);
    const [roleChoose, setRoleChoose] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const loadProfile = async () => {
        console.log("hELLO: ",userId);
        if (!userId) {
            setLoading(true);
           if(page > 0){
            let url = `${endpoints['user']}?page=${page}`;
            let res = await authApi(accessToken).get(url);
            if (page > 1)
                setListUser(current => [...current, ...res.data.results]);
            else
                setListUser(res.data.results);
            if (res.data.next === null)
                setPage(0);
            console.log(res.data.results);
           }
        } else {
            try {
                setLoading(true);
                const res = await authApi(accessToken).get(endpoints["profile"](userId));
                setProfile(res.data);
                setRoleChoose(res.data.role);
            } catch (error) {
                setUserId("");
                Alert.alert("Lỗi","Không tìm thấy user");
            } finally {
                setLoading(false);
            }
        }
    };
    const changeRole = async () => {
        if (!userId) return;

        try {
            setLoading(true);
            console.log("userId: ",userId);
            const newRole = roleChoose === 'ASSISTANT' ? 'STUDENT' : 'ASSISTANT'; // Đảo vai trò

            const res = await authApi(accessToken).patch(endpoints["patch_role"](userId), {
                role: newRole
            }, {
                headers: {
                    "Content-Type": 'multipart/form-data',
                }
            });

            setProfile(prevProfile => ({
                ...prevProfile,
                role: res.data.role
            }));

            setRoleChoose(res.data.role);

            Alert.alert(
                'Thành công',
                `Vai trò người dùng đã được thay đổi thành ${newRole}.`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            Alert.alert('Lỗi', error.response?.data?.error || 'Không thể thay đổi vai trò.', [{ text: 'OK' }]);
            console.error('Role change error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProfile();
    }, [page, userId]);

    const loadMore = () => {
        if (!loading && page > 0) setPage(page + 1);
    };


    return (
        <View style={MyStyle.container}>
            <Searchbar
                style={styles.searchBar}
                placeholder={"Nhập Id User..."}
                placeholderTextColor={'gray'}
                value={userId}
                onChangeText={(text) => setUserId(text)}
                onSubmitEditing={loadProfile}></Searchbar>

            {loading === false && userId && profile.id ? (
                <ScrollView style={Style.container}>
                    <Card style={Style.profileCard}>
                        <View style={Style.avatarContainer}>
                            <Image source={{ uri: profile.avatar }} style={Style.avatar} />
                            <Text style={Style.name}>{profile.email}</Text>
                            <TouchableOpacity
                                style={styles.roleContainer}
                                onPress={() => {
                                    Alert.alert(
                                        "Xác nhận",
                                        "Bạn có muốn thay đổi vai trò của người dùng này không?",
                                        [
                                            { text: "Hủy", style: "cancel" },
                                            { text: "Có", onPress: changeRole }
                                        ]
                                    );
                                }}
                            >
                                <AntDesign name={"edit"} color={'white'} size={16} style={styles.editIcon} />
                                <Text style={styles.roleText}>{profile.role}</Text>
                            </TouchableOpacity>


                        </View>
                        <View style={styles.infoSection}>
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
                                        <Text
                                            style={Style.infoValue}>{profile.student.class_student?.name || "Chưa cập nhật"}</Text>
                                    </View>

                                    <View style={Style.infoRow}>
                                        <Text style={Style.infoLabel}>Ngành:</Text>
                                        <Text
                                            style={Style.infoValue}>{profile.student.class_student?.major?.name || "Chưa cập nhật"}</Text>
                                    </View>

                                    <View style={Style.infoRow}>
                                        <Text style={Style.infoLabel}>Khoa:</Text>
                                        <Text
                                            style={Style.infoValue}>{profile.student.class_student?.major?.faculty?.name || "Chưa cập nhật"}</Text>
                                    </View>
                                </>
                            )}
                        </View>
                    </Card>
                </ScrollView>
            ) :
                (<FlatList
                    data={listUser}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <List.Item
                                title={`ID ${item.id} - ${item.email}`}
                                left={() => <List.Icon icon="account" />}
                                right={() => (
                                    <TouchableOpacity style={styles.detailButton}
                                        onPress={() => {
                                            setUserId(item.id);
                                        }}>
                                        <Text style={styles.detailButtonText}>Xem chi tiết</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    )}
                />
                )}
        </View>

    );
}

export default ManagerUser