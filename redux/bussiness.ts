import { Parameters } from "../bussiness/SensorType";
import Router from "next/router";

export enum EnumCheckType {
  ScenarioNodeInput = 1,
  ScenarioNodeOutput = 2,
  Scenarios = 3,
  FavoriteScenarios = 4,
}
//homes
export interface INode {
  homeName: string | undefined;
  homeSerial: string | undefined;
  ownerMobile: string | undefined;
  name: string | undefined;
  typeName: string | undefined;
  nodeSerial: string | undefined;
  nameNumber: string | undefined;
  registerDate: string | undefined;
  guranteeExpireDate: string | undefined;
  firmware: string | undefined;
}

export interface INodeExtended extends INode {
  isSelected?: boolean;
  check?: EnumCheckType;
}

export interface IScenarioCheck {
  homeId: string;
  scenarioId: string;
}

export interface INodeSelected {
  node?: INode;
}

export interface ICurrentIcon {
  sender: "SelectIcon" | "NodeSetting" | "Scenario";
  icon?: string;
}

export interface IPutHome {
  homeId: string;
  backgroundColor: string;
  description: string;
  name: string;
}
export interface IRoom {
  roomId: string;
  name: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  nodes: INodeExtended[];
  isSelected?: boolean;
}

export interface scenarioIOs {
  nodeId?: string;
  nodeStatus?: string;
  nodeSerial?: undefined;
  nodeNameNumber?: undefined;
  waitingMinutes?: string;
  type?: number;
}

interface scenarioMobile {
  mobileNumber: string;
  smsText: string;
  type: number;
}

export interface otherScenario {
  otherScenarioId: string;
  otherScenarioStatus: number;
  waitingMinutes: string;
}

export enum WatingMinutesType {
  Nodes = 1,
  Scenario = 2,
}
export interface IUpdateWaitingMinutes {
  nodeId: string | undefined;
  watingMinutes: string | undefined;
  type: EnumCheckType;
  homeId: string;
}

export interface IScenario {
  dateType?: number;
  dateTypeInfo?: string;
  description?: string;
  icon?: string;
  isFavourite?: number;
  name?: string;
  scenarioIOs?: scenarioIOs[];
  scenarioId?: string;
  scenarioMobiles?: scenarioMobile[];
  scenarioOtherScenarios?: otherScenario[];
  startTime?: string;
  status?: number;
  check?: EnumCheckType;
  waitingMinutes?: number;
  otherScenarioStatus?: number;
  temporary?: boolean;
  asVariable?: boolean;
}
export interface IUser {
  mobile: string;
  name: string;
  userStatus: number;
  username: string;
  userId: string;
  canDelete: boolean;
}

export interface IHomes {
  homes: IHome[];
}
export interface IHomeSelected {
  homeId: string | undefined;
}
//nodes

export interface IRemoveRoom {
  homeId: string;
  roomId: string;
}

export interface IApi {
  name: string;
  serialNo: string;
  nodeName: string;
  status: Parameters;
  userId: string;
}
export interface IWebSocket {
  topic: string;
  message: string;
}

export interface ISliceResult {
  httpStatus: number;
  data?: any;
  message?: string;
  type?: Tab | Menu | SubMenu | Other | undefined;
  uid?: string;
}

export interface ISliceNodes {
  firmware: string;
  guranteeExpireDate: string;
  homeName: string;
  homeSerial: string;
  name: string;
  nameNumber: string;
  nodeSerial: string;
  ownerMobile: string;
  registerDate: string;
  typeName: string;
}

export interface IPostRoom {
  room: Pick<IRoom, "name" | "backgroundColor" | "description"> & {
    lang: string;
  } & { homeId: string };
}

export interface ISms {
  id: string;
  mobile: string;
  text: string;
  type: EnumOutPutType;
}

export enum EnumOutPutType {
  input = 1,
  output = 2,
}
export interface INodeTempChecked {
  nodeId: string;
  checkType: EnumCheckType | undefined;
}

