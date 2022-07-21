import styles from "./App.module.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.app__body}>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
