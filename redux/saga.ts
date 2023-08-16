import {
  call,
  put,
  takeLatest,
  all,
  spawn,
  takeEvery,
} from "redux-saga/effects";
import * as actions from "../redux/reducers";
import { DispatchApi } from "../api";
import {
  ILocationOfForm,
  IResponseAPIGenerator,
  IScenario,
  ISliceResult,
  LocationsType,
  Menu,
  Other,
  SagaHomeAction,
  SagaInvited,
  SagaLogAction,
  SagaLoginAction,
  SagaNodeAction,
  SagaSearchAction,
  SagaUserAction,
  Tab,
} from "../redux/bussiness";
import { IResponseGenerator, IHome, IRoom } from "./bussiness";
import Router from "next/router";
import { IToken } from "../bussiness/Login";

enum Loading {
  START = 1,
  END = 0,
}

function* SendToApi(params: any) {
  try {
    yield put(
      actions.loadingHandler({
        isLoading: !!Loading.START,
        loadingForLocation: params.isExcel ? Other.Excel : params.location,
        id: params.id,
      })
    );

    let result: IResponseAPIGenerator | undefined = undefined;

    let { sendedData } = params;
    result = yield call(() =>
      DispatchApi({
        address: params.address,
        sendedData: sendedData,
        method: params.method,
        id: params.id,
        Mobile: params.mobile,
        isExcel: params.isExcel,
      })
    );

    if (result?.data?.statusCode == 200 && result?.data) {
      return {
        httpStatus: result.status,
        data: result.data,
        message: result.data.message,
      };
    } else {
      return {
        httpStatus: 400,
        message: result?.data.message,
      };
    }
  } catch (err: any) {
    //400:return {httpstatus,error}
    if (err.response) {
      if (err.response.status == 400) {
        let { status } = err.response;
        let error = Object.values(err.response.data.errors)[0]?.toString();

        yield put(
          actions.setResult({
            message: error,
            httpStatus: status,
            type: params.location,
          })
        );

        return {
          httpStatus: status,
          message: error,
        };
      } else {
        let url =
          location.host.includes(process.env.NEXT_PUBLIC_DEV_ADMIN_URL) ||
          location.host.includes("localhost")
            ? process.env.NEXT_PUBLIC_DEV_API_URL
            : process.env.NEXT_PUBLIC_PROD_API_URL;
        window.open(`${url}/login`);
      }
    }
    //401:if err.response ==undefined
  } finally {
    yield put(
      actions.loadingHandler({
        isLoading: !!Loading.END,
        loadingForLocation: params.location,
        id: params.id,
      })
    );
  }
}

function* Login({ payload }: any) {
  let sendedDate = JSON.stringify({
    username: payload.userNameField,
    password: payload.passwordField,
    verifyCode: "",
    isAdmin: 1,
  });

  let { data, httpStatus, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "auth/authenticate",
      sendedData: sendedDate,
      lan: payload.lan,
      method: "POST",
      location: Other.Login,
    })
  );

  if (httpStatus == 200) {
    let { refreshToken, token, userId } = data.data;
    yield put(
      actions.setResult({
        data: { refreshToken, token, userId },
        httpStatus: httpStatus,
        type: Other.Login,
      })
    );
  } else
    yield put(
      actions.setResult({
        message: message!,
        httpStatus: httpStatus,
        type: Other.Login,
      })
    );
}

function* Search({ payload }: any) {
  let { data, httpStatus, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user",
      sendedData: undefined,
      lan: payload.lan,
      method: "GET",
      location: Other.Search,
      mobile: payload.mobile,
    })
  );

  if (data && data.data) {
    yield put(actions.setSearch(data.data));
  }
  yield put(actions.setResult({ httpStatus, type: Other.Search }));
}
function* login() {
  yield takeLatest(SagaLoginAction.LOGIN, Login);
}

function* search() {
  yield takeLatest(SagaSearchAction.SEARCH, Search);
}

function* GetAdminUser() {
  let { data, httpStatus, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user/GetAdminUsers",
      sendedData: undefined,
      method: "GET",
      location: Other.User,
    })
  );

  if (data.data) {
    yield put(actions.setUsers(data.data));

    yield put(actions.setResult({ httpStatus, type: Other.GetAdminUser }));
  }
}

