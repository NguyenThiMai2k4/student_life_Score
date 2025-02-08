import MyStyle from "../../styles/MyStyle"
import {
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
    FlatList, Alert
} from 'react-native';
import Style from "./Style.js";
import React, { useContext, useState } from 'react'
import APIs, { authApi, endpoints } from "../../configs/API";
import { Chip, Searchbar, List, Icon, MD3Colors } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MyContext from "../../configs/MyContext";

const HomeScreen = () => {
    const [extract_activity, setExtractActivity] = React.useState([]);
    const [criteria, setCriteria] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [q, setQ] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [criteriaId, setCriteriaId] = React.useState("")
    const nav = useNavigation();
    const [index, setIndex] = React.useState(0);


    const [user, dispatch] = useContext(MyContext)
    const accessToken = user?.token;
    // const [loading, setLoading] = useState(false);
    const handleDelete = async (activityId) => {
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
                            // Perform the delete operation
                            await authApi(accessToken).delete(
                                endpoints['activity_delete'](activityId),
                                {
                                    headers: {
                                        "Content-Type": 'application/json',
                                    }
                                }
                            );

                            // Remove the deleted activity from the local state
                            setExtractActivity(currentActivities =>
                                currentActivities.filter(activity => activity.id !== activityId)
                            );

                            // Optionally show a success message
                            Alert.alert("Thông báo", "Đã xóa hoạt động thành công");
                        } catch (error) {
                            console.error("Error deleting activity:", error);
                            Alert.alert("Lỗi", "Không thể xóa hoạt động. Vui lòng thử lại.");
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };
    const loadExtractActivity = async () => {
        if (page > 0) {
            setLoading(true)
            try {
                let url = `${endpoints['extract_activity']}?page=${page}`;
                if (criteriaId || q) {
                    let queryParams = [];
                    if (criteriaId) queryParams.push(`criteria=${criteriaId}`);
                    if (q) queryParams.push(`q=${q}`);

                    url = `${url}&${queryParams.join('&')}`;
                }
                let res = await APIs.get(url);
                if (page > 1)
                    setExtractActivity(current => [...current, ...res.data.results]);
                else
                    setExtractActivity(res.data.results);
                if (res.data.next === null)
                    setPage(0)
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    }

    const loadCriteria = async () => {
        let res = await APIs.get(endpoints['criteria']);
        setCriteria(res.data.results);
    }

    React.useEffect(() => {
        let timer = setTimeout(() => loadExtractActivity(), 500);
        return () => clearTimeout(timer);
    }, [criteriaId, q, page]);
    
    React.useEffect(() => {
        loadCriteria();
    })


    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }
    const refresh = () => {
        setPage(1);
        loadExtractActivity();
    }
    const loadMore = () => {
        if (page > 0 && !loading)
            setPage(page + 1);
    }

    return (
        <View style={Style.container}>
            <ImageBackground
                style={[Style.headerImg, { paddingTop: StatusBar.currentHeight }]}
                source={require('../../assets/extractActivity.png')}
            >
                <StatusBar translucent backgroundColor="black" />
            </ImageBackground>
            <View style={Style.row}>
                <TouchableOpacity onPress={() => search("", setCriteriaId)}>
                    <Chip style={Style.margin} icon="label">Tất cả</Chip>

                </TouchableOpacity>
                {criteria.map(c =>
                    <TouchableOpacity key={c.id} onPress={() => search(c.id, setCriteriaId)}>
                        <Chip style={Style.margin} icon="label">Điều {c.name}</Chip>
                    </TouchableOpacity>)}
            </View>
            <Searchbar placeholder="Tìm hoạt động..." value={q} onChangeText={t => search(t, setQ)} />
            {loading && <ActivityIndicator />}

            <FlatList onEndReached={loadMore} data={extract_activity} renderItem={({ item }) =>
                <List.Item title={item.name} key={item.id}
                    description={
                        <View>
                            <Text>Ngày bắt đầu: {item.start_date}</Text>
                            <Text>Ngày kết thúc: {item.end_date}</Text>
                        </View>
                    }
                    left={props => <List.Icon {...props} icon="folder" />}
                    right={props => (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={Style.detailButton}
                                onPress={() => nav.navigate("DetailActivity", { "activityId": item.id })}
                            >
                                <Text style={Style.detailButtonText}>Xem chi tiết</Text>
                            </TouchableOpacity>
                            {user.role === "ASSISTANT" || user.role === "ADVISOR" ? (
                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                    style={[MyStyle.iconDelete, { marginLeft: 10 }]}
                                >
                                    <AntDesign name="delete" size={16} color="red" />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    )}
                />
            } />
            <TouchableOpacity
                onPress={() => nav.navigate("Chat")}
                style={Style.chatButton}
            >
                <Icon
                    source="chat"
                    color={"#87CEEB"}
                    size={20}
                />
            </TouchableOpacity>
        </View>
    )
}
export default HomeScreen