import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import cellphonesApi from "~/api/cellphonesApi";

import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";
import ListMessage from "./ListMessage";
import TypeMessage from "./TypeMessage";
const cx = classNames.bind(styles);
const URLSOCKET = process.env.REACT_APP_SOCKET

function Chat() {
  let socket;
  const [messages, setMessages] = useState([]);
  console.log('messagesL ', messages);
  const [loading, setLoading] = useState(false);
  const { data: userInfo } = useSelector((state) => state.auth.user);
  const conversation = useSelector((state) => state.chat);
  const { idConversation, nameConversation} = conversation || {};
  useEffect(() => {
    if (!idConversation) return;
    const getAllMessageByConversation = async () => {
      setLoading(true);
      const data  = await cellphonesApi.chatIdConversation(idConversation);
      if(data){
        setLoading(false);
        setMessages(data.messageList);
      }
    };
    getAllMessageByConversation();
  }, [idConversation]);

  useEffect(() => {
    socket = io(URLSOCKET);
    
    socket.emit("admin_join_conversation", idConversation);
    
    socket.on("newMessage", (message) => {
      console.log('message: ', message);
      setMessages([...messages, message]);
    });

    return () => socket.disconnect();
  }, [messages]);

  useEffect(() => {
    const scrollMessage = () => {
      var element = document.querySelector(".GetAdBox");
      element.scrollTop = element.scrollHeight;
    }
      scrollMessage()
  }, [messages])

  const handleFormSubmit = async (message) => {
    const sender = userInfo.name;
    const payload = {
      sender,
      message,
      idConversation,
    };
    const {data} = await cellphonesApi.createChat(payload);
    socket.emit('chat', data);
  };
  return (
      <div className={cx("AdBox", "GetAdBox")}>
        <div className={cx("AdHeader")}>
          <p className={cx("Adname")}>{nameConversation}</p>
        </div>
        {messages ? 
          <ListMessage messages={messages} user={userInfo} loading={loading} />: "" }
        <TypeMessage onSubmit={handleFormSubmit} loading={loading} />
      </div>
  );
}

export default Chat;
