import { Axios } from "../axios";
import Router from "next/router";
import { IToken } from "../bussiness/Login";
import fileDownload from "js-file-download";
import  {CheckToken}  from "../hooks/useCheckToken";
import jwtDecode from "jwt-decode";

export async function DispatchApi({
  address,
  sendedData,
  method,
  id,
  Mobile,
  isExcel,
}: {
  address: string;
  sendedData?: string | undefined;
  method: "POST" | "GET" | "PUT" | "DELETE";
  id?: string;
  Mobile?: string;
  isExcel?: boolean;
}) {
  //isloading=true
  let data = sendedData && JSON?.parse(sendedData!);
  let token: IToken | undefined;

  const axios = Axios(
    location.host.includes(process.env.NEXT_PUBLIC_DEV_ADMIN_URL) ||location.host.includes("vercel")||
      location.host.includes("localhost")
      ? process.env.NEXT_PUBLIC_DEV_API_URL
      : process.env.NEXT_PUBLIC_PROD_API_URL
  );

  if (!location.pathname.includes("/login")) {
    let refreshTokenResponse = await CheckToken();

    if (!refreshTokenResponse) {
      localStorage.removeItem("token");
      Router.push("/login");
      return;
    }
  }

  token = JSON.parse(localStorage.getItem("token")!) as IToken;
  if (token || location.pathname.includes("/login"))
    return await axios({
      url: id
        ? `${address}\\${id}`
        : Mobile
        ? `${address}?Mobile=${Mobile}`
        : address,
      data: data,
      method,
      responseType: isExcel ? "blob" : "json",
      headers: {
        accept: "*/*",
        "Accept-Language": localStorage.getItem("lang"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token?.token}`,
      },
    }).then((result) => {
      if (isExcel) {
        fileDownload(result.data, "download.xlsx");
      } else {
        return result;
      }
    });
}
