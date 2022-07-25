import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Chat from "./components/Chat";
import { useNavigate } from "react-router-dom";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import DarkThemeContext from "./context/DarkThemeContext";

function App() {
  const [isDesktop, setDesktop] = useState(window.innerWidth > 650);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
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
              {isDesktop ? (
                <>
                  {" "}
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
                </>
              ) : (
                <>
                  {" "}
                  <Routes>
                    <Route path="/" element={<Sidebar />} />
                    <Route
                      path="/rooms/:roomId"
                      element={
                        <>
                          <Chat />
                        </>
                      }
                    />
                  </Routes>
                </>
              )}
            </div>
          )}
        </div>
      </Router>
    </DarkThemeContext.Provider>
  );
}

export default App;
