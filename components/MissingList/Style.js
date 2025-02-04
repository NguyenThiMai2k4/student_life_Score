import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
        padding: 10,
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
        color: "#2973B2",
        fontWeight: "bold",
    },
    box: {
        width: 80,
        height: 80,
        borderRadius: 10,
        backgroundColor: "#E8F9FF",
    },
    detailButton: {
        backgroundColor: "#2973B2",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    detailButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    headerImg: {
        marginTop: -10,
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    thumb: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    facultyCard: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    facultyText: {
        fontSize: 16,
        fontWeight: "600",
        flex: 1,
        color: "#333",
    },
    rightContainer: {
        position: "absolute",
        right: 10,
        top: 10,   
        flexDirection: "column", 
        alignItems: "flex-end",  
    },
    statusText :{
        color:  "#333",
    },
});