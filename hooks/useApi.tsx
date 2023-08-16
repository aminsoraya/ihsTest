import { DispatchApi } from "../api";
import { Language } from "../hooks/useLanguage";

interface IProps {
  address: string;
  sendedData?: string | undefined;
  method: "POST" | "GET" | "PUT" | "DELETE";
}
function UseApi({ address, method, sendedData }: IProps) {
  const language = Language();
  return DispatchApi({ address, sendedData, method});
}

export default UseApi;