function* DeleteUser({ payload }: any) {
  let { data, httpStatus }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user/AcceptDenyHome",
      sendedData: JSON.stringify(payload),
      method: "PUT",
      location: Other.User,
    })
  );

  if (httpStatus == 200) {
    yield put(
      actions.removeUsers({ homeId: payload.homeId, userId: payload.userId })
    );
  }
  yield put(actions.setResult({ httpStatus, type: Other.DeleteUser }));
}

function* getAdminUser() {
  yield takeLatest(SagaUserAction.GET_ADMIN_USER, GetAdminUser);
}
function* AddAdminUser({ payload }: any) {
  let { httpStatus, data, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user/AddAdminUser",
      sendedData: JSON.stringify(payload),
      lan: payload.lan,
      method: "POST",
      location: Other.AddUserModal,
    })
  );
  if (httpStatus == 200) {
    yield put(actions.setUsers(data.data));
  }
  yield put(
    actions.setResult({ httpStatus, data, type: Other.AddUserModal, message })
  );
}

function* ChangeNumber({ payload }: any) {
  let { httpStatus, data, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user/ChangeNumber",
      sendedData: JSON.stringify(payload),
      lan: payload.lan,
      method: "POST",
      location: Other.ChangeNumber,
    })
  );

  if (httpStatus == 200) {
    yield put(actions.changeNumber(payload));
  }
  yield put(actions.setResult({ httpStatus, type: Other.ChangeNumber }));
}
function* EditAdminUser({ payload }: any) {
  let { httpStatus, data, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user/UpdateAdminUser",
      sendedData: JSON.stringify(payload),
      lan: payload.lan,
      method: "PUT",
      location: Other.AddUserModal,
      id: payload.userId,
    })
  );
  if (httpStatus == 200) {
    yield put(actions.updateUsers({ ...payload, username: payload.userName }));
  }
  yield put(
    actions.setResult({ httpStatus, data, type: Other.AddUserModal, message })
  );
}

function* RemoveUser({ payload }: any) {
  let { data, httpStatus, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "user/DeleteAdminUser",
      sendedData: undefined,
      lan: payload.lan,
      method: "DELETE",
      location: Other.Search,
      id: payload.currentUserId,
    })
  );

  if (httpStatus == 200) {
    yield put(actions.removeUserById({ userId: payload.currentUserId }));
  }
}

function* FetchHome({ payload }: any) {
  let {
    startDate,
    endDate,
    serial,
    pageNumber,
    mobile,
    pageSize,
    isExcel,
    deviceOutput,
  } = payload;

  let { data, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: `home/Search?StartDate=${startDate}&EndDate=${endDate}&Mobile=${mobile}&PageNumber=${pageNumber}&PageSize=${pageSize}&DeviceSearch=${deviceOutput}&IsExcel=${
        isExcel || false
      }${serial ? "&Serial=" + serial : ""}`,
      sendedData: undefined,
      lan: payload.lan,
      method: "GET",
      location: Other.Search,
      isExcel,
    })
  );
  console.log("home ", data);
  if (!isExcel) {
    if (data.statusCode == 200 && data) {
      yield put(
        actions.setResult({
          message: message!,
          httpStatus: data.statusCode,
          type: Other.Home,
        })
      );
      yield put(actions.setHomes(data.data));
    }
  }
}

function* FetchNode({ payload }: any) {
  let {
    expireStartDate,
    expireEndDate,
    registerStartDate,
    registerEndDate,
    homeSerial,
    nodeSerial,
    mobile,
    pageNumber,
    pageSize,
    isExcel,
  } = payload;

  let { data, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: `node/Search?RegisterStartDate=${registerStartDate}&${`HomeSerial=${
        homeSerial ?? ""
      }`}&${`NodeSerial=${nodeSerial ?? ""}`}&${`Mobile=${
        mobile ?? ""
      }`}&RegisterEndDate=${registerEndDate}&ExpireStartDate=${expireStartDate}&ExpireEndDate=${expireEndDate}&PageNumber=${pageNumber}&PageSize=${pageSize}&IsExcel=${isExcel}`,
      sendedData: undefined,
      lan: payload.lan,
      method: "GET",
      location: Other.Node,
      isExcel,
    })
  );

  if (!isExcel) {
    if (data && data.statusCode == 200) {
      yield put(
        actions.setNodes({
          allResults: data.data.allResults,
          nodes: data.data.nodes,
        })
      );
    }
    yield put(
      actions.setResult({
        message: message!,
        httpStatus: data.statusCode,
        type: Other.Node,
      })
    );
  }
}

