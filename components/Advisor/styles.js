import {StyleSheet} from "react-native";

export default StyleSheet.create({
    searchBar: {
        marginBottom: 10,
    },
    subTitle: {
        justifyContent: "center",
        textAlign: "center",
        color: 'gray',
        fontSize: 17,
    },

    roleContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#007bff",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    editIcon: {
        marginRight: 5
    },
    roleText: {
        color: "white",
        fontSize: 16
    },
    infoSection: {
        marginTop: 15,
        width: "100%",
    },
    container: {
        flex: 1,
        backgroundColor: "#F0F8FF", 
        padding: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4682B4", 
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