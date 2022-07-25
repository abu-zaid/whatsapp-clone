import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import "firebase/compat/firestore";
import styles from "./Chat.module.css";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MicRoundedIcon from "@mui/icons-material/MicRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import DarkThemeContext from "../context/DarkThemeContext";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import db from "../configs/firebase";
import { color } from "@mui/system";
import { useSelector } from "react-redux";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Chat = () => {
  let navigate = useNavigate();
  const { darkTheme } = useContext(DarkThemeContext);
  const [seed, setSeed] = useState("");
  const state = useSelector((state) => state);

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [roomName, setRoomName] = useState("");
  const { roomId } = useParams();
  var iconsColor = darkTheme ? "whitesmoke" : "grey";

  const sendMessage = (event) => {
    event.preventDefault();
    if (inputMessage.length > 1) {
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: inputMessage,
        id: state.user.uid,
        // name: state.user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInputMessage("");
    }
  };

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 1000));
  }, []);

  return (
    <div className={`${styles.chat} ${darkTheme && styles.chatDark}`}>
      <div
        className={`${styles.chat__header} ${
          darkTheme && styles.chat__headerDark
        }`}
      >
        <IconButton
          className={styles.chat__headerBack}
          onClick={() => navigate(-1)}
        >
          <ChevronLeftIcon style={{ color: iconsColor }} />
        </IconButton>
        <Avatar
          src={`https://avatars.dicebear.com/api/miniavs/${seed}.svg?scale=90`}
        />
        <div
          className={`${styles.chat__header_info} ${
            darkTheme && styles.chat__header_infoDark
          }`}
        >
          <h3>{roomName}</h3>
          <p>
            Last Seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div
          className={`${styles.chat__header_right} ${
            darkTheme && styles.chat__header_rightDark
          }`}
        >
          <IconButton>
            <SearchIcon style={{ color: iconsColor }} />
          </IconButton>
          <IconButton>
            <AttachmentIcon style={{ color: iconsColor }} />
          </IconButton>
          <IconButton>
            <MoreHorizIcon style={{ color: iconsColor }} />
          </IconButton>
        </div>
      </div>
      <div
        className={`${styles.chat__body} ${darkTheme && styles.chat__bodyDark}`}
      >
        {messages.map((message) => (
          <div
            // key={roomId}
            className={`${styles.chat__text} ${
              darkTheme && styles.chat__textDark
            } ${darkTheme && styles.chat__receiverDark} ${
              message.id === state.user.uid && styles.chat__receiver
            }`}
          >
            <>
              {message.id != state.user.uid && (
                <p className={styles.chat__sender}>{message.name}</p>
              )}

              <p className={styles.chat__message}>{message.message}</p>
              <p className={styles.chat__time}>
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </p>
            </>
          </div>
        ))}
      </div>
      <div
        className={`${styles.chat__footer} ${
          darkTheme && styles.chat__footerDark
        }`}
      >
        <IconButton>
          <EmojiEmotionsIcon style={{ color: iconsColor }} />
        </IconButton>
        <form action="">
          <input
            type="text"
            name=""
            id=""
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            placeholder="Send a message..."
          />
          <IconButton type="submit" onClick={sendMessage}>
            <SendRoundedIcon style={{ color: iconsColor }} />
          </IconButton>
        </form>
        <IconButton>
          <MicRoundedIcon style={{ color: iconsColor }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
