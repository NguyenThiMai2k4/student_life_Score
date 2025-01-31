import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
        backgroundColor: "#E8F9FF", 
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    detailButtonText: {
        color: "#2973B2",
        fontWeight: "bold",
        fontSize: 12,
    },
    headerImg: {
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
});
