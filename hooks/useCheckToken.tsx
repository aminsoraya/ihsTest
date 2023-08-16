import { IToken } from "../bussiness/Login";
import jwtDecode from "jwt-decode";
import { Axios } from "../axios";

const CheckToken = async () => {
  const axios = Axios(
    location.host.includes(process.env.NEXT_PUBLIC_DEV_ADMIN_URL) ||
      location.host.includes("vercel") ||
      location.host.includes("localhost")
      ? process.env.NEXT_PUBLIC_DEV_API_URL
      : process.env.NEXT_PUBLIC_PROD_API_URL
  );

  let tokenInfos: IToken | undefined = JSON.parse(
    localStorage.getItem("token")!
  );

  if (!tokenInfos || tokenInfos == null) {
    return false;
  }

  let { exp } = jwtDecode(tokenInfos!.token) as any;
  let dateExpiration = new Date(exp * 1000);
  let currentDate = new Date();

  if (currentDate > dateExpiration) {
    return await axios({
      url: `auth\\refresh`,
      data: JSON.stringify({
        token: tokenInfos?.token,
        refreshToken: tokenInfos?.refreshToken,
      }),
      responseType: "json",
      method: "POST",
      headers: {
        accept: "*/*",
        "Accept-Language": localStorage.getItem("lang"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then(({ data }) => {
      if (data.statusCode && data.statusCode != 3) {
        let { userId, token, refreshToken } = data.data;
        if (token && refreshToken && userId) {
          localStorage.setItem(
            "token",
            JSON.stringify({ userId, token, refreshToken })
          );
          return true;
        }
      } else if (data.statusCode && data.statusCode == 3) {
        localStorage.removeItem("token");
        return false;
      }
    });
  } else return true;
};
export { CheckToken };
