import React from "react";
import { EnumCheckType, IHome, IRoom } from "../redux/bussiness";

type IIsNodeCheckedProps = {
  home: IHome;
  nodeId: string;
  type: number;
};



interface IIsActiveDivProps {
  inputCheck?: EnumCheckType | undefined;
  outputCheck?: EnumCheckType | undefined;
  status?: string | undefined;
}
export const IsActiveDiv = ({
  inputCheck,
  outputCheck,
  status,
}: IIsActiveDivProps) => {
  switch (inputCheck || outputCheck) {
    case EnumCheckType.ScenarioNodeInput:
    case EnumCheckType.ScenarioNodeOutput:
      return true;
    default:
      return status != undefined;
  }
};
