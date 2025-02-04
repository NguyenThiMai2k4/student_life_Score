import React, { useState, useContext, useEffect } from "react";
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import MyContext from "../../configs/MyContext";
import APIs, { endpoints } from "../../configs/API";
import { useNavigation } from "@react-navigation/native";
import styles from "./StudentListStyle"; 

const StudentList = () => {
    const [loading, setLoading] = useState(false);
    const [user] = useContext(MyContext);
    const nav = useNavigation();
    const [studentList, setStudentList] = useState([]);
    const [page, setPage] = useState(1);
    const [q, setQ] = React.useState("");

    const LoadStudentList = async () => {
        if(page > 0){
            setLoading(true);
            try {
                if (q) {
                    let res = await APIs.get(`${endpoints['student']}/${q}/`);
                    setStudentList(res.data ? [res.data] : []); 
                } else {
                    let url = `${endpoints['student']}?page=${page}`;
                    let res = await APIs.get(url);
                    if (page > 1)
                        setStudentList(current => [...current, ...res.data.results]);
                    else
                        setStudentList(res.data.results);
                    if (res.data.next === null)
                        setPage(0);
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 404) {
                    setStudentList([]); 
                    setSnackbarVisible(true);
                } else {
                    console.error(ex); 
                }
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        LoadStudentList();
    }, [page, q]);

    const search = (value, callback) => {
        setPage(1); 
        callback(value);
    };

    const loadMore = () => {
        if (!loading && page > 0) setPage(page + 1);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Danh sách sinh viên</Text>
            <Searchbar placeholder="Tìm ID sinh viên..." value={q} onChangeText={t => search(t, setQ)} />
            {loading ? <ActivityIndicator size="large" color="#4682B4" /> : null}
            {q ? (
                <View style={styles.itemContainer}>
                    {studentList.length > 0 ? (
                        <List.Item
                            title={`${studentList[0].id} - ${studentList[0].name}`}
                            left={() => <List.Icon icon="account" />}
                            right={() => (
                                <TouchableOpacity style={styles.detailButton}
                                onPress={() => nav.navigate("StudentDetail", {"studentId": studentList[0].id})}>
                                    <Text style={styles.detailButtonText}>Xem chi tiết</Text>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text style={styles.noResultText}>Không tìm thấy!</Text>
                    )}
                </View>
            ) : (
                <FlatList
                    data={studentList}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <List.Item
                                title={`ID ${item.id} - ${item.name}`} 
                                left={() => <List.Icon icon="account" />}
                                right={() => (
                                    <TouchableOpacity style={styles.detailButton}
                                    onPress={() => nav.navigate("StudentDetail", {"studentId": item.id})}>
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
};

export default StudentList;
