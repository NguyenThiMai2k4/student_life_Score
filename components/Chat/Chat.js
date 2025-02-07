import React, { useState, useEffect,  useLayoutEffect, useCallback, useContext } from "react";
import { View, TouchableOpacity, Platform,KeyboardAvoidingView, Text } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, orderBy, query, onSnapshot } from "firebase/firestore";
import { auth, database } from "../../configs/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./colors";
import MyContext from "../../configs/MyContext";


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const [user, dispatch] = useContext(MyContext);
    const img = user?.avatar;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={() => navigation.navigate("HomeScreen")}>
                    <AntDesign name="logout" size={24} color={colors.gray} />
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        const collectionRef = collection(database, "chats");
        const q = query(collectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const { _id, createdAt, text, user } = messages[0];
        
        addDoc(collection(database, "chats"), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    // hiển thị tin nhắn _id bên dưới métmét
    const renderCustomBubble = (props) => {
        return (
            <View>
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: { backgroundColor: "#0084ff" }, 
                        left: { backgroundColor: "#e5e5ea" } 
                    }}
                    textStyle={{
                        right: { color: "#fff" },
                        left: { color: "#000" }
                    }}
                />
                <Text style={{ fontSize: 12, color: "#888", textAlign: props.position === "right" ? "right" : "left", marginHorizontal: 10 }}>
                    {props.currentMessage.user._id}
                </Text>
            </View>
        );
    };

    return (
             <KeyboardAvoidingView
style={{ flex: 1, backgroundColor: "#fff" }}
behavior={Platform.OS === "ios" ? "padding" : "height"}
keyboardVerticalOffset={150}
>
      <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{ backgroundColor: "#fff" }}
          textInputStyle={{ backgroundColor: "#fff", borderRadius: 20 }}
          user={{ _id: auth?.currentUser?.email, avatar: img }}
          renderBubble={renderCustomBubble}
      />
  </KeyboardAvoidingView>
  
    );
};

export default Chat;

