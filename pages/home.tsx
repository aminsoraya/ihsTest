import React, { useContext, useEffect, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  IDevice,
  IUserType,
  Menu,
  Other,
  SagaHomeAction,
} from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import useLanguage from "../hooks/useLanguage";
import "react-calendar-datetime-picker/dist/index.css";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { PersianDateToGeo, getPersianIDayFormat } from "../bussiness";
import Dialog from "../components/Dialog";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import Person2Icon from "@mui/icons-material/Person2";
import Pagination from "@mui/material/Pagination";
import moment from "jalali-moment";
import Layout from "../components/layout";
import { DatePicker } from "../components/Datepicker";
import CheckBox from "../components/CheckBox";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditUserModal from "../components/home/editUserModal";
import RemoveUserModal from "../components/home/removeUserModal";
import DeviceModal from "../components/home/deviceModal";
import UserModal from "../components/home/userModal";
import CreateTicketModal from "../components/home/createTicketModal";
import { useRouter } from "next/router";
import { resetTicket } from "../redux/reducers";

export interface IUserDelete {
  homeId: string;
  status: number;
  userId: string;
}
export enum EnumOutput {
  OutputAccordingToDevice = 1,
  OutputAccordingToNode = 2,
}

export default function SearchHome() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isStartDate, setIsStartDate] = useState(false);
  const startDecade = "2020-01-01";
  const endDecade = "2030-01-01";
  const page = useRef(1);
  const rowsPerPage = 10;

  //variables
  const [startDate, setStartDate] = React.useState<string | undefined>();
  const [endDate, setEndDate] = React.useState<string | undefined>();
  const [serial, setSerial] = React.useState<string | undefined>();
  const [mobile, setMobile] = React.useState<string | undefined>();
  const [ticketCustomerId, setTicketCustomerId] = React.useState<
    string | undefined
  >();
  const [deviceOutput, setDeviceOutput] = useState<EnumOutput | undefined>(
    EnumOutput.OutputAccordingToDevice
  );

  const { home } = useLanguage();
  const {
    homesReducer: { homes, allResults },
    loadingReducer: { isLoading },
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
  const searchForm = ({ isExcel }: ISearchForm) => {
    dispatch({
      type: SagaHomeAction.FETCH_HOME,
      payload: {
        startDate: isStartDate ? startDate : startDecade,
        endDate: isStartDate ? endDate : endDecade,
        serial,
        mobile: mobile ?? "",
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
      type: SagaHomeAction.FETCH_HOME,
      payload: {
        startDate: isStartDate ? startDate : startDecade,
        endDate: isStartDate ? endDate : endDecade,
        serial,
        mobile: mobile ?? "",
        pageNumber,
        pageSize,
        deviceOutput,
        isExcel: false,
      },
    });
  };

  const [devicesModal, setDevicesModal] = React.useState<
    IDevice[] | undefined
  >();
  const [userModal, setUsersModal] = React.useState<IUserType[] | undefined>();
  const [homeId, setHomeId] = useState<string | undefined>();

  const pageSize = 10;
  let indexCounter = (page.current - 1) * pageSize + 1;
  const [removeUserModal, setRemoveUserModal] = useState<
    IUserDelete | undefined
  >();
  const [editUserModal, setEditUserModal] = useState<
    (Pick<IUserDelete, "homeId" | "userId"> & { mobile: string }) | undefined
  >();

  useEffect(() => {
    if (
      resultReducer &&
      resultReducer.type == Other.ChangeNumber &&
      resultReducer.httpStatus == 200
    ) {
      let { users } = homes?.find((s) => s.homeId == homeId)!;
      setUsersModal(users);
      setEditUserModal(undefined);
    }
    if (
      resultReducer &&
      resultReducer.type == Other.DeleteUser &&
      resultReducer.httpStatus == 200
    ) {
      let { users } = homes?.find((s) => s.homeId == homeId)!;
      setUsersModal(users);
      setRemoveUserModal(undefined);
    }
  }, [resultReducer]);

  var persianStartDate = moment().startOf("jMonth").format("jYYYY/jM/jD");
  var persianEndDate = moment().format("jYYYY/jM/jD");

  let register_Splitted_Start_Date = getPersianIDayFormat({
    date: persianStartDate,
  });
  let register_Splitted_End_Date = getPersianIDayFormat({
    date: persianEndDate,
  });

  const [winSize, setWinSize] = useState<number | undefined>();

  useEffect(() => {
    setWinSize(window.innerWidth);
    window.addEventListener("resize", () => {
      setWinSize(innerWidth);
    });

    dispatch(resetTicket());
  }, []);

  const getWidth = () => {
    if (winSize! <= 600) return "90vw";
    if (winSize! > 600 && winSize! < 1000) return "90vw";
    if (winSize! > 1000 && winSize! < 1300) return "65vw";
    return "75vw";
  };
  return (
    <Layout activeMenu={Menu.MenuSearchHome}>
      {editUserModal && (
        <EditUserModal
          callback={() => setEditUserModal(undefined)}
          editUserModal={editUserModal}
          editUserModalText={home.editUserModal}
        />
      )}
      {removeUserModal && (
        <RemoveUserModal
          callback={() => setRemoveUserModal(undefined)}
          removeUserModal={removeUserModal}
          removeUserModalText={home.removeUserModal}
        />
      )}
      {devicesModal && (
        <DeviceModal
          callback={() => setDevicesModal(undefined)}
          deviceModal={devicesModal}
          deviceModalText={home.device}
        />
      )}
      {userModal && (
        <UserModal
          userModal={userModal}
          closeModal={() => setUsersModal(undefined)}
          setRemoveUserModal={(item) => {
            setRemoveUserModal({
              homeId: homeId!,
              status: item.status,
              userId: item.userId,
            });
          }}
          setEditUserModal={(item) => {
            setEditUserModal({
              homeId: homeId!,
              mobile: item.mobile,
              userId: item.userId,
            });
          }}
        />
      )}
      {ticketCustomerId && (
        <CreateTicketModal
          customerId={ticketCustomerId}
          closeModal={() => setTicketCustomerId(undefined)}
        />
      )}
      <div>
        <Grid container style={{ paddingLeft: "35px" }} spacing={1} mt={4}>
          <Grid item md={2} sm={3} xs={4} className="text-center flex-left">
            <CheckBox
              callback={() => {
                setIsStartDate((state) => !state);
              }}
              checked={isStartDate}
            />
            <span style={{ marginRight: "10px" }}>{home.startDate}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <DatePicker
              isDisabled={!isStartDate}
              callback={(e) => setStartDate(PersianDateToGeo(e))}
              local="fa"
              placeHolder={home.startDate}
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
            <span>{home.endDate}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <DatePicker
              isDisabled={!isStartDate}
              callback={(e) => setEndDate(PersianDateToGeo(e, true))}
              local="fa"
              placeHolder={home.endDate}
              init={{
                day: register_Splitted_End_Date.day,
                month: register_Splitted_End_Date.month,
                year: register_Splitted_End_Date.year,
              }}
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
            <span>{home.serial}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <input
              style={{ width: "100%", paddingRight: "10px" }}
              onChange={(e) => setSerial(e.currentTarget.value)}
              dir="ltr"
            ></input>
          </Grid>

          <Grid
            item
            md={2}
            sm={3}
            xs={4}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{home.mobile}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
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
            md={2}
            sm={3}
            xs={4}
            className="text-center"
            style={{ textAlign: "left" }}
          >
            <span>{home.deviceOutputType.deviceOutput}</span>
          </Grid>
          <Grid item md={2} sm={3} xs={6}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={deviceOutput}
              defaultValue={EnumOutput.OutputAccordingToDevice}
              size="small"
              sx={{ width: "100%" }}
              style={{ background: "white", outline: "none", border: "none" }}
              label="Age"
              onChange={(e: any) => {
                setDeviceOutput(e?.target.value);
              }}
            >
              <MenuItem value={EnumOutput.OutputAccordingToDevice}>
                {home.deviceOutputType.outputAccordingToDevice}
              </MenuItem>
              <MenuItem value={EnumOutput.OutputAccordingToNode}>
                {home.deviceOutputType.outputAccordingToNode}
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          style={{ display: "flex", marginTop: "5px", paddingLeft: "40px" }}
        >
          <Grid item md={2} sm={3} xs={4}></Grid>
          <Grid item lg={2} md={3} sm={3} xs={6}>
            <Button
              disabled={!startDate || !endDate}
              variant="contained"
              onClick={() => searchForm({ isExcel: false })}
              color="success"
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                home.searchButton
              )}
            </Button>
          </Grid>
          <Grid item md={2} sm={3} xs={4}></Grid>
          <Grid item lg={2} md={3} sm={3} xs={6}>
            <Button
              disabled={!startDate || !endDate}
              variant="outlined"
              color="success"
              onClick={() => searchForm({ isExcel: true })}
            >
              {home.getExcelFile}
            </Button>
          </Grid>
        </Grid>
        <Grid container sx={{ marginTop: 5 }}>
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
            {resultReducer.type == Other.Home && (
              <>
                <TableContainer
                  component={Paper}
                  style={{
                    overflow: "auto",
                    width: getWidth(),
                  }}
                  className="tableContainer"
                >
                  <Table aria-label="customized table">
                    <thead>
                      <TableRow>
                        <StyledTableCell align="center">
                          {home.rowNo}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.mobile}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.dateSubmit}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.serial}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.devices}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.users}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.addNewTicket}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {home.showTickets}
                        </StyledTableCell>
                      </TableRow>
                    </thead>
                    <TableBody>
                      {homes?.length! > 0 ? (
                        homes?.map((row, index) => (
                          <tr key={index}>
                            <StyledTableCell align="center">
                              {indexCounter++}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.ownerMobile}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.date}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {row.serial}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {
                                <div
                                  onClick={() => setDevicesModal(row.devices!)}
                                  style={{
                                    cursor: "pointer",
                                    pointerEvents:
                                      row.devices.length == 0 ? "none" : "all",
                                  }}
                                >
                                  <SettingsRemoteIcon
                                    sx={{
                                      opacity:
                                        row.devices.length == 0 ? "0.3" : "1",
                                    }}
                                  />
                                </div>
                              }
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              <div
                                onClick={() => {
                                  setUsersModal(row.users);
                                  setHomeId(row.homeId);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <Person2Icon />
                              </div>
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              onClick={() => {
                                setTicketCustomerId(
                                  row.users?.find(
                                    (user) => user.userStatus == 1
                                  )?.userId!
                                );
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <SupportAgentIcon />
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              onClick={() =>
                                window.open(
                                  "http://" +
                                    location.host +
                                    "/showTicket?customerId=" +
                                    row.users.find(
                                      (user) => user.userStatus == 1
                                    )?.userId!
                                )
                              }
                            >
                              <div style={{ cursor: "pointer" }}>
                                {" "}
                                <VisibilityIcon />
                              </div>
                            </StyledTableCell>
                          </tr>
                        ))
                      ) : (
                        <StyledTableRow>
                          <StyledTableCell align="center" colSpan={9}>
                            <span>{home.notFound}</span>
                          </StyledTableCell>
                        </StyledTableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  sx={{ mt: 2 }}
                  count={Math.ceil(allResults / rowsPerPage)}
                  page={page.current}
                  onChange={handleChangePage}
                  dir="ltr"
                />
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}
