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
marginTop: -50,
        width: "100%",
        height: 200,
        justifyContent: "center",
        alignItems: "center",
    },
    thumb:{
        width: 40,
        height: 40,
        borderRadius:10,
    },
    chatButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: "#2973B2",
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    }
    
});
