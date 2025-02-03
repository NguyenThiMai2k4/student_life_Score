import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding:2,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    statSelectionContainer: {
        flexDirection: "column", 
        alignItems: "center",
    },
    statButton: {
        backgroundColor: "#3b5998",
        borderRadius: 10,
        marginVertical: 5, // Thêm margin để các nút không dính nhau
        width: "80%",
    },
    statButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center", // Đảm bảo chữ căn giữa trong nút
    },
    selectedButton: {
        backgroundColor: "#8b9dc3",
    },
    scrollView: {
        marginTop: 11,
    },
    chartContainer: {
        marginVertical: 11,
    },
    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#3b5998",
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    tableHeaderText: {
        color: "white",
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
        justifyContent: "space-between",
    },
    tableDataText: {
        flex: 1,
        textAlign: "center",
        fontSize: 16,
    },
    loading: {
        marginTop: 50,
    }
});
