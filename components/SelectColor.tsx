import React, { useMemo, useState } from "react";
import styles from "../sass/SelectColor.module.scss";
import { GradiantColors } from "../bussiness/Color";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { Grid } from "@mui/material";

interface IColor {
  value: React.ReactNode;
  key: string;
  style: string;
}
interface IProps {
  backgroundColor: string;
  callback: (backgroud: string) => void;
}
function ColorComponent({ backgroundColor, callback }: IProps) {
  const [stateColor, setStateColor] = useState<string>(GradiantColors.color1);

  let listStyle = [
    { style: styles.color1 },
    { style: styles.color2 },
    { style: styles.color3 },
    { style: styles.color4 },
    { style: styles.color5 },
    { style: styles.color6 },
    { style: styles.color7 },
  ];

  let rearrangeColors: IColor[] = React.useMemo(() => {
    let enumArray = Object.entries(GradiantColors).map(
      ([key, value], index) => {
        return {
          key,
          value: value.toString(),
          style:
            listStyle?.find((l) => l.style == `styles.color${index + 1}`)
              ?.style || listStyle[index].style,
        };
      }
    );

    let firstEnum = enumArray.find((color) => color.value == backgroundColor);

    //set default check
    setStateColor(firstEnum?.key!);

    return [
      firstEnum,
      ...enumArray.filter((color) => color.value != backgroundColor),
    ] as IColor[];
  }, [backgroundColor]);

  const callbackFunction = (color: IColor) => {
    setStateColor(color.key);
    if (color.value) callback(color.value.toString());
  };

  return (
    <Grid container className={styles.container}>
      <div className={styles.main}>
        {rearrangeColors?.map((color, index) => (
          <div
            className={`${color?.style}`}
            key={index}
            onClick={() => callbackFunction(color)}
          >
            {stateColor == color?.key && (
              <CheckCircleOutlineOutlinedIcon
                sx={{ fontSize: 40, color: "white" }}
              />
            )}
          </div>
        ))}
      </div>
    </Grid>
  );
}

export default ColorComponent;
