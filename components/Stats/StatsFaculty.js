import React, { useState, useContext, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import MyContext from "../../configs/MyContext";
import { authApi, endpoints } from "../../configs/API";
import styles from './style';
const screenWidth = Dimensions.get("window").width;

const StatsFaculty = () => {
    const [statsClass, setStatsClass] = useState([]);
    const [statsFaculty, setStatsFaculty] = useState([]);
    const [statsRank, setStatsRank] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStat, setSelectedStat] = useState('class');
    const [user, dispatch] = useContext(MyContext);
    const accessToken = user?.token;
    const loadStatsClass = async () => {
        try {
            setLoading(true);
            let res = await authApi(accessToken).get(endpoints["stats_class"]);
            setStatsClass(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải thống kê theo lớp:", ex);
        } finally {
            setLoading(false);
        }
    };
    const loadStatsFaculty = async () => {
        try {
            setLoading(true);
            let res = await authApi(accessToken).get(endpoints["stats_faculty"]);
            setStatsFaculty(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải theo khoa:", ex);
        } finally {
            setLoading(false);
        }
    };
    const loadStatsRank = async () => {
        try {
            setLoading(true);
            let res = await authApi(accessToken).get(endpoints["stats_rank"]);
            setStatsRank(res.data);
            console.log(res.data);
        } catch (ex) {
            console.error("Lỗi khi tải thống kê theo thành tích:", ex);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadStatsClass();
        if (user?.role !== "ASSISTANT") {
            loadStatsFaculty();
        }
        loadStatsRank();
    }, []);
    const handleStatChange = (statType) => {
        setSelectedStat(statType);
    };
    const chartData = {
        labels: selectedStat === 'class' ? statsClass.map(item => item.class_name) :
            selectedStat === 'faculty' ? statsFaculty.map(item => item.name) :
                statsRank.map(item => item.rank),
        datasets: [
            {
                data: selectedStat === 'class' ? statsClass.map(item => item.avg_points) :
                    selectedStat === 'faculty' ? statsFaculty.map(item => item.avg_points) :
                        statsRank.map(item => item.count),
            },
        ],
    };
    const renderStatsTable = () => {
        if (selectedStat === 'class') {
            return statsClass.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.class_name}</Text>
                    <Text style={styles.tableDataText}>{item.avg_points}</Text>
                </View>
            ));
        } else if (selectedStat === 'faculty') {
            return statsFaculty.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.name}</Text>
                    <Text style={styles.tableDataText}>{item.avg_points}</Text>
                </View>
            ));
        } else if (selectedStat === 'rank') {
            return statsRank.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableDataText}>{item.rank}</Text>
                    <Text style={styles.tableDataText}>{item.count}</Text>
                </View>
            ));
        }
    };
    const renderTableHeader = () => {
        if (selectedStat === 'rank') {
            return (
                <>
                    <Text style={styles.tableHeaderText}>Xếp loại</Text>
                    <Text style={styles.tableHeaderText}>Số lượng</Text>
                </>
            );
        } else {
            return (
                <>
                    <Text style={styles.tableHeaderText}>Tên</Text>
                    <Text style={styles.tableHeaderText}>Điểm trung bình</Text>
                </>
            );
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.statSelectionContainer}>
                <TouchableOpacity
                    style={[styles.statButton, selectedStat === 'class' && styles.selectedButton]}
                    onPress={() => handleStatChange('class')}
                >
                    <Text style={styles.statButtonText}>Thống kê theo lớp</Text>
                </TouchableOpacity>
                {user?.role !== "ASSISTANT" && (
                    <TouchableOpacity
                        style={[styles.statButton, selectedStat === 'faculty' && styles.selectedButton]}
                        onPress={() => handleStatChange('faculty')}
                    >
                        <Text style={styles.statButtonText}>Thống kê theo khoa</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.statButton, selectedStat === 'rank' && styles.selectedButton]}
                    onPress={() => handleStatChange('rank')}
                >
                    <Text style={styles.statButtonText}>Thống kê theo thành tích</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
            ) : (
                <>
                    <ScrollView style={styles.scrollView}>
                        <ScrollView horizontal={true} style={styles.chartContainer}>
                            <BarChart
                                data={chartData}
                                width={screenWidth * 1.6}
                                height={220}
                                yAxisLabel=""
                                chartConfig={{
                                    backgroundColor: "#ffffff",
                                    backgroundGradientFrom: "#f1f1f1",
                                    backgroundGradientTo: "#e1e1e1",
                                    decimalPlaces: 1,
                                    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: { borderRadius: 16 },
                                    barPercentage: 1,
                                }}
                                verticalLabelRotation={10}
                            />
                        </ScrollView>
                        <View style={styles.tableHeader}>
                            {renderTableHeader()}
                        </View>
                        {renderStatsTable()}
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default StatsFaculty;
