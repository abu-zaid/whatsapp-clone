import React, { useState, useEffect, useContext } from "react";
import styles from "./SidebarChat.module.css";
import { Avatar } from "@mui/material";
import db from "../configs/firebase";
import { Link } from "react-router-dom";
import DarkThemeContext from "../context/DarkThemeContext";

const SidebarChat = ({ id, name, chatName }) => {
  const [seed, setSeed] = useState("");
  const { darkTheme, setDarkTheme } = useContext(DarkThemeContext);

  const linkColor = darkTheme ? "white" : "grey";
  const [lastMessage, setLastMessage] = useState([]);
  useEffect(() => {
    if (id) {
      db.collection("users")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setLastMessage(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  return (
    <Link
      to={`/rooms/${id}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <div
        className={`${styles.sidebarChat} ${
          darkTheme && styles.sidebarChatDark
        }`}
      >
        <div
          className={`${styles.sidebarChat__items} ${
            darkTheme && styles.sidebarChat__itemsDark
          }`}
        >
          <Avatar
            src={`https://avatars.dicebear.com/api/miniavs/${seed}.svg?scale=90`}
          ></Avatar>
          <div
            className={`${styles.sidebarChat__items_user} ${
              darkTheme && styles.sidebarChat__items_userDark
            }`}
          >
            <h4>{name}</h4>
            <p>{lastMessage[0]?.message}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
