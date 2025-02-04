import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F0F8FF", // Màu xanh nước biển nhạt
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4682B4", // Màu xanh nước biển đậm
        marginVertical: 10,
    },
    itemContainer: {
        backgroundColor: "#FFFFFF", // Nền trắng
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    detailButton: {
        backgroundColor: "#4682B4",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    detailButtonText: {
        color: "#FFF",
        fontWeight: "bold",
    },
});

export default styles;
