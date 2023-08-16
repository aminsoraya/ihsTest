import React, { useState, useMemo } from "react";
import useSelector from "../hooks/useSelector";
import styles from "../../sass/RightMenu.module.scss";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import useDispatch from "../hooks/useDispatch";
import SettingsIcon from "@mui/icons-material/Settings";
import useLanguage from "../hooks/useLanguage";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CottageIcon from "@mui/icons-material/Cottage";
import {
  ILocationOfForm,
  LocationsType,
  Menu,
  Tab,
} from "../redux/bussiness";
import Enumerable from "linq";

function MenuForHome() {
  const {
    locationReducer: { currentTab },
  } = useSelector();

  let {
    home_small: {
      homeMenu: { homeSetting, roomSetting, editScreen, homeSettings },
      homeMenu,
    },
  } = useLanguage();

  const RoomClick = ({ roomId }: { roomId: string }) => {
    if (roomId) {
      localStorage.setItem("currentRoomId", roomId);
    }
  };

  return (
    <div style={{ paddingRight: "5px", paddingLeft: "12px" }}>
      <div className={styles.card} style={{ marginTop: "10px" }}>
        <div className={styles.row} style={{ cursor: "default" }}>
          <h2>{homeMenu.users}</h2>
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: "10px" }}>
        <div className={`${styles.row}  `} style={{ cursor: "default" }}>
          <h2>{homeMenu.search}</h2>
        </div>
      </div>
    </div>
  );
}

export default MenuForHome;
