import axios from "axios";

export const Axios = (baseURL: string) =>
  axios.create({
    baseURL: baseURL + "/api/v1",
  });
