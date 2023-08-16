import React, { useEffect, useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SagaHomeAction } from "../../redux/bussiness";
import { useDispatch } from "react-redux";

interface IUserDelete {
  homeId: string;
  status: number;
  userId: string;
}
type UserModalType = {
  editMobile: string;
  mobile: string;
  yes: string;
  no: string;
};
interface IProps {
  editUserModalText: UserModalType;
  editUserModal:
    | (Pick<IUserDelete, "homeId" | "userId"> & { mobile: string })
    | undefined;
  callback: () => void;
}

export default function EditUserModal(props: IProps) {
  const dispatch = useDispatch();
  const [editUserModal, setEditUserModal] = useState<
    (Pick<IUserDelete, "homeId" | "userId"> & { mobile: string }) | undefined
  >();

  useEffect(() => {
    setEditUserModal(props.editUserModal);
  }, [props]);

  return (
    <MuiDialog
      open={true}
      keepMounted
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ color: "white", background: "gray" }}>
        {props.editUserModalText.editMobile}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <label htmlFor="">{props.editUserModalText.mobile}</label>
        <input
          style={{ marginRight: "10px" }}
          type="text"
          placeholder={props.editUserModalText.mobile}
          dir="ltr"
          value={editUserModal!?.mobile}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditUserModal((prevState) => ({
              ...prevState!,
              mobile: e?.target?.value,
            }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={editUserModal?.mobile?.length != 10}
          variant="contained"
          color="success"
          onClick={() => {
            dispatch({
              type: SagaHomeAction.CHANGE_NUMBER,
              payload: {
                homeId: editUserModal!.homeId,
                mobile: editUserModal!.mobile,
                userId: editUserModal!.userId,
              },
            });
          }}
        >
          {props.editUserModalText.yes}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.callback()
          }}
        >
          {props.editUserModalText.no}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
