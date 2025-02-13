import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginScreen from "./components/Login/Login.js";
import Logout from './components/Login/logout.js';
import SignupScreen from "./components/Signup/Signup";
import React, { useReducer } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import VerifyOTP from "./components/Signup/auth";
import HomeScreen from "./components/Home/Home";
import DetailActivity from "./components/Home/DetailActivity";
import MyUserReducer from "./reducers/MyUserReducer";
import MyContext from "./configs/MyContext";
import Feature from './components/Feature/Feature.js';
import ListRegister from './components/Student/ListRegister.js';
import ViewPoint from './components/Student/ViewPoint.js';
import Missing from './components/Student/Missing.js';
import StatsFaculty from './components/Stats/StatsFaculty.js';
import ProfileUser from './components/User/ProfileUser.js';
import ExtractActivity from "./components/Assistant/ExtractActivity";
import AddExtractActivity from "./components/Assistant/ExtractActivity";
import AddDetailActivity from "./components/Assistant/AddDetailActivity";
import FacultyList from './components/MissingList/FacultyList.js';
import MissingList from './components/MissingList/MissingList.js';
import StudentList from './components/StudentList/StudentList.js';
import StudentDetail from './components/StudentList/StudentDetail.js';
import MissingStudent from './components/StudentList/MissingStudent.js';
import ViewPointStudent from './components/StudentList/ViewPointStudent.js';
import ManagerUser from "./components/Advisor/ManagerUser";
import ConfirmStudent from './components/Assistant/ConfirmStudent.js';
import ActivityConfirm from './components/Assistant/ActivityConfirm.js';
import Chat from './components/Chat/Chat.js';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = ({ user }) => (
    <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown:false }} />
        <Stack.Screen name="DetailActivity" component={DetailActivity} options={{ title: "Chi tiết hoạt động" }} />
        <Stack.Screen name="AddDetailActivity" component={AddDetailActivity} options={{title:"Thêm chi tiết hoạt động"}}/>
        <Stack.Screen name="Missing" component={Missing} options={{title: "Báo thiếu hoạt động"}}/>
        <Stack.Screen name="Chat" component={Chat} options={{title: "Chat Community"}}/>
    </Stack.Navigator>
);
const Tool = () => (
    <Stack.Navigator>
        <Stack.Screen name="Feature"  component={Feature} />
        <Stack.Screen name="ListRegister" component={ListRegister}/>
        <Stack.Screen name="ViewPoint" component={ViewPoint} options={{title:"Xem điểm rèn luyện"}} />
        <Stack.Screen name="Missing" component={Missing} options={{title: "Báo thiếu hoạt động"}}/>
        <Stack.Screen name="StatsFaculty" component={StatsFaculty} options={{title: "Xem thống kê", headerShown:false}} />
        <Stack.Screen name="DetailActivity" component={DetailActivity} options={{ title: "Chi tiết hoạt động" }} />
        <Stack.Screen name="AddDetailActivity" component={AddDetailActivity} options={{title:"Thêm chi tiết hoạt động"}}/>
        <Stack.Screen name="AddExtractActivity" component={AddExtractActivity} options={{headerShown:false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home'}} />
        <Stack.Screen name="FacultyList" component={FacultyList} options={{ tittle: 'Danh sách báo thiếu' }} />
        <Stack.Screen name="MissingList" component={MissingList} options={{ tittle: 'Danh sách báo thiếu theo khoa' }} />
        <Stack.Screen name="StudentList" component={StudentList} options={{ tittle: 'Danh sách sinh viên' }} />
        <Stack.Screen name="StudentDetail" component={StudentDetail} options={{ tittle: 'Hồ sơ sinh viên' }} />
        <Stack.Screen name="MissingStudent" component={MissingStudent} options={{ tittle: 'Danh sách báo thiếu sinh viên' }} />
        <Stack.Screen name="ViewPointStudent" component={ViewPointStudent} options={{ tittle: 'Thành tích sinh viên' }} />
        <Stack.Screen name="ManagerUser" component={ManagerUser} options={{title:"Quản lý User"}}/>
        <Stack.Screen name="ActivityConfirm" component={ActivityConfirm} options={{ tittle: 'Điểm danh sinh viên tham gia' }} />
        <Stack.Screen name="ConfirmStudent" component={ConfirmStudent} options={{ tittle: 'Điểm danh sinh viên tham gia' }} />
        <Stack.Screen name="Chat" component={Chat} options={{title: "Chat Community"}}/>
    </Stack.Navigator>
);

export default function App() {
    const [user, dispatch] = useReducer(MyUserReducer, null);


    return (
        <MyContext.Provider value={[user, dispatch]}>
            <NavigationContainer>
                {user === null ? (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="LoginScreen"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="SignupScreen" component={SignupScreen} />
                    </Stack.Navigator>
                ) : (
                    <Drawer.Navigator>
                        {/* Truyền user vào HomeStack */}
                        <Drawer.Screen
                            name="HomeStack"
                            options={{ title: "Trang chủ" }}
                        >
                            {() => <HomeStack user={user} />}
                        </Drawer.Screen>
                        <Drawer.Screen name="ProfileUser" component={ProfileUser} options={{ title:"Hồ sơ" }}  />
                        <Drawer.Screen name="Tool" component={Tool} options={{ title:"Chức năng" }}  />
                        <Drawer.Screen name="Logout" component={Logout} />
                    </Drawer.Navigator>
                )}
            </NavigationContainer>
        </MyContext.Provider>
    );
}
