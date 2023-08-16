import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import style from "../sass/Checkbox.module.scss";
import useDispatch from "../hooks/useDispatch";
import useSelector from "../hooks/useSelector";

interface IProps {
  checked: boolean;
  callback: () => void;
  isRounded?: boolean;
}

function CheckBox({ checked = false, callback, isRounded }: IProps) {
  return (
    <div 
    
      className={checked ? style.checked : style.unchecked}
      style={{ cursor: "pointer", borderRadius: isRounded ? "50%" : "none",position:"absolute",left:"8rem" }}
      onClick={() => callback()}
    >
      {checked && <CheckIcon sx={{ color: "white", fontSize: 15 }} />}
    </div>
  );
}

export default CheckBox;
