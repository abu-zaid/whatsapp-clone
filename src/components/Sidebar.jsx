import React, { useState, useEffect, useContext } from "react";
import styles from "./Sidebar.module.css";
import SidebarChat from "./SidebarChat";
import IconButton from "@mui/material/IconButton";

import { Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import db from "../configs/firebase";
import DarkThemeContext from "../context/DarkThemeContext";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const state = useSelector((state) => state);
  const { darkTheme, setDarkTheme } = useContext(DarkThemeContext);

  const [rooms, setRooms] = useState([]);
  var iconsColor = darkTheme ? "whitesmoke" : "grey";

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const [seed, setSeed] = useState("");
  const [nameOfChat, setNameOfChat] = useState("");
  const [filteredChats, setFilteredChats] = useState("");
  const [searchChats, setSearchChats] = useState("");

  const searchChatsInput = (event) => {
    setSearchChats(event.target.value);
  };

  console.log(searchChats);
  useEffect(() => {
    if(searchChats.trim().length == 0){
      
    }
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  const addNewChat = () => {
    const tempChat = prompt("Please Enter name for Chat!");

    if (tempChat) {
      db.collection("rooms").add({
        name: tempChat,
      });
    }
  };

  return (
    <div className={`${styles.sidebar} ${darkTheme && styles.sidebarDark}`}>
      <div className={styles.sidebar__header}>
        <Avatar src={state.user?.photoURL} />
        <div className={styles.sidebar__header_right}>
          <IconButton
            onClick={() => {
              if (darkTheme) {
                setDarkTheme(false);
              } else {
                setDarkTheme(true);
              }
            }}
          >
            <DarkModeRoundedIcon style={{ color: iconsColor }} />
          </IconButton>
          <IconButton onClick={addNewChat} style={{ color: iconsColor }}>
            <ChatBubbleRoundedIcon />
          </IconButton>
          <IconButton>
            <MoreVertRoundedIcon style={{ color: iconsColor }} />
          </IconButton>
        </div>
      </div>
      <div
        className={`${styles.sidebar__search} ${
          darkTheme && styles.sidebar__searchDark
        }`}
      >
        <SearchIcon style={{ color: iconsColor }} />
        <input
          type="text"
          className="sidebar__input"
          onChange={searchChatsInput}
        />
      </div>
      <div className={styles.sidebar__chats}>
        {rooms.map((room) => (
          <SidebarChat
            chatName={nameOfChat}
            key={room.id}
            id={room.id}
            name={room.data.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
