import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import {
  Menu,
  SagaSearchAction,
  SagaUserAction,
  TUser,
} from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import RemoveUserModal from "../components/RemoveUserModal";
import AddAdminUserModal, {
  AdminUserStatus,
} from "../components/AddAdminUserModal";
import jwt_decode from "jwt-decode";
import useLanguage from "../hooks/useLanguage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Layout from "../components/layout";
import { Grid } from "@mui/material";

export default function Search() {
  const dispatch = useDispatch();

  const [userId, setUserId] = useState<string | undefined>();
  const [modal, setModal] = React.useState(false);
  const { user } = useLanguage();
  const {
    userReducer: { users },
    locationReducer,
  } = useSelector();

  useEffect(() => {
    let json = JSON.parse(localStorage.getItem("token")!);
    if (json.token) {
      let { Id }: any = jwt_decode(json.token);
      if (Id) {
        setUserId(Id);
      }
    }

    dispatch({ type: SagaUserAction.GET_ADMIN_USER });
  }, [locationReducer]);

  useEffect(() => {
    dispatch({ type: SagaUserAction.GET_ADMIN_USER });
  }, []);

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

  const [currentUser, setCurrentUser] = useState<TUser | undefined>();
  const [currentUserId, setCurrentUserId] = React.useState<
    string | undefined
  >();
  const callBack = ({ isRemove }: { isRemove: boolean }) => {
    if (isRemove) {
      dispatch({
        type: SagaUserAction.REMOVE_USER,
        payload: { currentUserId: currentUserId! },
      });
    }
    setCurrentUserId(undefined);
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
    <Layout activeMenu={Menu.MenuShowUser}>
      {currentUserId && (
        <RemoveUserModal
          callback={(props) => {
            callBack({ isRemove: props.isRemove! });
          }}
        />
      )}
      {(modal || currentUser) && (
        <AddAdminUserModal
          closeModal={() => {
            setModal(false);
            setCurrentUser(undefined);
          }}
          user={currentUser}
        />
      )}
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item md={12}>
          <input
            type="button"
            value={user.addNewUser}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "green",
              color: "white",

              border: "none",
              cursor: "pointer",
              marginTop: "30px",
            }}
            onClick={() => setModal(true)}
          />
        </Grid>

        <Grid item md={12} sx={{ mt: 2 }}>
          {users?.length! > 0 && (
            <TableContainer
              className="tableContainer"
              component={Paper}
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
                      {user.rowNo}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.family}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.userName}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {user.edit}
                    </StyledTableCell>{" "}
                    <StyledTableCell align="center">
                      {user.remove}
                    </StyledTableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  {users.map((row, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.family}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.username}
                      </StyledTableCell>

                      <StyledTableCell align="center">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setCurrentUser(row);
                          }}
                        >
                          <EditIcon />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.userId != userId && (
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setCurrentUserId(row.userId);
                            }}
                          >
                            <DeleteForeverIcon />
                          </div>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
