import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import * as actionCreators from "../redux/actions";

const UseDispatch = () => {
  const dispatch = useDispatch();

  return bindActionCreators(actionCreators.actions, dispatch);
};

export default UseDispatch;
