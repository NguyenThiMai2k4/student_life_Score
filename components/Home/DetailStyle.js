import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3E5879", 
    },
    card: {
        backgroundColor: "#ffffff",
        margin:5
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#213555",
        marginBottom: 5,
    },
    detail: {
        fontSize: 18,
        color: "#7f8c8d", 
        marginBottom: 5,
        lineHeight: 20, 
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#F8FAFC",
        padding: 10,
    },
    headerImg: {
        width: "100%",
        height: 200,
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ecf0f1", 
    },
    section: {
        padding: 10,
        backgroundColor: "#ffffff",
        marginVertical: 10,
    },
    registerButton: {
        backgroundColor: '#78B3CE', // Màu nền nút
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    registerButtonText: {
        color: '#fff', // Màu chữ của nút
        fontWeight: 'bold',
    },
    commentContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        backgroundColor: "#ecf0f1",
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContent: {
        flex: 1,
    },
    commentUser: {
        fontWeight: "bold",
        color: "#2c3e50",
    },
    commentText: {
        fontSize: 14,
    },
    commentDate: {
        fontSize: 12,
        color: "#95a5a6",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    submitButton:{
        padding: 10,
        backgroundColor: '#78B3CE', 
        color: '#fff', 
        fontWeight: 'bold',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,

    }
});
