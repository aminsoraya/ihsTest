import React, { useContext, useEffect, useState } from "react";
import { Card, TextField, Grid, Snackbar } from "@mui/material";
import styles from "../sass/Login.module.scss";
import {
  HandlInitialReducer,
  FormState,
  StatusCode,
  IToken,
} from "../bussiness/Login";
import { DispatchApi } from "../api";
import Button from "../components/Button";
import { Languages, fa_Pages, en_Pages } from "../bussiness/language";
import { LangContext } from "../context/language";
import Router from "next/router";
import { ControlKey } from "../bussiness";
import { useDispatch } from "react-redux";
import { Other, SagaLoginAction } from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import jwtDecode from "jwt-decode";

const style: React.CSSProperties = {
  display: "flex",
  textAlign: "center",
  justifyContent: "center",
  position: "relative",
  alignItems: "center",
};

function Login() {
  const {
    resultReducer,
    loadingReducer: { isLoading },
  } = useSelector();
  const dispatch = useDispatch();
  const [mobile, setMobile] = React.useState("");
  const [message, setMessage] = useState<string | undefined>();
  const [typing, setTyping] = React.useState(false);

  //get and set language from localstorage
  let { language, setLanguage } = useContext(LangContext);

  //for get language and token from localstorage
  let mounted = true;
  React.useEffect(() => {
    let storageLang = window.localStorage.getItem("lang");

    //Language
    if (storageLang) {
      let lang = storageLang == "en" ? Languages.en : Languages.fa;
      mounted && setLanguage(lang);
    }

    return () => {
      mounted = false;
    };
  }, []);

  //for set language to local storage
  React.useEffect(() => {
    window.localStorage.setItem("lang", language.toString());
  }, [language]);

  const [userNameField, setUsernameFiled] = useState<string | undefined>(
   // "sajjad"
  );
  const [passwordField, setPasswordFiled] = useState<string | undefined>(
  //  "2431"
  );

  const submitForm = () => {
    dispatch({
      type: SagaLoginAction.LOGIN,
      payload: { userNameField, passwordField },
    });
  };

  useEffect(() => {
    if (resultReducer.type == Other.Login)
      if (resultReducer.httpStatus == StatusCode.Success) {
        let { token, refreshToken, userId } = resultReducer.data as IToken;

        localStorage.setItem(
          "token",
          JSON.stringify({ refreshToken, token, userId })
        );
        Router.push({
          pathname: "/",
        });
      } else setMessage(resultReducer.message);
  }, [resultReducer]);

  useEffect(() => {
    if (localStorage.getItem("token")) Router.push("/login");
  }, [Router]);

  //extract label for controls
  let { title, userName, password, button } =
    language == Languages.fa ? fa_Pages.login : en_Pages.login;
  return (
    <>
      {
        <Snackbar
          color="#0000FF"
          open={message && message.length > 0 ? true : false}
          autoHideDuration={3000}
          onClose={() => {
            setMessage(undefined);
          }}
          message={message}
        />
      }
      <Card className={styles.card}>
        <div
          style={style}
          onClick={() => {
            language == Languages.fa
              ? setLanguage(Languages.en)
              : setLanguage(Languages.fa);
          }}
        >
          <img
            src={`/${language == Languages.fa ? "iran" : "british"}.png`}
            alt=""
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "0",
              height: "35px",
            }}
          />
          <h3>{title}</h3>
        </div>

        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <input
              onChange={(event) => setUsernameFiled(event.target.value)}
              autoComplete="false"
              type="text"
              value={userNameField}
              style={{
                textAlign: "left",
                paddingLeft: "10px",
                width: "100%",
                height: "55px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              value={passwordField}
              onChange={(event) => setPasswordFiled(event.target.value)}
              type="password"
              style={{
                textAlign: "left",
                paddingLeft: "10px",
                width: "100%",
                height: "55px",
              }}
            />
          </Grid>
          <Grid item xs={12} sx={{ mb: 4, mt: 2 }}>
            <Button
              isLoading={isLoading}
              style={{ height: "50px" }}
              text={button}
              callback={() => submitForm()}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
export default Login;
