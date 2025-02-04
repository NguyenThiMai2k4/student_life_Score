import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 16,
    },
    profileCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        
    },
    avatarContainer: {
        alignItems: "center",
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: "#007AFF",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginTop: 10,
    },
    email: {
        fontSize: 16,
        color: "#666",
        marginBottom: 10,
    },
    role: {
        fontSize: 14,
        color: "#fff",
        backgroundColor: "#007AFF",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 15,
        textTransform: "uppercase",
        fontWeight: "bold",
        overflow: "hidden",
    },
    infoSection: {
        marginTop: 20,
        width: "100%",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    infoValue: {
        fontSize: 16,
        color: "#333",
    },
    editButton: {
        marginTop: 20,
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#007AFF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
