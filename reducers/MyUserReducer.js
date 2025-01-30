//trang thai user dang nhap
const MyUserReducer=(currentState, action)=>{
    switch(action.type){
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
    return currentState;
}
export default MyUserReducer;