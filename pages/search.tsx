import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Menu, Other, SagaSearchAction } from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import useLanguage from "../hooks/useLanguage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Layout from "../components/layout";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

export default function Search() {
  const dispatch = useDispatch();
  const [mobile, setMobile] = React.useState<string | undefined>();
  const { searchComponent } = useLanguage();
  const {
    searchReducer: { search },
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

  const getRedirectUrl = () => {
    if (
      location.host.includes(process.env.NEXT_PUBLIC_DEV_ADMIN_URL) ||
      location.host.includes("localhost")
    ) {
      return process.env.NEXT_PUBLIC_DEV_USER_URL;
    } else if (location.host.includes(process.env.NEXT_PUBLIC_PROD_ADMIN_URL)) {
      return process.env.NEXT_PUBLIC_PROD_USER_URL;
    }
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
    <Layout activeMenu={Menu.MenuSearch}>
      <Grid container mt={4} sx={{display:"flex" ,alignItems:"center",justifyContent:"center"}}>
        <Grid item xs={2} md={1} lg={1} style={{textAlign:"left"}}>
          <label htmlFor="mobile" style={{ paddingLeft: "10px" }}>
            {searchComponent.mobile}
          </label>
        </Grid>
        <Grid
          item
          md={3}
          xs={8}
          lg={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            value={mobile}
            onChange={(e) => setMobile(e.currentTarget.value)}
            type="text"
            id="mobile"
            style={{ textAlign: "left", paddingLeft: "10px" ,width:"100%"}}
          />
        </Grid>
      </Grid>
      <Grid container sx={{display:"flex" ,alignItems:"center",justifyContent:"center"}}>
      <Grid item xs={2} md={1}></Grid>
        <Grid
          item
          md={3}
          xs={8}
          lg={2}
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            fullWidth={true}
            isLoading={isLoading}
            text={searchComponent.searchLabel}
            color="success"
            callback={() =>
              dispatch({ type: SagaSearchAction.SEARCH, payload: { mobile } })
            }
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid
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
          {search?.length! > 0 ? (
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
                      {searchComponent.row}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.family}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.homeCount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.operation}
                    </StyledTableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  {search.map((row, index) => (
                    <StyledTableRow key={row.name}>
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
                        {row.numberOfHomes}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.userStatus}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            window.open(
                              `${getRedirectUrl()}?token=${row.token}&userId=${
                                row.userId
                              }`,
                              "_blank"
                            )
                          }
                        >
                          <VisibilityIcon />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : search?.length == 0 && resultReducer.type == Other.Search ? (
            <TableContainer
              component={Paper}
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
                      {searchComponent.row}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.family}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.homeCount}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.status}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {searchComponent.operation}
                    </StyledTableCell>
                  </TableRow>
                </thead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">
                      موردی یافت نشد
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}
