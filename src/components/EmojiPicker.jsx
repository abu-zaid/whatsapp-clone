import React, { useEffect, useState } from "react";
import Picker from "emoji-picker-react";
import styles from "./EmojiPicker.module.css";

const EmojiPicker = ({ setInputMessage, inputMessage }) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  useEffect(() => {
    {
      if (chosenEmoji) {
        setSelectedEmoji(chosenEmoji.emoji);
      }
    }
  }, [chosenEmoji]);

  useEffect(() => {
    setInputMessage((prevState) => [...prevState, selectedEmoji].join(""));
  }, [chosenEmoji]);

  return (
    <div className={styles.emojipicker}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};

export default EmojiPicker;
