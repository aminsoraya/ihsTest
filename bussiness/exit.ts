import Router from "next/router";

const Exit = () => {
  localStorage.clear();
  //Router.replace("/login");
  window.open("/login", "_self");
};

export default Exit;
