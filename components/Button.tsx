import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

function ButtonComponent({
  isLoading,
  text,
  fullWidth,
  style,
  callback,
  color,
}: {
  text: string;
  isLoading: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
  callback: () => void;
  color?:
    | "error"
    | "info"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "inherit";
}) {
  const ConditionalRendering: React.FC = () => {
    if (isLoading)
      return (
        <Button
          fullWidth={fullWidth}
          disabled
          type="submit"
          variant="contained"
          sx={{ height: 36 }}
          size="small"
          style={style}
          color={color}
        >
          <CircularProgress size={30} color="inherit" />
        </Button>
      );
    return (
      <Button
        fullWidth={fullWidth}
        variant="contained"
        size="small"
        style={style}
        onClick={() => callback()}
        color={color}
      >
        {text}
      </Button>
    );
  };
  return <ConditionalRendering />;
}

export default ButtonComponent;
