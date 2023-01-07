import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

import TypeMessage from "./Components/TypeMessage/TypeMessage";
import ListMessage from "./Components/ListMessage.js/ListMessage";

import { LineOutlined } from '@ant-design/icons';
import cellphonesApi from "~/api/cellphonesApi";

import classNames from "classnames/bind";
import styles from './AppChat.module.scss';
import { ChatBubble } from "@material-ui/icons";

const cx = classNames.bind(styles);

let socket;

const URLSOCKET = process.env.REACT_APP_SOCKET

function AppChat() {
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([]);
  const [openChat, setOpenChat] = useState(false)
  const { data: userInfo } = useSelector((state) => state.auth.user);
  console.log('messages: ', messages);
  useEffect(() => {
    const getAllMessageByConversation = async () => {
      const data  = await cellphonesApi.chatMessage(userInfo._id)
      if(data){
        setMessages(data.messageList);
      }
    }
    getAllMessageByConversation()
  }, []);

  useEffect(() => {
    socket = io(URLSOCKET);
    socket.emit('join_conversation', userInfo._id);
    //setup response
    socket.on('newMessage', (message) => {
      console.log('looogererer: ', message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  useEffect(() => {
    const scrollMessage = () => {
      var element = document.querySelector(".ListMess");
      element.scrollTop = element.scrollHeight;
    }
    if(openChat){
      scrollMessage()
    }
  })
  const handleChatFormSubmit = async (message) => {
    const sender = userInfo.name;
    //emit create conversation and chat
    if (messages.length === 0) {
      socket.emit('create_conversation', userInfo);
      socket.on('response_room', async (conversation) => {
        const payload = {
          sender,
          message,
          idConversation: conversation._id,
        };
        setIsLoading(true)
        const {data} = await cellphonesApi.createChat(payload);
        setIsLoading(false);
        socket.emit('chat', data);
      });
    } else {
      const idConversation = messages[0].idConversation._id || messages[0].idConversation;
      console.log(idConversation)
      // request save message
      const payload = {
        sender,
        message,
        idConversation,
      };
      setIsLoading(true)
      const {data} = await cellphonesApi.createChat(payload);
      setIsLoading(false);
      socket.emit('chat', data);
    } 
  };

  
  return (
  <section className={cx('wrapper')}>
      { openChat ? null : 
      ( <div className={cx('Widget')} onClick={() => setOpenChat(!openChat)}>
        <ChatBubble />
        <p className={cx('title')}>Chat với nhân viên tư vấn</p>
      </div> )}
      { openChat ? ( 
      <div className={cx('content')}>
        <div className={cx("header")}>
          <span className={cx("name")}>Chat với nhân viên tư vấn</span>
          <span className={cx("minus")} onClick={() => setOpenChat(!openChat)}><LineOutlined /></span>
        </div>
        { messages ? (<ListMessage messages={messages} user={userInfo} />) : null }
        <TypeMessage loading={isLoading} onSubmit={handleChatFormSubmit} />
      </div> ) : null }
  </section>);
}

export default AppChat;
