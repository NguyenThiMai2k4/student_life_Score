import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
    },
    card: {
        backgroundColor: "#ffffff",
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#213555",
        marginBottom: 20,
        textAlign: 'center',
    },
    detail: {
        fontSize: 16,
        color: "#7f8c8d",
        marginBottom: 10,
    },
    input: {
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlignVertical: "top", // Để văn bản bắt đầu từ trên cùng
        marginBottom: 20,
        fontSize: 16,
    },
    buttonContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    submitButton: {
        backgroundColor: "#3498db", 
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
