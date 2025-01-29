import {Button} from "react-native";
import {useContext} from "react";
import MyContext from "../../configs/MyContext";

const Logout = ({navigation}) => {
    const [user, dispatch]= useContext(MyContext);
    const logout = ()=>{
        dispatch({
            "type":"logout"
        })
    }
    if(user ===null)
        return <Button title={"Đăng nhập"} onPress={()=>navigation.navigate("LoginScreen")}/>
    return(
        <Button title={"Đăng xuất"} onPress={logout}/>

    )
};
export default Logout;