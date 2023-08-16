import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
  TableRow,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Other, SagaUserAction, TUser } from "../redux/bussiness";
import useSelector from "../hooks/useSelector";
import dispatchFunc from "../hooks/useDispatch";
import useLanguage from "../hooks/useLanguage";

interface IProps {
  closeModal: () => void;
  user?: TUser | undefined;
}

export enum AdminUserStatus {
  Active = 1,
  Inactive = 2,
}
export default function ResponsiveDialog(props: IProps) {
  const dispatch = useDispatch();
  const { addAdminUserModal } = useLanguage();
  const { resetResult } = dispatchFunc();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { resultReducer } = useSelector();
  const [message, setMessage] = useState<string | undefined>();

  const [userName, setUserName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [family, setFamily] = useState<string | undefined>();
  const [status, setStatus] = useState<AdminUserStatus | undefined>(
    AdminUserStatus.Active
  );

  React.useEffect(() => {
    setUserName(props.user?.username);
    setFamily(props.user?.family);
    setStatus(props.user?.status);
    setName(props.user?.name);
  }, [props]);

  const canSave = !props.user?.userId
    ? [userName, password, confirmPassword, name, family].every(Boolean)
    : [userName, name, family].every(Boolean);
  const submit = () => {
    if (confirmPassword != password && !props.user?.userId) {
      setMessage(addAdminUserModal.passwordAndConfirmPasswordAreNotSame);
      setTimeout(() => {
        setMessage(undefined);
      }, 2000);
    } else
      dispatch({
        type: !props.user?.userId
          ? SagaUserAction.ADD_ADMIN_USER
          : SagaUserAction.EDIT_ADMIN_USER,
        payload: {
          password,
          userName,
          confirmPassword,
          name,
          family,
          status,
          userId: props.user?.userId,
        },
      });
  };

  React.useEffect(() => {
    if (resultReducer)
      if (resultReducer.type == Other.AddUserModal) {
        setMessage(resultReducer.message);
        if (resultReducer.httpStatus == 200) {
          props.closeModal();
        }
        setTimeout(() => {
          resetResult();
        }, 2000);
      }
  }, [resultReducer]);

  return (
    <>
      <Snackbar
        color="#0000FF"
        open={message && message.length > 0 ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          setMessage(undefined);
        }}
        message={message}
      />

      <Dialog
        fullScreen={false}
        open={true}
        onClose={props.closeModal}
        aria-labelledby="responsive-dialog-title"
        style={{ width: "400" }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            borderBottom: "1px solid whitesmoke",
            textAlign: "center",
            background: "gray",
            color: "white",
          }}
        >
          {addAdminUserModal.modalTitke}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="containerStyle">
              <div className="rowStyle">
                <label>{addAdminUserModal.name}</label>
                <input
                  style={{
                    width: "200px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  onChange={(e) => setName(e.currentTarget.value)}
                  value={name}
                ></input>
              </div>
              <div className="rowStyle">
                <label>{addAdminUserModal.family}</label>
                <input
                  style={{
                    width: "200px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  onChange={(e) => setFamily(e.currentTarget.value)}
                  value={family}
                ></input>
              </div>
              <div className="rowStyle">
                <label>{addAdminUserModal.userName}</label>
                <input
                  style={{
                    width: "200px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  onChange={(e) => setUserName(e.currentTarget.value)}
                  value={userName}
                ></input>
              </div>
              <div className="rowStyle">
                <label>{addAdminUserModal.password}</label>
                <input
                  style={{
                    width: "200px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  dir="ltr"
                  type="password"
                ></input>
              </div>
              <div className="rowStyle">
                <label>{addAdminUserModal.confirmPassword}</label>
                <input
                  style={{
                    width: "200px",
                    paddingRight: "10px",
                    paddingLeft: "10px",
                  }}
                  onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                  dir="ltr"
                  type="password"
                ></input>
              </div>

              <div className="rowStyle" style={{ justifyContent: "start" }}>
                <label>{addAdminUserModal.status}</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "100px",
                  }}
                >
                  <Typography>{addAdminUserModal.inActive}</Typography>
                  <Switch
                    checked={status == AdminUserStatus.Active}
                    onChange={(e) =>
                      setStatus(
                        e.currentTarget.checked
                          ? AdminUserStatus.Active
                          : AdminUserStatus.Inactive
                      )
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography>{addAdminUserModal.active}</Typography>
                </div>
              </div>
              <div className="rowStyle">
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={submit}
                  disabled={!canSave}
                >
                  {addAdminUserModal.submit}
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={() => props.closeModal()}
                >
                  {addAdminUserModal.cancle}
                </Button>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
