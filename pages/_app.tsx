import "../styles/globals.css";
import "../components/react-modern-calendar-datepicker/lib/DatePicker.css";
import type { AppProps } from "next/app";
import { LangContextProvider } from "../context/language";
import React, { useEffect } from "react";
import MultiLang from "../components/MultiLang";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    router.pathname == "/" && router.push("/dashboard");
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <LangContextProvider>
        <MultiLang>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </MultiLang>
      </LangContextProvider>
    </>
  );
}

export default MyApp;
