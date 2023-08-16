import React from "react";
import styles from "../sass/Loading.module.scss";
import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className={styles.loading}>
      <CircularProgress disableShrink color="secondary" />
    </div>
  );
}

export default Loading;
