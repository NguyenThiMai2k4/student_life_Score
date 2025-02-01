import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: "#f4f6f9", // Nền màu sáng hơn
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#007bff",
        textAlign: "center",
        marginBottom: 15,
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    studentName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    totalPoints: {
        fontSize: 18,
        color: "#28a745",
        fontWeight: "bold",
    },
    classification: {
        fontSize: 16,
        fontWeight: "600",
        color: "#dc3545",
    },
    criteriaContainer: {
        marginBottom: 15,
    },
    criteriaTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0056b3",
        marginBottom: 10,
    },
    activityCard: {
        backgroundColor: "#ffffff",
        padding: 10,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 5,
        borderLeftColor: "#007bff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    activityTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#343a40",
    },
    detailText: {
        fontSize: 14,
        color: "#6c757d",
    },
    pointText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#28a745",
    },
    noDataText: {
        textAlign: "center",
        fontSize: 16,
        color: "#6c757d",
    },
    rightContainer: {
        position: "absolute",
        right: 10,
        top: 10,   
        flexDirection: "column", 
        alignItems: "flex-end",  
    },
    statusText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: 5, 
    },
    reportButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    reportButton: {
        backgroundColor: "#ff4444",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default styles;
