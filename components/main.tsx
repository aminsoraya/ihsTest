import React, { useContext, useState, useEffect } from "react";
import styles from "../sass/Home.module.scss";
import Main from ".";
import useSelctor from "../hooks/useSelector";
import useDispatch from "../hooks/useDispatch";
import { ILocationOfForm, LocationsType, Menu } from "../redux/bussiness";

function Home() {
  const { locationReducer } = useSelctor();
  const { setLocation } = useDispatch();

  useEffect(() => {
    setLocation({
      data: { currentMenu: Menu.MenuSearch } as ILocationOfForm,
      type: LocationsType.Menu,
    });
  }, []);
  return (
    <div className={styles.main} id="main" style={{ background: "whitesmoke" }}>
      <Main />
    </div>
  );
}

export default Home;
