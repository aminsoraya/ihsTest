import React, { FC, useContext, useEffect, useRef, useState } from "react";
import styles from "../sass/Large.module.scss";
import { LangContext } from "../context/language";
import useSelector from "../hooks/useSelector";
import { Menu } from "../redux/bussiness";
import useDispatch from "../hooks/useDispatch";
import useLanguage from "../hooks/useLanguage";
import Sidebar from "../components/sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Router, { useRouter } from "next/router";
import { Languages } from "../bussiness/language";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {CheckToken} from "../hooks/useCheckToken";

interface IProps {
  children: React.ReactNode;
  activeMenu: Menu;
}
const Index: FC<IProps> = ({ children, activeMenu }) => {
  const { setLocation, resetResult } = useDispatch();
  const router = useRouter();
  //menu
  const [showHomeMenu, setShowHomeMenu] = useState<boolean>(false);
  const [showExitAlert, setShowExitAlert] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<number | undefined>();
  let mount = useRef(false);
  useEffect(() => {
    if (mount.current)
      (async () => {
        if ( !CheckToken()) {
          Router.push("/login");
        }
      })();

    setWindowSize(innerWidth);
    window.addEventListener("resize", () => {
      setWindowSize(window.innerWidth);
    });

    return () => {
      mount.current = false;
    };
  }, []);

  const {
    home_large: {
      index: { exitWindowText },
    },
  } = useLanguage();
  //get and set language from localstorage
  let { setLanguage } = useContext(LangContext);
  const {
    locationReducer: { currentTab, currentMenu, currentSubMenu },
    locationReducer,
  } = useSelector();

  //for get language and token from localstorage
  let langMounted = true;
  React.useEffect(() => {
    let storageLang = window.localStorage.getItem("lang");
    let tokenStorage = localStorage.getItem("token");

    if (tokenStorage == null) Router.push("/login");

    //Language;
    if (storageLang) {
      let lang = storageLang == "en" ? Languages.en : Languages.fa;
      langMounted && setLanguage(lang);
    }
    return () => {
      langMounted = false;
    };
  }, []);

  const exitWindow = () => {
    setShowExitAlert(false);
    resetResult();
    localStorage.removeItem("token");
    router.push("/login");
  };

  function ExitDialog({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) {
    return (
      <div>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {exitWindowText.exitWindowTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {exitWindowText.doYouWantToExitWindow}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => exitWindow()}
              autoFocus
              variant="contained"
              color="success"
            >
              {exitWindowText.yes}
            </Button>
            <Button onClick={onClose}>{exitWindowText.no}</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
  return (
    <>
      <ExitDialog
        open={showExitAlert}
        onClose={() => {
          setShowExitAlert(false);
        }}
      />
      <div className={styles.mainSection}>
        <div
          onClick={() => setShowHomeMenu((state) => !state)}
          style={{ position: "absolute", top: 0, right: 10 }}
        >
          <HomeOutlinedIcon
            sx={{
              fontSize: 35,
              mt: 1,
              color: "black",
              zIndex: 100,
            }}
          />
        </div>
        {(!(windowSize! <= 1024) || showHomeMenu) && (
          <Sidebar
            windowSize={windowSize!}
            activeMenu={activeMenu!}
            handleClickOutside={() => setShowHomeMenu(false)}
            onClickExit={() => setShowExitAlert(true)}
          />
        )}
        <div
          style={{
            padding: "20px",
            color: "black",
            width: "100%",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Index;
