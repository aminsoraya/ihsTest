import { useSelector } from "react-redux";
import { RootSelector } from "../redux/store";

function Index() {
  return useSelector(RootSelector);
}

export default Index;
