import { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import DarkThemeContext from "./context/DarkThemeContext";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const state = useSelector((state) => state);

  return (
    <DarkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <Router>
        <div className={`${styles.app} ${darkTheme && styles.appDark}`}>
          {!state.user ? (
            <Login />
          ) : (
            <div
              className={`${styles.app__body} ${
                darkTheme && styles.app__bodyDark
              }`}
            >
              <Routes>
                <Route path="/" element={<Sidebar />} />
                <Route
                  path="/rooms/:roomId"
                  element={
                    <>
                      <Sidebar />
                      <Chat />
                    </>
                  }
                />
              </Routes>
            </div>
          )}
        </div>
      </Router>
    </DarkThemeContext.Provider>
  );
}

export default App;
