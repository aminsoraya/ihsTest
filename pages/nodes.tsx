import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Menu, Other, SagaNodeAction } from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import useLanguage from "../hooks/useLanguage";
import "react-calendar-datetime-picker/dist/index.css";
import { Grid } from "@mui/material";
import { PersianDateToGeo, getPersianIDayFormat } from "../bussiness";
import Pagination from "@mui/material/Pagination";
import { IDay } from "react-calendar-datetime-picker/dist/type";
import moment from "jalali-moment";
import Layout from "../components/layout";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { DatePicker } from "../components/Datepicker";

export enum EnumOutput {
  OutputAccordingToDevice = 1,
  OutputAccordingToNode = 2,
}

export default function SearchHome() {
  const dispatch = useDispatch();

  const page = useRef(1);
  const rowsPerPage = 10;

  const [winSize, setWinSize] = useState<number | undefined>();

  useEffect(() => {
    setWinSize(window.innerWidth);
    window.addEventListener("resize", () => {
      setWinSize(innerWidth);
    });
  }, []);

  const getWidth = () => {
    if (winSize! <= 600) return "90vw";
    if (winSize! > 600 && winSize! < 1000) return "90vw";
    if (winSize! > 1000 && winSize! < 1300) return "65vw";
    return "75vw";
  };

  //variables
  const [registerStartDate, setRegisterStartDate] = React.useState<
    string | undefined
  >();
  const [registerEndDate, setRegisterEndDate] = React.useState<
    string | undefined
  >();

  const [expireStartDate, setExpireStartDate] = React.useState<
    string | undefined
  >();
  const [expireEndDate, setExpireEndDate] = React.useState<
    string | undefined
  >();

  const [nodeSerial, setNodeSerial] = React.useState<string | undefined>();
  const [homeSerial, setHomeSerial] = React.useState<string | undefined>();
  const [mobile, setMobile] = React.useState<string | undefined>();
  const [deviceOutput, setDeviceOutput] = useState<EnumOutput | undefined>(
    EnumOutput.OutputAccordingToDevice
  );

  const { nodes } = useLanguage();
  const {
    searchReducer: { search },
    loadingReducer: { isLoading, loadingForLocation },
    nodeReducer,
    resultReducer,
  } = useSelector();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  interface ISearchForm {
    isExcel?: boolean;
  }
  const [enableRegisterDate, setEnableRegisterDate] = useState(false);
  const [enableExpireDate, setEnableExpireDate] = useState(false);
  const startDecade = "2020-01-01";
  const endDecade = "2030-01-01";

  const searchForm = ({ isExcel }: ISearchForm) => {
    dispatch({
      type: SagaNodeAction.FETCH_NODE,
      payload: {
        expireStartDate: enableExpireDate ? expireStartDate : startDecade,
        expireEndDate: enableExpireDate ? expireEndDate : endDecade,
        registerStartDate: enableRegisterDate ? registerStartDate : startDecade,
        registerEndDate: enableRegisterDate ? registerEndDate : endDecade,
        homeSerial,
        nodeSerial,
        mobile,
        pageNumber: 1,
        pageSize,
        deviceOutput,
        isExcel,
      },
    });
  };

  const handleChangePage = (event: unknown, pageNumber: number) => {
    page.current = pageNumber;
    dispatch({
      type: SagaNodeAction.FETCH_NODE,
      payload: {
        expireStartDate: enableExpireDate ? expireStartDate : startDecade,
        expireEndDate: enableExpireDate ? expireEndDate : endDecade,
        registerStartDate: enableRegisterDate ? registerStartDate : startDecade,
        registerEndDate: enableRegisterDate ? registerEndDate : endDecade,
        homeSerial,
        nodeSerial,
        mobile,
        pageNumber: pageNumber,
        pageSize,
        deviceOutput,
        isExcel: false,
      },
    });
  };

  const pageSize = 10;
  let indexCounter = (page.current - 1) * pageSize + 1;

  var persianStartDate = moment().startOf("jMonth").format("jYYYY/jM/jD");
  var persianEndDate = moment().format("jYYYY/jM/jD");

  let register_Splitted_Start_Date = getPersianIDayFormat({
    date: persianStartDate,
  });
  let register_Splitted_End_Date = getPersianIDayFormat({
    date: persianEndDate,
  });

  return (
    <Layout activeMenu={Menu.MenuNodes}>
      <Grid container spacing={2} style={{paddingLeft:"35px"}}  sx={{ mt: 2 }}>
        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center flex-left relative"
        >
          <CheckBox
            callback={() => {
              setEnableRegisterDate((state) => !state);
            }}
            checked={enableRegisterDate}
          />
          <span style={{ marginRight: "10px" }}>{nodes.registerStartDate}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <DatePicker
            isDisabled={!enableRegisterDate}
            callback={(e) => setRegisterStartDate(PersianDateToGeo(e))}
            local="fa"
            placeHolder={nodes.registerStartDate}
            init={{
              day: register_Splitted_Start_Date.day,
              month: register_Splitted_Start_Date.month,
              year: register_Splitted_Start_Date.year,
            }}
          />
        </Grid>

        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        >
          <span>{nodes.registerEndDate}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <DatePicker
            isDisabled={!enableRegisterDate}
            callback={(e) => setRegisterEndDate(PersianDateToGeo(e, true))}
            local="fa"
            placeHolder={nodes.registerEndDate}
            init={{
              day: register_Splitted_End_Date.day,
              month: register_Splitted_End_Date.month,
              year: register_Splitted_End_Date.year,
            }}
          />
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        >
          <span>{nodes.serial}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <input
            style={{ width: "100%", paddingRight: "10px" }}
            dir="ltr"
            onChange={(e) => setNodeSerial(e.currentTarget.value)}
          ></input>
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center flex-left relative"
          
        >
          <CheckBox
            callback={() => setEnableExpireDate((state) => !state)}
            checked={enableExpireDate}
          />
          <span>{nodes.expireStartDate}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <DatePicker
            isDisabled={!enableExpireDate}
            callback={(e) => setExpireStartDate(PersianDateToGeo(e))}
            local="fa"
            placeHolder={nodes.expireStartDate}
            init={{
              day: register_Splitted_Start_Date.day,
              month: register_Splitted_Start_Date.month,
              year: register_Splitted_Start_Date.year - 1,
            }}
          />
        </Grid>

        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        >
          <span>{nodes.expireEndDate}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <DatePicker
            isDisabled={!enableExpireDate}
            callback={(e) => setExpireEndDate(PersianDateToGeo(e, true))}
            local="fa"
            placeHolder={nodes.expireEndDate}
            init={{
              day: register_Splitted_End_Date.day,
              month: register_Splitted_End_Date.month,
              year: register_Splitted_End_Date.year + 5,
            }}
          />
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        >
          <span>{nodes.mobile}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <input
            style={{
              width: "100%",
              textAlign: "left",
              direction: "ltr",
              paddingLeft: "10px",
            }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          ></input>
        </Grid>
        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        >
          <span>{nodes.homeSerial}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <input
            style={{
              width: "100%",
              textAlign: "left",
              direction: "ltr",
              paddingLeft: "10px",
            }}
            value={homeSerial}
            onChange={(e) => setHomeSerial(e.currentTarget.value)}
          ></input>
        </Grid>
      </Grid>
      <Grid container style={{paddingLeft:"35px"}}  spacing={2} sx={{ mt: 2, display: "flex" }}>
        <Grid item lg={2} md={2} sm={3} xs={4}></Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <Button
            isLoading={loadingForLocation != Other.Excel ? isLoading : false}
            callback={() => searchForm({ isExcel: false })}
            text={nodes.searchButton}
            color="success"
          />
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={4}></Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <Button
            fullWidth={true}
            isLoading={loadingForLocation == Other.Excel ? isLoading : false}
            callback={() => searchForm({ isExcel: true })}
            text={nodes.getExcelFile}
            color="inherit"
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            width: "100%",
            flexDirection: "column",
          }}
        >
          {nodeReducer.allResults == 0 && resultReducer.type == Other.Node ? (
            <TableContainer
              className="tableContainer"
              style={{
                maxHeight: "400px",
                overflow: "auto",
                width: getWidth(),
              }}
            >
              <Table aria-label="customized table">
                <thead>
                  <TableRow>
                    <StyledTableCell align="center">
                      {nodes.rowNo}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.homeName}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.homeSerial}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.ownerMobile}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.name}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.typeName}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.nodeSerial}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.nameNumber}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.registerDate}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.guranteeExpireDate}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {nodes.firmware}
                    </StyledTableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" colSpan={11}>
                      <span>{nodes.notFound}</span>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : nodeReducer.nodes?.length! > 0 ? (
            <>
              <TableContainer
                className="tableContainer"
                style={{ overflow: "auto", width: getWidth() }}
              >
                <Table aria-label="customized table">
                  <thead>
                    <TableRow>
                      <StyledTableCell align="center">
                        {nodes.rowNo}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {nodes.homeName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.homeSerial}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.ownerMobile}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.typeName}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{ whiteSpace: "nowrap" }}
                      >
                        {nodes.nodeSerial}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.nameNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.registerDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.guranteeExpireDate}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {nodes.firmware}
                      </StyledTableCell>
                    </TableRow>
                  </thead>
                  <TableBody>
                    {nodeReducer.nodes?.map((row, index) => (
                      <tr key={index}>
                        <StyledTableCell align="center">
                          {indexCounter++}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.homeName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.homeSerial}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.ownerMobile}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.typeName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.nodeSerial}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.nameNumber}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.registerDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.guranteeExpireDate}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.firmware}
                        </StyledTableCell>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                count={Math.ceil(nodeReducer.allResults / rowsPerPage)}
                page={page.current}
                onChange={handleChangePage}
                dir="ltr"
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
