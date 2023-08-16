import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../redux/bussiness";
import useLanguage, { Language } from "../hooks/useLanguage";
import "react-calendar-datetime-picker/dist/index.css";
import { Grid, Skeleton, Stack } from "@mui/material";
import Layout from "../components/layout";
import styles from "../sass/Tickets.module.scss";
import { DispatchApi } from "../api";
import { EnNumToPe } from "../bussiness";

interface INumberOfTickets {
  numberOfUnReadedTickets: number;
  numberOfNeedResponseTickets: number;
}
function Dashboard() {
  let [waitingForResponse, setWaitingForResponse] = useState<number>();
  let [HaveAnUnreadResponse, setHaveAnUnreadResponse] = useState<number>();

  let { ticket } = useLanguage();

  const getRedirectUrl = () => {
    if (location.host.includes("localhost")) {
      return `http://localhost:${location.port}`;
    } else if (location.host.includes(process.env.NEXT_PUBLIC_DEV_ADMIN_URL)) {
      return `http://${process.env.NEXT_PUBLIC_DEV_ADMIN_URL}`;
    }else if (location.host.includes(process.env.NEXT_PUBLIC_PROD_ADMIN_URL)){
      return `https://${process.env.NEXT_PUBLIC_PROD_ADMIN_URL}`
    }
  };

  useEffect(() => {
    (async () => {
      await DispatchApi({
        address: "ticket/GetNumberOfUnreadedTickets",
        method: "GET",
      }).then(({ data }: any) => {
        if (data.data) {
          let { numberOfNeedResponseTickets, numberOfUnReadedTickets } =
            data.data as INumberOfTickets;
          setWaitingForResponse(numberOfUnReadedTickets);
          setHaveAnUnreadResponse(numberOfNeedResponseTickets);
        }
      });
    })();
  }, []);

  return (
    <>
      <Layout activeMenu={Menu.MenuTickets}>
        <div className={styles.main}>
          {waitingForResponse && HaveAnUnreadResponse ? (
            <>
              <div
                className={styles.ticket}
                onClick={() => {
                  window.open(`${getRedirectUrl()}/showTicket?status=13`);
                }}
              >
                <span>{EnNumToPe(HaveAnUnreadResponse)}</span>
                <span>{ticket.ticketWaitingForResponse}</span>
              </div>
              <div
                className={styles.ticket}
                onClick={() => {
                  window.open(
                    `${getRedirectUrl()}/showTicket?status=14`
                  );
                }}
              >
                <span>{EnNumToPe(waitingForResponse)}</span>
                <span>{ticket.ticketsThatHaveAnUnreadResponse}</span>
              </div>
            </>
          ) : (
            <div className={styles.loading}>
              <Stack spacing={1} className={styles.skeleton}>
                <Skeleton variant="circular" width={120} height={120} />
                <Skeleton variant="rectangular" width={210} height={60} />
              </Stack>
              <Stack spacing={1} className={styles.skeleton}>
                <Skeleton variant="circular" width={120} height={120} />
                <Skeleton variant="rectangular" width={210} height={60} />
              </Stack>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Dashboard;
