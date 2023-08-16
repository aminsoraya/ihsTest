import React, { useEffect, useState } from "react";
import { IDevice } from "../../redux/bussiness";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../tableStyles";
import Dialog from "../Dialog";

type DeviceModalTextType = {
  type: string;
  typeName: string;
  count: string;
  rowNo: string;
};
interface IProps {
  deviceModal: IDevice[] | undefined;
  callback: () => void;
  deviceModalText: DeviceModalTextType;
}
export default function DeviceModal(props: IProps) {
  const [deviceModal, setDeviceModal] = useState<IDevice[] | undefined>();

  useEffect(() => {
    setDeviceModal(props.deviceModal);
  }, [props.deviceModal]);

  return (
    <Dialog
      cancleCallback={() => {
        props.callback();
      }}
      cancle=""
      remove=""
      applyCallback={() => {}}
    >
      {
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            maxHeight: "500px",
            overflowY: "auto",
            overflowX: "hidden",
            //width: getWidth(),
          }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <thead>
              <TableRow>
                <StyledTableCell align="center">
                  {props.deviceModalText.rowNo}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.deviceModalText.type}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {props.deviceModalText.count}
                </StyledTableCell>
              </TableRow>
            </thead>
            <TableBody>
              {deviceModal!?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="center">{index + 1}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.typeName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.count}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Dialog>
  );
}
