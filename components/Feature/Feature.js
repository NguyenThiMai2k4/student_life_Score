import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import MyContext from "../../configs/MyContext";

const Feature = ({ navigation }) => {
    const [user] = useContext(MyContext);

    const roleButtons = {
        STUDENT: [
            { screen: "ListRegister", label: "Xem hoạt động đã đăng ký" },
            { screen: "ViewPoint", label: "Xem điểm rèn luyện" },
        ],
        ASSISTANT: [
            { screen: "StatsFaculty", label: "Xem thống kê" },
            { screen: "AddExtractActivity", label: "Đăng ký hoạt động" },
            { screen: "StudentList", label: "Danh sách sinh viên" },
            { screen: "FacultyList", label: "Danh sách báo thiếu ĐRL" },
        ],
        ADVISOR: [
            { screen: "StatsFaculty", label: "Xem thống kê" },
            { screen: "AddExtractActivity", label: "Đăng ký hoạt động" },
            { screen: "ManagerUser", label: "Quản lý User" },
            { screen: "StudentList", label: "Danh sách sinh viên" },
            { screen: "FacultyList", label: "Danh sách báo thiếu ĐRL" },
        ],
    };

    const renderButtons = (buttons) => (
        <View style={styles.container}>
            {buttons.map(({ screen, label }) => (
                <TouchableOpacity
                    key={screen}
                    style={styles.button}
                    onPress={() => navigation.navigate("Tool", { screen })}
                >
                    <Text style={styles.buttonText}>{label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    return roleButtons[user.role] ? renderButtons(roleButtons[user.role]) : (
        <View>
            <Text>Hello</Text>
        </View>
    );
};

export default Feature;
