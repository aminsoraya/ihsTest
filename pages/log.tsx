import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { Menu, Other, SagaLogAction } from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import useLanguage from "../hooks/useLanguage";
import "react-calendar-datetime-picker/dist/index.css";
import { Grid, MenuItem, Select } from "@mui/material";
import { PersianDateToGeo, getPersianIDayFormat } from "../bussiness";
import Pagination from "@mui/material/Pagination";
import moment from "jalali-moment";
import Layout from "../components/layout";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { DatePicker } from "../components/Datepicker";

export enum EnumOutput {
  OutputAccordingToDevice = 1,
  OutputAccordingToNode = 2,
}

export default function Log() {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(false);
  const startDecade = "2020-01-01";
  const endDecade = "2030-01-01";

  const page = useRef(1);
  const rowsPerPage = 10;

  //variables
  const [registerStartDate, setRegisterStartDate] = React.useState<
    string | undefined
  >();
  const [registerEndDate, setRegisterEndDate] = React.useState<
    string | undefined
  >();
  const [description, setDescription] = useState<string | undefined>();

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

  const { log } = useLanguage();
  const { logReducer, resultReducer, loadingReducer } = useSelector();

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

  const searchForm = () => {
    dispatch({
      type: SagaLogAction.FETCH,
      payload: {
        registerStartDate: startDate ? registerStartDate : startDecade,
        registerEndDate: startDate ? registerEndDate : endDecade,
        description: description ?? "*",
        pageNumber: 1,
        pageSize,
        isExcel: false,
      },
    });
  };

  const handleChangePage = (event: unknown, pageNumber: number) => {
    page.current = pageNumber;
    dispatch({
      type: SagaLogAction.FETCH,
      payload: {
        registerStartDate: startDate ? registerStartDate : startDecade,
        registerEndDate: endDecade ? registerEndDate : endDecade,
        description: description ?? "*",
        pageNumber: 1,
        pageSize,
        isExcel: false,
      },
    });
  };

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

  return (
    <Layout activeMenu={Menu.MenuLog}>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          item
          lg={2}
          md={2}
          sm={3}
          xs={4}
          className="text-center flex-left relative"
        >
          <CheckBox
            isRounded={false}
            callback={() => {
              setStartDate((state) => !state);
            }}
            checked={startDate}
          />
          <span style={{ marginRight: "10px" }}>{log.startDate}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <DatePicker
            isDisabled={!startDate}
            callback={(e) => setRegisterStartDate(PersianDateToGeo(e))}
            local="fa"
            placeHolder=""
            init={{
              day: register_Splitted_Start_Date.day,
              month: register_Splitted_Start_Date.month,
              year: register_Splitted_Start_Date.year,
            }}
          />
        </Grid>

        <Grid
          item
          lg={1}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <span>{log.endDate}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <DatePicker
            isDisabled={!startDate}
            callback={(e) => setRegisterEndDate(PersianDateToGeo(e, true))}
            local="fa"
            placeHolder=""
            init={{
              day: register_Splitted_End_Date.day,
              month: register_Splitted_End_Date.month,
              year: register_Splitted_End_Date.year,
            }}
          />
        </Grid>
        <Grid
          item
          lg={1}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        >
          <span>{log.description}</span>
        </Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <input
            onChange={(e) => setDescription(e.target.value)}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          lg={1}
          md={2}
          sm={3}
          xs={4}
          className="text-center"
          style={{ textAlign: "left" }}
        ></Grid>
      </Grid>
      <Grid
        container
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item lg={1} md={2} sm={3} xs={4}></Grid>
        <Grid item lg={2} md={2} sm={3} xs={6}>
          <Button
            text={log.searchButton}
            callback={() => searchForm()}
            isLoading={loadingReducer.isLoading}
            color="success"
          />
        </Grid>
      </Grid>
      <Grid
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          justifyContent: "center",
          width: "100%",
          flexDirection: "column",
          marginTop: "20px",
        }}
      >
        {logReducer.allResults == 0 && resultReducer.type == Other.Node ? (
          <TableContainer
            className="tableContainer"
            component={Paper}
            style={{ maxHeight: "400px", overflow: "auto", width: getWidth() }}
          >
            <Table aria-label="customized table">
              <thead>
                <TableRow>
                  <StyledTableCell align="center">{log.rowNo}</StyledTableCell>
                  <StyledTableCell align="center">{log.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {log.description}
                  </StyledTableCell>
                  <StyledTableCell align="center">{log.type}</StyledTableCell>
                </TableRow>
              </thead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center" colSpan={4}>
                    <span>{log.notFound}</span>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        ) : logReducer.logs?.length! > 0 ? (
          <>
            <TableContainer
              className="tableContainer"
              component={Paper}
              style={{ overflow: "auto", width: getWidth() }}
            >
              <Table aria-label="customized table">
                <thead>
                  <TableRow>
                    <StyledTableCell align="center">
                      {log.rowNo}
                    </StyledTableCell>
                    <StyledTableCell align="center">{log.date}</StyledTableCell>
                    <StyledTableCell align="center">
                      {log.description}
                    </StyledTableCell>
                    <StyledTableCell align="center">{log.type}</StyledTableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  {logReducer.logs?.map((row, index) => (
                    <tr key={index}>
                      <StyledTableCell align="center">
                        {indexCounter++}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.type}
                      </StyledTableCell>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              count={Math.ceil(logReducer.allResults / rowsPerPage)}
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
    </Layout>
  );
}
