import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiDialog from "@mui/material/Dialog";
import { IUserDelete } from "../../pages/home";
import useSelector from "../../hooks/useSelector";
import { SagaHomeAction } from "../../redux/bussiness";
import { useDispatch } from "react-redux";

type RemoveUserModalType = {
  removeUser: string;
  message: string;
  remove: string;
  cancle: string;
};
interface IProps {
  removeUserModalText: RemoveUserModalType;
  callback: () => void;
  removeUserModal: IUserDelete | undefined;
}
export default function RemoveUserModal(props: IProps) {
  const [removeUserModalItem, setRemoveUserModalItem] = useState<
    IUserDelete | undefined
  >();

  const dispatch = useDispatch();

  const {
    loadingReducer: { isLoading },
  } = useSelector();

  useEffect(() => {
    setRemoveUserModalItem(props.removeUserModal);
  }, [props.removeUserModal]);

  return (
    <MuiDialog
      open={true}
      keepMounted
      onClose={() => {}}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{ color: "white", background: "gray", padding: "5px 7px " }}
      >
        {props.removeUserModalText.removeUser}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description" sx={{ mt: 2 }}>
          {props.removeUserModalText.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch({
              type: SagaHomeAction.DELETE_USER,
              payload: {
                homeId: removeUserModalItem!.homeId,
                status: 3,
                userId: removeUserModalItem!.userId,
              },
            });
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            props.removeUserModalText.remove
          )}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            props.callback();
          }}
        >
          {props.removeUserModalText.cancle}
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}