export interface IState {
  topic: string | undefined;
  message: string | undefined;
}
export interface ICommunicate {
  recive: IState | undefined;
  send: IState;
}

export const SagaInvited = {
  INVITED: "INVITED",
};

export const SagaLoginAction = {
  LOGIN: "LOGIN",
  VERIFY: "VERIFY",
};
export const SagaScenarioAction = {
  POST_SCENARIO: "POST_SCENARIO",
  PUT_SCENARIO: "PUT_SCENARIO",
  REMOVE: "REMOVE",
  TOGGLE_STATE: "TOGGLE_STATE",
};
export const SagaPeopleAction = { ADD_PEOPLE: "ADD_PEOPLE" };
export const SagaRoomAction = {
  REMOVE_ROOM: "REMOVE_ROOM",
  PUT_ROOM: "PUT_ROOM",
};
export const SagaHomeAction = {
  PUT_HOME: "PUT_HOME",
  REMOVE_HOME: "REMOVE_HOME",
  REMOVE_USER: "REMOVE_USER",
  POST_HOME: "POST_HOME",
  FETCH_HOME: "FETCH_HOMES",
  DELETE_USER: "DELETE_USER",
  CHANGE_NUMBER: "CHANGE_NUMBER",
};

export const SagaNodeAction = {
  FETCH_NODE: "FETCH_NODE",
};

export const SagaLogAction = {
  FETCH: "FETCH",
};

export const SagaSearchAction = {
  SEARCH: "SEARCH",
};

export interface ILoading {
  isLoading: boolean;
  loadingForLocation?: Other | undefined;
  id?: string | undefined;
}

export interface IPeople {
  mobile: string | undefined;
  lan: string | undefined;
}

interface IResponseName {
  Name: string;
}
export interface IResponseGenerator {
  message: string | undefined;
  httpStatus: number;
  data: any;
  statusCode?: number | undefined;
}
export interface IResponseAPIGenerator {
  status: number;
  data: any;
}

export enum SubMenu {
  SelectIcon = "SelectIcon",
  HideMenu = "HideMenu",
  InvitePeople = "InvitePeople",
  ShowAllDevices = "ShowAllDevices",
  ShowSensors = "ShowSensors",
  ShowScenarios = "ShowScenarios",
  AddAccessories = "AddAccessories",
  AddScenarioMobile = "AddScenarioMobile",
  NodeSetting = "NodeSetting",
}

export enum EnumDevices {
  ShowHomeNotResponseDevices = "ShowHomeNotResponseDevices",
  ShowRoomNotResponseDevices = "ShowRoomNotResponseDevices",
  //ShowHomeSettingDevices = "ShowHomeSettingDevices",
  ShowHomeDevices = "ShowHomeDevices",
  ShowScenarioDevices = "ShowScenarioDevices",
  ShowCheckedDevice = "ShowCheckedDevice",
}

export enum Tab {
  TabHome = "TabHome",
  TabScenario = "TabScenario",
  TabRoom = "TabRoom",
  TabDiscover = "TabDiscover",
}

export enum Menu {
  MenuSearch = "MenuSearch",
  MenuShowUser = "MenuShowUser",
  MenuSearchHome = "MenuSearchHome",
  MenuExit = "MenuExit",
  MenuNodes = "MenuNodes",
  MenuAddHome = "MenuAddHome",
  MenuScenario = "MenuScenario",
  MenuNodeSetting = "MenuNodeSetting",
  MenuAddRoom = "MenuAddRoom",
  MenuAddPeople = "MenuAddPeople",
  HideMenu = "HideMenu",
  MenuHomeSettings = "MenuHomeSettings",
  MenuRoomSettings = "MenuRoomSettings",
  MenuInvited = "MenuInvited",
  MenuNoResponseAccessories = "NoResponseAccessories",
  MenuLog = "MenuLog",
  MenuCreateTicket = "MenuCreateTicket",
  MenuShowTicket = "MenuShowTicket",
  MenuTickets = "MenuTickets",
  MenuDashboard="MenuDashboard"
}

