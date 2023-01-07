import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useCallback, useState } from "react";

import ListConversation from "./ListConversation";
import {
  getAllConversationList,
  showConversation,
  updateIdConversation,
  updateLastMessageConversation,
} from "~/appRedux/actions/chatAction";

import Loading from "~/components/Loading";
import classNames from "classnames/bind";
import styles from "../AdminChat.module.scss";
const cx = classNames.bind(styles);
function Contact() {
  let socket;
  const ENDPOINT = "localhost:5000";
  const dispatch = useDispatch();
  const converList = useSelector((state) => state.chat);
  const { conversationList = [] } = converList || {};
  const [activeItemChat, setActiveItemChat] = useState("");
  useEffect(() => {
    dispatch(getAllConversationList());
  }, []);
  useEffect(() => {
    if (conversationList) {
      setActiveItemChat(conversationList[0]?._id);
      dispatch(updateIdConversation(conversationList[0]));
    }
  }, [conversationList]);

  // useEffect(() => {
  //     console.log('seen conversation')
  //     dispatch(SeenConversation(idConversation))
  // }, [idConversation])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("lastMessage", async (data) => {
      await dispatch(updateLastMessageConversation(data));
      dispatch(getAllConversationList());
    });
    socket.on("show-me", (data) => {
      dispatch(showConversation(data));
    });
    return () => socket.disconnect();
  }, []);

  const handleConversation = useCallback((conversation) => {
    console.log("conversation: click", conversation._id);
    setActiveItemChat(conversation._id);
    dispatch(updateIdConversation(conversation))
  }, []);
  return (
    <div className={cx("Contact")}>
      {conversationList ? (
        <ListConversation
          active={activeItemChat}
          conversationList={conversationList}
          onConversation={handleConversation}
        />
      ) : null}
    </div>
  );
}

export default Contact;
