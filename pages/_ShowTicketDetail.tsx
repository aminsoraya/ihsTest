import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "../sass/ticketDetail.module.scss";
import { useSelector } from "react-redux";
import { RootSelector } from "../redux/store";
import {
  IInstances,
  ILocationOfForm,
  ITicket,
  LocationsType,
  SubMenu,
} from "../redux/bussiness";
import useDispatch from "../hooks/useDispatch";
import useLanguage, { Language } from "../hooks/useLanguage";
import { Snackbar } from "@mui/material";
import { useDispatch as Dispatch } from "react-redux";
import { EnNumToPe } from "../bussiness";
import { DispatchApi } from "../api";
import headerStyles from "../sass/ModalDialog.module.scss";
import SendIcon from "@mui/icons-material/Send";
import Loading from "../components/Loading";

interface IProps {
  ticketId: string;
  closeModal: () => void;
}
function ShowTicketDetail(props: IProps) {
  const [message, setMessage] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>();
  const { setLocation } = useDispatch();
  const main = useRef<HTMLDivElement>(null);

  const dispatch = Dispatch();
  const {
    ticketReducer: { tickets },
  } = useSelector(RootSelector);
  const [ticketData, setTicketData] = useState<ITicket>();

  //configuration
  const language = Language();
  let {
    showTicket: { detail },
  } = useLanguage();

  useEffect(() => {
    if (props.ticketId) {
      getTicketDetail(props.ticketId);
    }
  }, [props.ticketId]);

  useEffect(() => {
    if (main.current)
      main!.current!.lastElementChild?.scrollIntoView({ behavior: "smooth" });
  }, [ticketData]);

  const getTicketDetail = async (ticketId: string) => {
    let response = await DispatchApi({
      address: `ticket/${ticketId}`,
      method: "GET",
    }).then((data) => data);

    if (response?.data.data) {
      let convertionData = response?.data.data as ITicket;
      setTicketData(convertionData);
    }
  };

  const sendTicket = async () => {
    let sendedData = {
      ticketId: ticketData?.ticketId,
      unit: ticketData?.unit,
      description: description,
      customerSee: true,
    };

    let response = await DispatchApi({
      address: `ticket/addTicketInstance`,
      method: "POST",
      sendedData: JSON.stringify(sendedData),
    }).then((data) => data);
    setDescription("");
    if (response?.data.data) {
      if (response?.data.statusCode == 200) {
        let instnce: IInstances = response.data.data as IInstances;
        setTicketData((state) => ({
          ...state!,
          instances: [...state?.instances!, instnce],
        }));
      }
    }
  };

  const sortedTickets = useMemo(() => {
    if (ticketData) {
      return ticketData?.instances.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
  }, [ticketData]);

  return (
    <div dir={language == "en" ? "ltr" : "rtl"}>
      {
        <Snackbar
          color="#0000FF"
          open={message && message.length > 0 ? true : false}
          autoHideDuration={3000}
          onClose={() => {
            setMessage(undefined);
          }}
          message={message}
        />
      }

      {ticketData ? (
        <div style={{  overflow: "scroll",height: "calc(100vh - 24rem)",width: "100%", background: "whitesmoke" }}>
          <div className={styles.main} ref={main}>
            {sortedTickets!.map((ticket, index) => {
              return (
                <div
                  style={{ marginTop: index == 0 ? 0 : 50 }}
                  className={`${
                    ticket.userResponseName == ""
                      ? styles.chat_box_user
                      : styles.chat_box_tech
                  } full_width`}
                  key={index}
                >
                  {ticket.userResponseName != "" ? (
                    <span className={styles.userResponseName}>
                      {ticket.userResponseName}
                    </span>
                  ) : null}
                  {sortedTickets![index - 1]! &&
                  sortedTickets![index - 1].userResponseName ==
                    ticket.userResponseName ? null : (
                    <div
                      className={`${
                        ticket.userResponseName == ""
                          ? styles.triangle_top_right
                          : styles.triangle_top_left
                      } `}
                    ></div>
                  )}
                  <p>{ticket.description}</p>
                  <div className={styles.chat_buttom}>
                    <span dir="ltr">{EnNumToPe(ticket.date)}</span>
                    <span>
                      {ticket.userResponseName != "" && ticket.statusName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.footer}>
            <textarea
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={description}
            ></textarea>
            <span
              onClick={() => description&& description != "" && sendTicket()}
              className={styles.send_icon}
            >
              <SendIcon />
            </span>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default ShowTicketDetail;