export enum Other {
  MainPage = "MainPage",
  Login = "Login",
  AddUserModal = "AddUserModal",
  ChangeNumber = "ChangeNumber",
  DeleteUser = "DeleteUser",
  GetAdminUser = "GetAdminuser",
  VerifyCode = "VerifyCode",
  ScenarioClick = "ScenarioClick",
  ShowTicket = "ShowTicket",
  Search = "Search",
  Node = "Node",
  User = "User",
  Home = "Home",
  Excel = "Excel",
}

export interface IInstances {
  customerSee: boolean;
  date: string;
  description: string;
  statusName: string;
  unit: number;
  unitName: string;
  userResponseName: string;
}

export enum EnumStatus {
  All = 10,
  Waiting = 1,
  Pending = 2,
  InProgress = 3,
  Waiting_For_Customer = 4,
  Closed = 5,
  Open_Tickets = 12,
  Last_Response_By_Customer = 13,
  Have_Unread_Responses=14

}

export interface ITicket {
  ticketId: string;
  ticketNumber: number;
  title: string;
  startTime: string;
  customerId: string;
  customerName: string;
  priority: string;
  lastTime: string;
  status: number;
  statusName: string;
  unit: string;
  check?: boolean;
  instances: IInstances[];
  notReadedResponse: number;
}

type TicketsType = {
  data: ITicket[];
  allResults: number;
};
export type UserTypeSlice = {
  tickets: TicketsType;
};

export interface ILocationOfForm {
  currentTab: Tab;
  currentMenu?: Menu | undefined;
  other?: Other | undefined;
  currentSubMenu?: SubMenu | undefined;
  flag?: EnumCheckType | undefined;
}

export interface ILog {
  date: string;
  description: string;
  type: string;
}

export const SagaUserAction = {
  EDIT_ADMIN_USER: "EDIT_ADMIN_USER",
  ADD_ADMIN_USER: "ADD_ADMIN_USER",
  GET_ADMIN_USER: "GET_ADMIN_USER",
  REMOVE_USER: "REMOVE_USER",
  GET_TICKETS: "GET_TICKETS",
  CREATE_TICKET: "CREATE_TICKET",
};

export enum LocationsType {
  Menu = "Menu",
  SubMenu = "SubMenu",
  Tab = "Tab",
  Other = "Other",
}

export interface IUser {
  userId: string;
  name: string;
  family: string;
  mobile: string;
  numberOfHomes: number;
  token: string;
}

export type SearchType = {
  search: IUser[];
};

export type TUser = IUser & {
  status: number;
};
export type UserType = {
  users: TUser[];
};

export interface ILocations {
  type: LocationsType;
  data: ILocationOfForm;
  flag?: EnumCheckType;
}

export enum EnumWhenToStart {
  None = 0,
  Daily = 1,
  Weekly = 2,
  Monthly = 3,
}

export interface IUserType {
  userId: string;
  userStatus: number;
  name: string;
  mobile: string;
  canDelete: boolean;
}
export interface IDevice {
  count: number;
  type: number;
  typeName: string;
}

export interface IHome {
  homeId: string;
  date: string;
  devices: IDevice[];
  name: string;
  ownerMobile: string;
  serial: string;
  users: IUserType[];
}
export enum EnumWeekDays {
  Sat = "Saturday",
  Sun = "Sunday",
  Mon = "Monday",
  Tue = "Tuesday",
  Wed = "Wednesday",
  Thu = "Thursday",
  Fri = "Friday",
}
export enum EnumPriority {
  low = 1,
  medium = 2,
  high = 3,
  all = 10,
}

export enum EnumUnit {
  Sales = 1,
  Technical = 2,
  Financial = 3,
  All = 10,
}