function* FetchLog({ payload }: any) {
  let {
    registerStartDate,
    registerEndDate,
    description,
    pageNumber,
    pageSize,
    isExcel,
  } = payload;

  let { data, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: `log/Search?StartDate=${registerStartDate}&EndDate=${registerEndDate}&Description=${description}&PageNumber=${pageNumber}&PageSize=${pageSize}`,
      sendedData: undefined,
      lan: payload.lan,
      method: "GET",
      location: Other.Node,
      isExcel,
    })
  );
  if (!isExcel) {
    if (data && data.statusCode == 200) {
      yield put(
        actions.setLog({
          allResults: data.data.allResults,
          logs: data.data.logs,
        })
      );
    }
  }
}

function* CreateTicket({ payload }: any) {
  let sendedDate = JSON.stringify(payload);
  let { data, httpStatus, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: "ticket",
      sendedData: sendedDate,
      method: "POST",
      location: Menu.MenuCreateTicket,
    })
  );

  yield put(
    actions.setResult({
      message: message,
      httpStatus: httpStatus!,
      type: Menu.MenuCreateTicket,
    })
  );
}

function* GetTicket({ payload }: any) {
  let { data, httpStatus, message }: IResponseGenerator = yield call(() =>
    SendToApi({
      address: `ticket?Status=${payload.status}${
        payload.ticketNumber ? `&ticketNumber=${payload.ticketNumber}` : ""
      } &StartDate=${payload.startDate}&EndDate=${payload.endDate}&Unit=${
        payload.unit
      }&PageNumber=${payload.pageNumber}&PageSize=${payload.pageSize}&IsExcel=${
        payload.isExcel
      }&customerId=${payload.customerId}`,
      method: "GET",
      location: Menu.MenuShowTicket,
    })
  );

  if (data.data) {
    let result = data.data;
    yield put(
      actions.setTickets({
        tickets: { allResults: result.allResults, data: result.tickets },
      })
    );
  }

  yield put(
    actions.setResult({
      message: message,
      httpStatus: httpStatus!,
      type: Menu.MenuShowUser,
    })
  );
}
function* removeUser() {
  yield takeLatest(SagaUserAction.REMOVE_USER, RemoveUser);
}
function* addAdminUser() {
  yield takeLatest(SagaUserAction.ADD_ADMIN_USER, AddAdminUser);
}

function* editAdminUser() {
  yield takeLatest(SagaUserAction.EDIT_ADMIN_USER, EditAdminUser);
}

function* fetchHome() {
  yield takeLatest(SagaHomeAction.FETCH_HOME, FetchHome);
}

function* deleteUser() {
  yield takeLatest(SagaHomeAction.DELETE_USER, DeleteUser);
}

function* changeNumber() {
  yield takeLatest(SagaHomeAction.CHANGE_NUMBER, ChangeNumber);
}

function* fetchNode() {
  yield takeLatest(SagaNodeAction.FETCH_NODE, FetchNode);
}

function* fetchLog() {
  yield takeLatest(SagaLogAction.FETCH, FetchLog);
}

function* createTicket() {
  yield takeEvery(SagaUserAction.CREATE_TICKET, CreateTicket);
}

function* getTicket() {
  yield takeEvery(SagaUserAction.GET_TICKETS, GetTicket);
}
function* MainWatcher() {
  yield all([
    spawn(login),
    spawn(search),
    spawn(getAdminUser),
    spawn(removeUser),
    spawn(addAdminUser),
    spawn(editAdminUser),
    spawn(fetchHome),
    spawn(deleteUser),
    spawn(changeNumber),
    spawn(fetchNode),
    spawn(fetchLog),
    spawn(createTicket),
    spawn(getTicket),
  ]);
}
export default MainWatcher;
