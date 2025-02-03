import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f8ff",
        padding: 10,
        flex:1,
    },
    button: {
        backgroundColor: "#2973B2",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 20,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
