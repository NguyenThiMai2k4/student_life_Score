const MyUserReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            // Lưu thông tin người dùng và token
            return {
                ...action.payload.user,  // Thông tin người dùng
                token: action.payload.token,  // Token
            };
        case "logout":
            return null;  // Xoá trạng thái khi logout
        default:
            return currentState;
    }
};
export default MyUserReducer;