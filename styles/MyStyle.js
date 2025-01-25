import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        paddingTop: 20,
    },


    content: {
        flex: 1,
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,

    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A5568',
    },
    input: {
        backgroundColor: '#EDF2F7',
        borderRadius: 6,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDF2F7',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    eyeIcon: {
        padding: 12,
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CBD5E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#4557F8',
        borderColor: '#4557F8',
    },
    rememberText: {
        fontSize: 14,
        color: '#718096',
    },
    forgotPassword: {
        fontSize: 14,
        color: '#4557F8',
    },
    Button: {
      backgroundColor: '#4557F8',
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
    },
    ButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    // signUpContainer: {
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   marginTop: 24,
    // },
    // signUpText: {
    //   fontSize: 14,
    //   color: '#718096',
    // },
    // signUpLink: {
    //   fontSize: 14,
    //   color: '#4557F8',
    //   fontWeight: '600',
    // },
    dividerContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerText: {
        color: '#718096',
    },
    //   socialContainer: {
    //   width: '80%',  // hoặc một giá trị cụ thể như 300
    //   flexDirection: 'row',
    //   justifyContent: 'center',
    //   alignItems: "center",
    //   borderRadius: 6,
    //   borderWidth: 1,
    //   borderColor: '#718096',
    //   shadowColor: '#718096',
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity:1,
    //   shadowRadius: 3.84,
    //   alignSelf: 'center', // để căn giữa container
    //   padding: 10, // thêm padding để nội dung không sát viền
    // },
    icon: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
    imageContainer: {
        borderRadius: 75,
        width: 100,
        height: 100,
        borderColor: "#718096",
        borderWidth: 3,

    },
    image:{
        borderRadius: 75,
        width: '100%',
        height: '100%',
    },
    editButton: {
        backgroundColor: "#9497a6",
        borderRadius: 24,
        padding: 8,
        position: "absolute",
        right: 1,
        bottom: 0.2,
    }

});