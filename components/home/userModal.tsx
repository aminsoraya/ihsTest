import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import { StyledTableCell, StyledTableRow } from "../tableStyles";
import Dialog from "../Dialog";
import { IUserType } from "../../redux/bussiness";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useLanguage from "../../hooks/useLanguage";

type RemoveUserModalType = {
  status: number;
  userId: string;
};
type EditUserModalType = {
  mobile: string;
  userId: string;
};
interface IProps {
  userModal: IUserType[] | undefined;
  closeModal: () => void;
  setRemoveUserModal: (items: RemoveUserModalType) => void;
  setEditUserModal: (items: EditUserModalType) => void;
}
export default function UserModal(props: IProps) {
  const { home } = useLanguage();

  return (
    <Dialog
      cancle=""
      cancleCallback={() => {
        props.closeModal();
      }}
      remove=""
      applyCallback={() => {}}
    >
      {
        <TableContainer
          component={Paper}
          style={{
            maxHeight: "100vh",
            overflow: "auto",
          }}
          className="tableContainer"
        >
          <Table aria-label="customized table">
            <thead>
              <TableRow>
                <StyledTableCell align="center">{home.rowNo}</StyledTableCell>
                <StyledTableCell align="center">{home.status}</StyledTableCell>
                <StyledTableCell align="center">{home.name}</StyledTableCell>
                <StyledTableCell align="center">{home.mobile}</StyledTableCell>
                <StyledTableCell align="center">
                  {home.canDelete}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {home.editMobile}
                </StyledTableCell>
              </TableRow>
            </thead>
            <TableBody>
              {props.userModal?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{++index}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.userStatus == 1
                      ? home.owner
                      : row.userStatus == 2
                      ? home.memberOfHome
                      : home.invited}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.mobile}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.canDelete ? (
                      <div
                        onClick={() =>
                          props.setRemoveUserModal({
                            status: row.userStatus,
                            userId: row.userId,
                          })
                        }
                      >
                        <DeleteForeverIcon sx={{ cursor: "pointer" }} />
                      </div>
                    ) : (
                      <div style={{ pointerEvents: "none", opacity: "0.3" }}>
                        <DeleteForeverIcon sx={{ color: "gray" }} />
                      </div>
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div
                      onClick={() =>
                        props.setEditUserModal({
                          userId: row.userId,
                          mobile: row.mobile,
                        })
                      }
                    >
                      <EditIcon sx={{ cursor: "pointer" }} />
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Dialog>
  );
}
