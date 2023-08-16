import React, { useEffect, useState } from "react";
import Dialog from "../Dialog";
import {
  EnumPriority,
  EnumUnit,
  Menu,
  SagaUserAction,
} from "../../redux/bussiness";
import useLanguage from "../../hooks/useLanguage";
import styles from "../../sass/CreateTicket.module.scss";
import { useDispatch } from "react-redux";
import useSelector from "../../hooks/useSelector";
import Loading from "../Loading";
import { resetResult } from "../../redux/reducers";
import Button from "../Button";

interface IProps {
  customerId: string;
  closeModal: () => void;
}
export default function UserModal(props: IProps) {
  const {
    home: { createTicket },
  } = useLanguage();
  const dispatch = useDispatch();
  const {
    loadingReducer: { isLoading },
    resultReducer,
  } = useSelector();

  const [priority, setPriority] = useState<EnumPriority | undefined>();
  const [unit, setUnit] = useState<EnumUnit | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const Save = () => {
    dispatch({
      type: SagaUserAction.CREATE_TICKET,
      payload: {
        customerId: props.customerId,
        priority,
        unit,
        title,
        description,
        customerSee: true,
      },
    });
  };

  useEffect(() => {
    if (resultReducer) {
      if (
        resultReducer.httpStatus == 200 &&
        resultReducer.type == Menu.MenuCreateTicket
      ) {
        dispatch(resetResult());
        props.closeModal();
      } else {
      }
    }
  }, [resultReducer]);

  return isLoading ? (
    <Loading />
  ) : (
    <Dialog
      cancle=""
      cancleCallback={() => {
        props.closeModal();
      }}
      remove=""
      applyCallback={() => {}}
    >
      {
        <div className={styles.main}>
          <div className={styles.row} style={{ marginTop: "50px" }}>
            <label>{createTicket.priority.title}</label>
            <select
              className="select"
              onChange={(e) => setPriority(+e.currentTarget.value)}
            >
              <option value={EnumPriority.low}>
                {createTicket.priority.low}
              </option>
              <option value={EnumPriority.medium}>
                {createTicket.priority.medium}
              </option>
              <option value={EnumPriority.high}>
                {createTicket.priority.high}
              </option>
            </select>
          </div>
          <div className={styles.row}>
            <label>{createTicket.unit.title}</label>
            <select
              className="select"
              onChange={(e) => setUnit(+e.currentTarget.value)}
            >
              <option value={EnumUnit.Sales}>{createTicket.unit.sales}</option>
              <option value={EnumUnit.Technical}>
                {createTicket.unit.technicals}
              </option>
              <option value={EnumUnit.Financial}>
                {createTicket.unit.financial}
              </option>
            </select>
          </div>
          <div className={styles.row}>
            <label>{createTicket.title}</label>
            <input
              onChange={(e) => {
                setTitle(e.currentTarget.value);
              }}
            ></input>
          </div>
          <div className={`${styles.row} ${styles.areaRow}`}>
            <label>{createTicket.description}</label>
            <textarea
              onChange={(e) => setDescription(e.currentTarget.value)}
            ></textarea>
          </div>
          <div className={`${styles.row} ${styles.areaRow}`}>
            <label></label>
            <Button
              color="success"
              callback={() => Save()}
              text={createTicket.save}
              isLoading={false}
            />
          </div>
        </div>
      }
    </Dialog>
  );
}
