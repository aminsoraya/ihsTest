import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useLanguage from "../hooks/useLanguage";

interface IProps {
  callback: ({ isRemove }: { isRemove?: boolean }) => void;
}
export default function ResponsiveDialog(props: IProps) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const {
    home: { removeUserModal },
  } = useLanguage();

  return (
    <div>
      <Dialog
        fullScreen={false}
        open={true}
        onClose={props.callback}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ background: "gray", color: "white", padding: "7px 5px" }}
        >
          {removeUserModal.removeUser}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{removeUserModal.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className="rowStyle">
            <Button
              fullWidth
              variant="contained"
              sx={{ mr: 2 }}
              onClick={() => props.callback({ isRemove: true })}
            >
              {removeUserModal.remove}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => props.callback({ isRemove: false })}
            >
              {removeUserModal.cancle}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
