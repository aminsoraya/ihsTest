import React, { useEffect, useRef, useState } from "react";
import { ILocationOfForm, LocationsType, Menu, Tab } from "../redux/bussiness";
import styles from "../sass/Sidebar.module.scss";
import useLanguage from "../hooks/useLanguage";
import CottageIcon from "@mui/icons-material/Cottage";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface IProps {
  handleClickOutside: () => void;
  onClickExit: () => void;
  activeMenu: Menu;
  windowSize: number;
}
function Sidebar(props: IProps) {
  const { resetNodes, resetHomes, resetLogs, resetUser } = useDispatch();
  const {
    home_large: { index },
  } = useLanguage();
  const activeMenu = useRef<Menu>();
  const {
    locationReducer: { currentTab },
  } = useSelector();
  const wrapperRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        props.handleClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  //handleClick
  const changeMenu=(menu:Menu) => {
    activeMenu.current=menu
    if (menu) {
      switch (activeMenu.current) {
        case Menu.MenuLog:
          resetLogs();
          router.push("/log");
          break;
        case Menu.MenuNodes:
          resetNodes();
          router.push("/nodes");
          break;
        case Menu.MenuSearch:
          router.push("/search");
          break;
        case Menu.MenuSearchHome:
          resetHomes();
          router.push("/home");
          break;
        case Menu.MenuShowUser:
          resetUser();
          router.push("/users");
          break;
        case Menu.MenuShowTicket:
          resetUser();
          router.push("/showTicket");
          break;
        default:
          router.push("/dashboard");
          break;
      }
    }
  }

  const paddingLeft = {
    paddingLeft: "10px",
  };
  return (
    <div
      className={`${styles.sideBar} `}
      style={{
        position: props.windowSize < 600 ? "absolute" : "relative",
        color: "white",
      }}
      ref={wrapperRef}
    >
      <MenuItems
        {...props}
        expectdMenu={Menu.MenuDashboard}
        setActiveMenu={({ menu }) => changeMenu(menu)}
      >
        <DashboardIcon />
        <span style={paddingLeft}>{index.dashboard}</span>
      </MenuItems>

      <MenuItems
        {...props}
        expectdMenu={Menu.MenuShowUser}
        setActiveMenu={({ menu }) => changeMenu(menu)}
      >
        <PersonIcon />
        <span style={paddingLeft}>{index.users}</span>
      </MenuItems>

      <MenuItems
        {...props}
        expectdMenu={Menu.MenuSearchHome}
        setActiveMenu={({ menu }) => changeMenu(menu)}
      >
        <CottageIcon />
        <span style={paddingLeft}>{index.home}</span>
      </MenuItems>
      <MenuItems
        {...props}
        expectdMenu={Menu.MenuSearch}
        setActiveMenu={({ menu }) => changeMenu(menu)}
      >
        <SearchIcon />
        <span style={paddingLeft}>{index.search}</span>
      </MenuItems>
      <MenuItems
        {...props}
        expectdMenu={Menu.MenuNodes}
        setActiveMenu={({ menu }) =>changeMenu(menu)}
      >
        <WidgetsIcon />
        <span style={paddingLeft}>{index.nodes}</span>
      </MenuItems>
      <MenuItems
        {...props}
        expectdMenu={Menu.MenuLog}
        setActiveMenu={({ menu }) => changeMenu(menu)}
      >
        <AssessmentIcon />
        <span style={paddingLeft}>{index.log}</span>
      </MenuItems>

      <MenuItems
        {...props}
        expectdMenu={Menu.MenuShowTicket}
        setActiveMenu={({ menu }) => changeMenu(menu)}
      >
        <SupportAgentIcon />
        <span style={paddingLeft}>{index.showTickets}</span>
      </MenuItems>
      <div
        className={`${styles.row} ${
          activeMenu.current == Menu.MenuExit ? styles.active : ""
        } `}
        onClick={props.onClickExit}
        style={{ width: "fit-content" }}
      >
        <ExitToAppIcon />
        <span style={paddingLeft}>{index.exit}</span>
      </div>
    </div>
  );
}
export default Sidebar;

interface IMenuItem extends IProps {
  setActiveMenu: ({ menu }: { menu: Menu }) => void;
  children: React.ReactNode;
  expectdMenu: Menu;
}

const MenuItems = (props: IMenuItem) => {
  return (
    <div
      className={`${styles.row} ${
        props.activeMenu == props.expectdMenu ? styles.active : ""
      }`}
      onClick={() => props.setActiveMenu({ menu: props.expectdMenu })}
    >
      {props.children}
    </div>
  );
};
