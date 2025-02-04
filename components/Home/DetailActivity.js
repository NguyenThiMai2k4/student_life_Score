import MyStyle from "../../styles/MyStyle";
import {
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
import Style from "./Style.js";
import DetailStyle from "./DetailStyle.js"
import React, { useState, useContext, useEffect } from "react";
import APIs, { authApi, endpoints } from "../../configs/API";
import { Card } from "react-native-paper";
import MyContext from "../../configs/MyContext";
import { useNavigation } from "@react-navigation/native";
import addDetailActivity from "../Assistant/AddDetailActivity";
import { Swipeable } from 'react-native-gesture-handler';
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../Assistant/styles";

const DetailActivity = ({ route }) => {
    const [detailActivity, setDetailActivity] = useState([]);
    const [loading, setLoading] = useState(true);
    const activityId = route.params?.activityId;
    const [comments, setComments] = React.useState([]);
    const [user, dispatch] = useContext(MyContext)
    const [content, setContent] = React.useState("");
    const accessToken = user?.token;
    const formData = new FormData();
    formData.append('content', content);
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const nav = useNavigation();


    const handleDelete = async (detailActivityId) => {
        Alert.alert(
            "Xác nhận xóa",
            "Bạn có chắc chắn muốn xóa hoạt động này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Xóa",
                    onPress: async () => {
                        try {
                            await authApi(accessToken).delete(
                                endpoints['detail_activity_delete'](detailActivityId),
                                {
                                    headers: {
                                        "Content-Type": 'application/json',
                                    }
                                }
                            );

                            setDetailActivity(currentDetailActivities =>
                                currentDetailActivities.filter(detailActivity => detailActivity.id !== detailActivityId)
                            );

                            Alert.alert("Thông báo", "Đã xóa chi tiết hoạt động thành công");
                        } catch (error) {
                            console.error("Error deleting activity:", error);
                            Alert.alert("Lỗi", "Không thể xóa chi tiết hoạt động. Vui lòng thử lại.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };
    const renderRightActions = (progress, dragX, item) => {
        return (
            <TouchableOpacity
                style={DetailStyle.deleteButton}
                onPress={() => handleDelete(item.id)}
            >
                <AntDesign name={'delete'} size={24} color={'red'} />
            </TouchableOpacity>
        );
    };
    const loadDetailExtractActivity = async () => {
        try {
            setLoading(true);
            let res = await APIs.get(endpoints["detail_activity"](activityId));
            setDetailActivity(res.data); // Cập nhật state với dữ liệu trả về
        } catch (ex) {
            console.error("Lỗi khi tải chi tiết hoạt động:", ex);
        } finally {
            setLoading(false);
        }
    };
    // trả về đối tượng truyền vào khi có id
    // const extractActivity = detailActivity.length > 0 ? detailActivity[0].extract_activity : null;
    const [extractActivity, setExtractActivity] = React.useState({});
    const loadExtractActivity = async () => {
        let res = await APIs.get(`${endpoints["extract_activity"]}/${activityId}`);
        setExtractActivity(res.data);
        console.log(res.data);
    }

    const loadComments = async () => {
        try {
            let res = await APIs.get(endpoints["comments"](activityId))
            setComments(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error(ex);
        }
    }
    const loadLikes = async () => {
        try {
            let res = await APIs.get(endpoints["likes"](activityId));
            setLikesCount(res.data.likes_count);
            const userLiked = res.data.likes.some(like => like.user.id === user.id);
            setLiked(userLiked);

        } catch (ex) {
            console.error("Lỗi khi tải lượt thích:", ex);
        }
    };

    const submitContent = async () => {
        setLoading(true);
        try {
            console.log("token: ", accessToken);
            const response = await authApi(accessToken).post(
                endpoints["comments"](activityId),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setContent("");
            await loadComments();
        } catch (error) {
            Alert.alert("Lỗi", "Không thể kết nối đến server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExtractActivity();
        loadDetailExtractActivity();
        loadComments();
        loadLikes();
    }, [activityId]);


    const registerActivity = async (itemId) => {
        if (!accessToken) {
            Alert.alert("Lỗi", "Bạn cần đăng nhập để đăng ký hoạt động.");
            return;
        } else {
            console.log("token", accessToken);
        }

        try {
            console.log(itemId);
            const response = await authApi(accessToken).post(endpoints["register_detail_activity"](itemId));
            if (response.status === 201) {
                Alert.alert("Đăng ký thành công!");
            } else {
                const errorMessage = response?.data?.detail || "Đăng ký thất bại. Vui lòng thử lại.";
                Alert.alert("Lỗi", errorMessage);
            }
        } catch (error) {
            if (error.response) {

                const errorMessage = error.response?.data?.error || "Đăng ký thất bại.";
                Alert.alert("Lỗi", errorMessage);
            } else {
                Alert.alert("Lỗi", "Không thể kết nối đến server.");
            }
        }
    };


    if (loading) return <ActivityIndicator size="large" color="#007aff" />;

    const toggleLike = async () => {
        if (!accessToken) {
            Alert.alert("Lỗi", "Bạn cần đăng nhập để thích hoạt động.");
            return;
        }
        try {
            const response = await authApi(accessToken).post(endpoints["likes"](activityId));
            if (response.status === 200) {
                await loadLikes();
            }
        } catch (error) {
            console.error("Lỗi khi thích hoạt động:", error);
        }
    };

    return (
        <ScrollView style={DetailStyle.container}>
            <ImageBackground
                style={[Style.headerImg, { paddingTop: StatusBar.currentHeight }]}
                source={require('../../assets/detailActivity.png')}
            ></ImageBackground>
            {extractActivity && (
                <Card style={DetailStyle.card}>
                    <Card.Content>
                        <Text style={DetailStyle.title}>
                            Tên hoạt động: {extractActivity?.name || "Không có dữ liệu"}
                        </Text>
                        <Text style={DetailStyle.detail}>
                            Điều: {extractActivity?.criteria?.name || "Không có dữ liệu"}
                        </Text>
                        <Text style={DetailStyle.detail}>
                            Mô tả: {extractActivity?.description || "Không có mô tả"}
                        </Text>
                        <Text style={DetailStyle.detail}>
                            Ngày bắt đầu: {extractActivity?.start_date || "Không có mô tả"}
                        </Text>
                        <Text style={DetailStyle.detail}>
                            Ngày kết thúc: {extractActivity?.end_date || "Không có mô tả"}
                        </Text>

                        <View style={{ padding: 5, flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                            <TouchableOpacity onPress={toggleLike}>
                                <Image
                                    source={liked ? require('../../assets/liked.png') : require('../../assets/like.png')}
                                    style={{ width: 24, height: 24, marginRight: 5 }}
                                />
                            </TouchableOpacity>
                            <Text>{likesCount} lượt thích</Text>
                        </View>
                    </Card.Content>
                </Card>
            )}

            <Text style={DetailStyle.sectionTitle}>Chi tiết:</Text>

            {detailActivity.map((item) => (
                <Swipeable
                    key={item.id}
                    renderRightActions={
                        (user.role === "ASSISTANT" || user.role === "ADVISOR")
                            ? (progress, dragX) => renderRightActions(progress, dragX, item)
                            : null
                    }
                >
                    <Card style={DetailStyle.card}>
                        <Card.Content
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={DetailStyle.detail}>Tên: {item.name}</Text>
                                <Text style={DetailStyle.detail}>Điểm: {item.point}</Text>
                            </View>
                            <TouchableOpacity
                                style={DetailStyle.registerButton}
                                onPress={() => registerActivity(item.id)}
                            >
                                <Text style={DetailStyle.registerButtonText}>Đăng ký</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                </Swipeable>
            ))}


            {user.role === "ASSISTANT" || user.role === "ADVISOR" ? (
                <TouchableOpacity
                    onPress={() => nav.navigate("AddDetailActivity", {
                        activityId: activityId,
                        activityData: {
                            name: extractActivity.name,
                            criteria: extractActivity.criteria.name,
                            description: extractActivity.description,
                            startDate: extractActivity.start_date,
                            endDate: extractActivity.end_date,
                        }
                    })}
                >
                    <Card style={styles.addCard}>
                        <Card.Content style={styles.addCardContent}>
                            <AntDesign name='plus' size={24} color="#666" />
                        </Card.Content>
                    </Card>
                </TouchableOpacity>) : null}

            <Text style={DetailStyle.sectionTitle}>Bình luận:</Text>
            <Card style={DetailStyle.card}>
                <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                        style={[DetailStyle.input, { flex: 1, marginRight: 10 }]}
                        value={content}
                        onChangeText={setContent}
                        placeholder="Nhập bình luận"
                        multiline
                        numberOfLines={4}
                    />
                    <TouchableOpacity
                        style={DetailStyle.submitButton}
                        onPress={submitContent}
                        disabled={loading}
                    >
                        <Text style={DetailStyle.submitButton}>
                            {loading ? "..." : "Gửi"}
                        </Text>
                    </TouchableOpacity>
                </Card.Content>
            </Card>

            {
                comments.length === 0 ? <ActivityIndicator /> : comments.map(c => (
                    <View style={DetailStyle.commentContainer} key={c.id}>
                        <Image source={{ uri: c.user.avatar }} style={DetailStyle.avatar} />
                        <View style={DetailStyle.commentContent}>
                            <Text style={DetailStyle.commentUser}>{c.user.email}</Text>
                            <Text style={DetailStyle.commentText}>{c.content}</Text>
                            <Text style={DetailStyle.commentDate}>{c.created_date}</Text>
                        </View>
                    </View>
                ))
            }
        </ScrollView>

    )
        ;
};

export default DetailActivity;
