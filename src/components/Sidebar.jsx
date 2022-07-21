import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__header}></div>
      <div className={styles.sidebar__search}></div>
      <div className={styles.sidebar__chats}></div>
    </div>
  );
};

export default Sidebar;
