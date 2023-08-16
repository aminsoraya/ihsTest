import moment from "jalali-moment";
import { IDay } from "react-calendar-datetime-picker/dist/type";

const GetStatus = ({ status }: { status: string }) => {
  if (status.includes("-")) {
  }
  return status;
};

//Extract
export const ExtractMessage = (
  messsage: string
): { nodeName: string; status: string }[] => {
  messsage = messsage.replace("MSG:DAT:", "");
  let msgSplit = messsage.split("*");

  let result: { nodeName: string; status: string }[] = [];
  for (let i = 0; i < msgSplit.length; i++) {
    let nodeName = "";
    let status: string;

    let msgString = msgSplit[i];
    let arr = msgString.split(":");

    nodeName = arr[0].substring(0, arr[0].indexOf("-"));
    status = arr[1];

    result[i] = { nodeName, status };
  }
  return result;
};

export const ControlKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
  let { keyCode } = event;
  let allowedKey = [8, 37, 39];

  if (keyCode < 48 || (keyCode > 57 && (keyCode < 96 || keyCode > 105)))
    if (!allowedKey.includes(keyCode)) event.preventDefault();
};

export enum EnumSensorTypes {
  _11 = 11,
  _12 = 12,
  _13 = 13,
  _14 = 14,
  _15 = 15,
  _16 = 16,
}
export const EnNumToPe = (num: any) => {
  return num
    ?.toString()
    .replace(/0/g, "۰")
    .replace(/1/g, "۱")
    .replace(/2/g, "۲")
    .replace(/3/g, "۳")
    .replace(/4/g, "۴")
    .replace(/5/g, "۵")
    .replace(/6/g, "۶")
    .replace(/7/g, "۷")
    .replace(/8/g, "۸")
    .replace(/9/g, "۹");
};

export const PeToEnNum = (num: any) => {
  return num
    ?.toString()
    .replace(/۰/g, 0)
    .replace(/۱/g, 1)
    .replace(/۲/g, 2)
    .replace(/۳/g, 3)
    .replace(/۴/g, 4)
    .replace(/۵/g, 5)
    .replace(/۶/g, 6)
    .replace(/۷/g, 7)
    .replace(/۸/g, 8)
    .replace(/۹/g, 9);
};

export const GetMultipleLineString = ({
  val,
  len,
}: {
  val: string;
  len: number;
}) => {
  return val?.length > len ? `${val.substring(0, len)} ...` : val;
};

export const PersianDateToGeo = (input: string, isEnd?: boolean) => {
  return isEnd
    ? moment
        .from(input, "fa", "YYYY-MM-DD")
        .locale("en")
        .add(1, "day")
        .format("YYYY-MM-DD")
    : moment.from(input, "fa", "YYYY-MM-DD").locale("en").format("YYYY-MM-DD");
};

export const GetInputDate = (date: string) => {
  let splitDate = date.split("/");
  return { year: +splitDate[0], month: +splitDate[1], day: +splitDate[3] };
};


export const getPersianIDayFormat = ({ date }: { date: string }): IDay => {
  let day = +PeToEnNum(date.split('/')[2]);
  let month = +PeToEnNum(date.split('/')[1]);
  let year = +PeToEnNum(date.split('/')[0]);

  return { year, month, day };
};
