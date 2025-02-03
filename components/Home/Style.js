import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,

    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    margin: {
        margin: 5,
    },
    subject: {
        fontSize: 25,
        color: "blue",
        fontWeight: "bold",
    },
    box: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    detailButton: {
        backgroundColor: "#4A90E2", // Xanh nước biển nhẹ
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3, // Thêm bóng đổ
    },
    detailButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    headerImg: {
marginTop: -50,
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
});
