import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useSelector from "../hooks/useSelector";
import Loading from "./Loading";

import { LocationsType, Other } from "../redux/bussiness";

function Index() {
  const {
    loadingReducer: { isLoading, loadingForLocation },
  } = useSelector();

  return (
    <>
      <Grid sx={{ position: "relative" }}>
      
        {isLoading &&
          loadingForLocation != Other.ScenarioClick &&
          loadingForLocation != Other.ChangeNumber && <Loading />}
      </Grid>
    </>
  );
}

export default Index;
