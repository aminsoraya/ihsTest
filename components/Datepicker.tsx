import { IDay } from "react-calendar-datetime-picker/dist/type";
import DtPicker from "react-calendar-datetime-picker";

const DatePicker = ({
  local,
  placeHolder,
  callback,
  init,
  isDisabled,
}: {
  local: "en" | "fa";
  placeHolder: string;
  callback: (date: string) => void;
  init: IDay | undefined;
  isDisabled?: boolean;
}) => {
  return (
    <DtPicker
      isDisabled={isDisabled}
      onChange={(e) => {
        if (e) {
          callback(`${e.year}-${e.month}-${e.day}`);
        }
      }}
      type="single"
      placeholder={placeHolder}
      local={local}
      initValue={init!}
      
    />
  );
};

export { DatePicker };