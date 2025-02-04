import { StyleSheet } from 'react-native';

const MissingListStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E3F2FD',
        padding: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    studentName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 5,
    },
    activityDetail: {
        fontSize: 14,
        color: '#333',
        marginBottom: 3,
    },
    evidence: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
    },
    detailButton: {
        backgroundColor: '#E8F9FF',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginRight: 10,
    },
    detailButtonText: {
        color: '#2973B2',
        fontSize: 14,
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#2973B2', 
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    statusText: {
        color: '#D32F2F', // Lighter red for subtle color
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default MissingListStyle;
