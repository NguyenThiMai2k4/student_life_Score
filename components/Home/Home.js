import MyStyle from "../../styles/MyStyle"
import {View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Pressable, ActivityIndicator} from 'react-native';
import Style from "./Styles.js";
import React from 'react'
import APIs, { endpoints } from "../../configs/API";
import { Chip, Searchbar } from 'react-native-paper';


const Home = () =>{
    const [extract_activity, setExtractActivity] = React.useState([]);
    const [criteria, setCriteria] = React.useState([]);
    const [page, setPage] = React.useState(1);

    const loadExtractActivity = async() => {
        let res = await APIs.get(endpoints['extract_activity']);
        setExtractActivity(res.data.results);
        console.log(res.data.results);
    }
    const loadCriteria = async() => {
        let res = await APIs.get(endpoints['criteria']);
        setCriteria(res.data.results);
    }
    React.useEffect(() => {
        loadExtractActivity();
    }, []);
    React.useEffect(() => {
        loadCriteria();
    })


    const search = (value, callback) => {
        setPage(1);
        callback(value);
    }
    return (
    <View style={[Style.container, Style.margin]}>
        <View style={Style.row}>
        <TouchableOpacity onPress={() => search("null", setCriteria)} >
            <Chip style={Style.margin} icon="label">Tất cả</Chip>

        </TouchableOpacity>
        {criteria.map(c => <TouchableOpacity key={c.id} onPress={() => search(c.id, setCriteria)}>
            <Chip style={Style.margin} icon="label" >Điều {c.name}</Chip>
        </TouchableOpacity>)}
        </View>
        </View>
        
    )
}
export default Home