import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../sass/Dialog.module.scss";
import { Language } from "../hooks/useLanguage";
import { Languages } from "../bussiness/language";

interface IProps {
  children: React.ReactNode;
  remove: string;
  cancle: string;
  cancleCallback: () => void;
  applyCallback: () => void;
  chatFixHeigh?:boolean;
  title?:string
}
function DialogComp(props: IProps) {
  const language = Language();
  return (
    <>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <div style={{display:"flex" }}>
          <div
          style={{cursor:"pointer"}}
            onClick={() => {
              props.cancleCallback();
            }}
          >
            <CloseIcon />
          </div>
          <span style={{position:"absolute",left:"50%",transform:"translateX(-50%)"}}>{props.title}</span>
        </div>
        <div
          className={styles.button} style={{height:props.chatFixHeigh? "calc(100vh - 17rem)":""}}
          dir={language == Languages.fa ? "rtl" : "ltr"}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}

export default DialogComp;
