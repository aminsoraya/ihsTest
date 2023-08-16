import React, { useState, useMemo, useEffect, useRef } from "react";
import style from "../sass/timePicker.module.scss";
import { Language } from "../hooks/useLanguage";
import { Languages } from "../bussiness/language";
import { EnNumToPe } from "../bussiness";

interface IMinute {
  key: string;
  value: string;
}
interface ICallback {
  hour?: string;
  minute?: IMinute;
}
interface IProps {
  callback: ({ hour, minute }: ICallback) => void;
  minute: IMinute;
  hour: string;
}

function TimePicker(props: IProps) {
  const GetTimes = () => {
    let hours: string[] = ["--"];
    let minutes: IMinute[] = [{ key: "--", value: "--" }];

    const language = Language();

    const GetNumberByLocale = (number: number | string) => {
      return language == Languages.fa ? EnNumToPe(number) : number;
    };

    for (var counter = 0; counter < 24; counter++) {
      hours.push(`${counter}`);
    }
    for (var counter = 0; counter <= 59; counter += 10) {
      minutes.push({
        key: (counter + 5).toString(),
        value: `${counter}-${counter + 9}`,
      });
    }

    const CalcMinute = useMemo(() => {
      let output: string;

      if (props?.minute?.key && props.minute.value == "") {
        return minutes.find((m) => m.key == props.minute.key)?.value;
      } else if (minutes) {
        minutes.forEach((minute) => {
          let firstRange = minute.value.split("-")[0];
          let secondRange = minute.value.split("-")[1];
          if (
            props?.minute?.value >= firstRange &&
            props?.minute?.value <= secondRange
          ) {
            output = minute.value;
            return;
          }
        });
      }

      return output!;
    }, [props.minute]);
    return (
      <div className={style.container}>
        <select defaultValue={CalcMinute?.trim()} className={style.selectTime}>
          {minutes.map((minute, index) => {
            return (
              <option
                key={index}
                selected={CalcMinute?.trim() == minute.value.trim()}
                style={{
                  marginTop: 5,
                  color:
                    CalcMinute?.trim() == minute.value.trim()
                      ? "black"
                      : "#c1bfbf",
                  scale:
                    CalcMinute?.trim() == minute.value.trim() ? "1.3" : "1",
                }}
                onClick={() =>
                  props.callback({
                    hour: props.hour,
                    minute: { key: minute.key, value: minute.value },
                  })
                }
              >
                &nbsp;&nbsp;
                {GetNumberByLocale(minute.value)}
              </option>
            );
          })}
        </select>
        <span>:</span>

        <select className={style.selectTime}>
          {hours.map((hour, index) => {
            return (
              <option
                key={index}
                selected={hour == props.hour}
                style={{
                  marginTop: 5,
                  color: hour == props.hour ? "black" : "#c1bfbf",
                  scale: hour == props.hour ? "1.3" : "1",
                }}
                onClick={() =>
                  props.callback({
                    hour: hour,
                    minute: {
                      key: props.minute.key,
                      value: props.minute.value,
                    },
                  })
                }
              >
                &nbsp;&nbsp;{GetNumberByLocale(hour)}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  return <>{GetTimes()}</>;
}

export default TimePicker;
