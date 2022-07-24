import React from "react";
import { Button } from "@mui/material";
import styles from "./Login.module.css";
import { auth, provider } from "../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import getUser from "../redux/actions/actions";

const Login = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);
        dispatch(getUser(result.user));
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className={styles.login}>
      <div className={styles.login__container}>
        <img
          src="https://icons.veryicon.com/png/System/The%20Circle/App%20Messages.png"
          alt=""
        />
        <h1>Login to Continue</h1>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={signIn}
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
