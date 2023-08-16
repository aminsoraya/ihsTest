import React, { useEffect } from "react";
import useDispatch from "../hooks/useDispatch";

export default function Index() {
  const { resetNodes } = useDispatch();

  useEffect(() => {
    resetNodes();
  }, []);
  return <></>;
}
