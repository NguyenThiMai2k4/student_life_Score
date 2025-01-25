import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F7FAFC',
    },

    calenderContainer: {
        width: 150,
        flexDirection: 'row',
        backgroundColor: '#EDF2F7',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    calenderIcon: {
        flex: 1,
        justifyContent: 'center',
        textAlign: "center",
    },
    calendarWrapper: {
        marginTop: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        elevation: 5, // Hiệu ứng bóng trên Android
        shadowColor: '#000', // Hiệu ứng bóng trên iOS
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
});