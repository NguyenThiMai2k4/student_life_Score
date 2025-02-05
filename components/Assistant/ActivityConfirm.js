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
import Style from "../Home/Style.js";
import React, {useContext, useState} from 'react'
import APIs, {authApi, endpoints} from "../../configs/API";
import {Chip, Searchbar, List} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import MyContext from "../../configs/MyContext";

const ActivityConfirm = () => {
    const [extract_activity, setExtractActivity] = React.useState([]);
    const [criteria, setCriteria] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [q, setQ] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [criteriaId, setCriteriaId] = React.useState("")
    const nav = useNavigation();

    const [user, dispatch] = useContext(MyContext)
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
                style={[Style.headerImg, {paddingTop: StatusBar.currentHeight}]}
                source={require('../../assets/extractActivity.png')}
            >
                <StatusBar translucent backgroundColor="black"/>
            </ImageBackground>

            <Searchbar placeholder="Tìm hoạt động..." value={q} onChangeText={t => search(t, setQ)}/>
            {loading && <ActivityIndicator/>}


            <FlatList onEndReached={loadMore} data={extract_activity} renderItem={({item}) =>
                <List.Item title={item.name} key={item.id}
                           description={
                               <View>
                                   <Text>Ngày bắt đầu: {item.start_date}</Text>
                                   <Text>Ngày kết thúc: {item.end_date}</Text>
                               </View>
                           }
                           left={props => <List.Icon {...props} icon="folder"/>}
                           right={props => (
                               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                   <TouchableOpacity
                                       style={Style.detailButton}
                                       onPress={() => nav.navigate("ConfirmStudent", {"activityId": item.id})}
                                   >
                                       <Text style={Style.detailButtonText}>Điểm danh</Text>
                                   </TouchableOpacity>

                               </View>
                           )}
                />
            }/>
        </View>
    )
}
export default ActivityConfirm;