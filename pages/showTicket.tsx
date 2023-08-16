import React, { useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  EnumDevices,
  EnumPriority,
  EnumStatus,
  EnumUnit,
  Menu,
  Other,
  SagaUserAction,
} from "../redux/bussiness";
import useLanguage, { Language } from "../hooks/useLanguage";
import "react-calendar-datetime-picker/dist/index.css";
import { Grid, MenuItem, Paper, Select, Snackbar } from "@mui/material";
import {
  EnNumToPe,
  PersianDateToGeo,
  getPersianIDayFormat,
} from "../bussiness";
import Pagination from "@mui/material/Pagination";
import moment from "jalali-moment";
import Layout from "../components/layout";
import Button from "../components/Button";
import CheckBox from "../components/CheckBox";
import { DatePicker } from "../components/Datepicker";
import useSelector from "../hooks/useSelector";
import badgeStyle from "../sass/Badge.module.scss";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import DialogComp from "../components/Dialog";
import TicketDetail from "./_ShowTicketDetail";
import { useRouter } from "next/router";
import { resetTicket } from "../redux/reducers";

function ShowTicket() {
  const [message, setMessage] = useState<string | undefined>("");
  const startDecade = "2020-01-01";
  const endDecade = "2030-01-01";
  const [isStartDate, setIsStartDate] = useState(false);
  const [priority, setPriority] = useState<EnumPriority | undefined>(
    EnumPriority.all
  );
  const [unit, setUnit] = useState<EnumUnit | undefined>(EnumUnit.All);
  const [status, setStatus] = useState<EnumStatus | undefined>(EnumStatus.All);
  const router = useRouter();

  const [startDate, setStartDate] = React.useState<string | undefined>();
  const [endDate, setEndDate] = React.useState<string | undefined>();
  const [ticketId, setTicketId] = useState<string | undefined>();

  var persianStartDate = moment().startOf("jMonth").format("jYYYY/jM/jD");
  var persianEndDate = moment().format("jYYYY/jM/jD");

  let register_Splitted_Start_Date = getPersianIDayFormat({
    date: persianStartDate,
  });
  let register_Splitted_End_Date = getPersianIDayFormat({
    date: persianEndDate,
  });
  const dispatch = useDispatch();
  const {
    ticketReducer: { tickets },
    loadingReducer: { isLoading, loadingForLocation },
  } = useSelector();
  const [ticketNumber, setTicketNumber] = useState<string>();

  const pageSize = 10;
  const page = useRef(1);
  let indexCounter = (page.current - 1) * pageSize + 1;

  //configuration
  const language = Language();
  let {
    showTicket,
    showTicket: { detail },
  } = useLanguage();

  const handleChangePage = (_: any | undefined, pageNumber: number = 1) => {
    page.current = pageNumber;
    fetchData(pageNumber);
  };

  const fetchData = (pageNumber: number = 1, isExcel: boolean = false) => {
    dispatch({
      type: SagaUserAction.GET_TICKETS,
      payload: {
        unit,
        status,
        pageSize,
        priority,
        pageNumber,
        startDate: isStartDate ? startDate : startDecade,
        endDate: isStartDate ? endDate : endDecade,
        customerId: "00000000-0000-0000-0000-000000000000",
        isExcel: isExcel,
        ticketNumber,
      },
    });
  };

  useEffect(() => {
    return () => {
      dispatch(resetTicket());
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.query.customerId && dispatch) {
      let customerId = router.query.customerId;
      dispatch({
        type: SagaUserAction.GET_TICKETS,
        payload: {
          ticketNumber: ticketNumber ?? "",
          unit: EnumUnit.All,
          status: EnumStatus.All,
          priority,
          pageSize,
          pageNumber: 1,
          startDate: startDecade,
          endDate: endDecade,
          customerId,
          isExcel: false,
        },
      });
    } else if (router?.query?.status && dispatch) {
      setStatus(+router?.query?.status);
      dispatch({
        type: SagaUserAction.GET_TICKETS,
        payload: {
          ticketNumber: ticketNumber ?? "",
          unit: EnumUnit.All,
          status: +router?.query?.status,
          priority: EnumPriority.all,
          pageSize,
          pageNumber: 1,
          startDate: startDecade,
          endDate: endDecade,
          isExcel: false,
          customerId: "00000000-0000-0000-0000-000000000000",
        },
      });
    }
  }, [router]);

  return (
    <>
      {ticketId && (
        <DialogComp
          applyCallback={() => {}}
          cancle=""
          cancleCallback={() => {
            setTicketId(undefined);
          }}
          remove=""
          chatFixHeigh
          title={detail.header.title}
        >
          <TicketDetail
            ticketId={ticketId}
            closeModal={() => {
              setTicketId(undefined);
            }}
          />
        </DialogComp>
      )}
      <Layout activeMenu={Menu.MenuShowTicket}>
        <Grid container style={{ paddingLeft: "35px" }} spacing={1} mt={4}>
          <Grid item md={2} sm={3} xs={4} className="text-center flex-left">
            <CheckBox
              callback={() => {
                setIsStartDate((state) => !state);
              }}
              checked={isStartDate}
            />
            <span style={{ marginRight: "10px" }}>{showTicket.startDate}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <DatePicker
              isDisabled={!isStartDate}
              callback={(e) => setStartDate(PersianDateToGeo(e))}
              local="fa"
              placeHolder={showTicket.startDate}
              init={{
                day: register_Splitted_Start_Date.day,
                month: register_Splitted_Start_Date.month,
                year: register_Splitted_Start_Date.year,
              }}
            />
          </Grid>

          <Grid
            item
            md={2}
            sm={3}
            xs={4}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{showTicket.endDate}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <DatePicker
              isDisabled={!isStartDate}
              callback={(e) => setEndDate(PersianDateToGeo(e, true))}
              local="fa"
              placeHolder={showTicket.endDate}
              init={{
                day: register_Splitted_End_Date.day,
                month: register_Splitted_End_Date.month,
                year: register_Splitted_End_Date.year,
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", marginTop: "5px", paddingLeft: "40px" }}
        >
          <Grid
            item
            md={2}
            xs={4}
            sm={3}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{showTicket.unit.title}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              defaultValue={EnumUnit.Sales}
              size="small"
              sx={{ width: "100%" }}
              style={{ background: "white", outline: "none", border: "none" }}
              label="Age"
              onChange={(e: any) => {
                setUnit(e?.target.value);
              }}
            >
              <MenuItem value={EnumUnit.All}>{showTicket.unit.all}</MenuItem>
              <MenuItem value={EnumUnit.Financial}>
                {showTicket.unit.financial}
              </MenuItem>
              <MenuItem value={EnumUnit.Sales}>
                {showTicket.unit.sales}
              </MenuItem>
              <MenuItem value={EnumUnit.Technical}>
                {showTicket.unit.technical}
              </MenuItem>
            </Select>
          </Grid>
          <Grid
            item
            md={2}
            xs={4}
            sm={3}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{showTicket.priority.title}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={priority}
              defaultValue={EnumPriority.all}
              size="small"
              sx={{ width: "100%" }}
              style={{ background: "white", outline: "none", border: "none" }}
              label="Age"
              onChange={(e: any) => {
                setPriority(e?.target.value);
              }}
            >
              <MenuItem value={EnumPriority.all}>
                {showTicket.priority.all}
              </MenuItem>
              <MenuItem value={EnumPriority.low}>
                {showTicket.priority.low}
              </MenuItem>
              <MenuItem value={EnumPriority.medium}>
                {showTicket.priority.medium}
              </MenuItem>
              <MenuItem value={EnumPriority.high}>
                {showTicket.priority.high}
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", marginTop: "5px", paddingLeft: "40px" }}
        >
          <Grid
            item
            md={2}
            xs={4}
            sm={3}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{showTicket.ticketNumber}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <input
              onChange={(event) => {
                setTicketNumber(event.currentTarget.value);
              }}
              dir="ltr"
              type="text"
              style={{ width: "100%", paddingRight: "10px" }}
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={4}
            sm={3}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{showTicket.status.title}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              defaultValue={EnumStatus.All}
              size="small"
              sx={{ width: "100%" }}
              style={{ background: "white", outline: "none", border: "none" }}
              label="Age"
              onChange={(e: any) => {
                setStatus(e?.target.value);
              }}
            >
              <MenuItem value={EnumStatus.All}>
                {showTicket.status.all}
              </MenuItem>
              <MenuItem value={EnumStatus.Waiting}>
                {showTicket.status.waiting}
              </MenuItem>
              <MenuItem value={EnumStatus.Pending}>
                {showTicket.status.pending}
              </MenuItem>
              <MenuItem value={EnumStatus.InProgress}>
                {showTicket.status.inProgress}
              </MenuItem>
              <MenuItem value={EnumStatus.Waiting_For_Customer}>
                {showTicket.status.waitingForCustomer}
              </MenuItem>
              <MenuItem value={EnumStatus.Closed}>
                {showTicket.status.closed}
              </MenuItem>
              <MenuItem value={EnumStatus.Open_Tickets}>
                {showTicket.status.openTickets}
              </MenuItem>
              <MenuItem value={EnumStatus.Last_Response_By_Customer}>
                {showTicket.status.lastResponseByCustomer}
              </MenuItem>
              <MenuItem value={EnumStatus.Have_Unread_Responses}>
                {showTicket.status.haveUnreadResponses}
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", marginTop: "5px", paddingLeft: "40px" }}
        >
          <Grid
            item
            md={2}
            xs={4}
            sm={3}
            className="text-center"
            style={{ textAlign: "left" }}
          ></Grid>
          <Grid item md={2} sm={3} xs={6}>
            <Button
              color="success"
              fullWidth={true}
              isLoading={false}
              callback={() => {
                fetchData();
              }}
              text={showTicket.button}
            />
          </Grid>
          <Grid
            item
            md={2}
            xs={4}
            sm={3}
            className="text-center"
            style={{ textAlign: "left" }}
          ></Grid>
          <Grid item md={2} sm={3} xs={6}>
            <Button
              fullWidth={true}
              isLoading={false}
              callback={() => {
                fetchData(page.current, true);
              }}
              text={showTicket.excelButton}
              color="inherit"
            />
          </Grid>
        </Grid>
        <div dir={language == "en" ? "ltr" : "rtl"}>
          {
            <Snackbar
              color="#0000FF"
              open={message && message.length > 0 ? true : false}
              autoHideDuration={3000}
              onClose={() => {
                setMessage(undefined);
              }}
              message={message}
            />
          }

          {tickets!.data.length > 0 && (
            <>
              <TableContainer
                component={Paper}
                className="tableContainer"
                style={{
                  marginTop: "20px",
                  maxHeight: "100vh",
                  overflow: "auto",
                  boxShadow: "none",
                }}
              >
                <Table aria-label="customized table">
                  <thead>
                    <TableRow>
                      <StyledTableCell align="center">
                        {showTicket.table.rowNo}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {showTicket.table.ticketNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {showTicket.table.title}
                      </StyledTableCell>
                      <StyledTableCell align="center" className="hidden">
                        {showTicket.table.startTime}
                      </StyledTableCell>
                      <StyledTableCell align="center" className="hidden">
                        {showTicket.table.priority}
                      </StyledTableCell>
                      <StyledTableCell align="center" className="hidden">
                        {showTicket.table.lastResponseTime}
                      </StyledTableCell>
                      <StyledTableCell align="center" className="hidden">
                        {showTicket.table.status}
                      </StyledTableCell>
                      <StyledTableCell align="center" className="hidden">
                        {showTicket.table.unit}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {showTicket.table.show}
                      </StyledTableCell>
                    </TableRow>
                  </thead>
                  <TableBody>
                    {tickets.data?.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="center">
                          {EnNumToPe(indexCounter++)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {EnNumToPe(row.ticketNumber)}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.title}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          dir="ltr"
                          className="hidden"
                        >
                          {EnNumToPe(row.startTime)}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="hidden">
                          {row.priority}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          dir="ltr"
                          className="hidden"
                        >
                          {EnNumToPe(row.lastTime)}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="hidden">
                          {row.statusName}
                        </StyledTableCell>
                        <StyledTableCell align="center" className="hidden">
                          {row.unit}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            setTicketId(row.ticketId);
                          }}
                        >
                          <div style={{ position: "relative", width: "40px" }}>
                            {<ChatBubbleOutlineIcon />}
                            {row.notReadedResponse > 0 ? (
                              <span className={badgeStyle.badge}>
                                {EnNumToPe(row.notReadedResponse)}
                              </span>
                            ) : null}
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Pagination
                style={{ display: "flex", justifyContent: "center" }}
                sx={{ mt: 2 }}
                count={Math.ceil(tickets.allResults / pageSize)}
                page={page.current}
                onChange={handleChangePage}
                dir="ltr"
              />
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

export default ShowTicket;

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
