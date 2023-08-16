import { createSlice, current, PayloadAction, nanoid } from "@reduxjs/toolkit";
import {
  ISliceResult,
  ILocationOfForm,
  LocationsType,
  ILocations,
  Tab,
  ILoading,
  SearchType,
  UserType,
  IUser,
  TUser,
  IHome,
  INode,
  ILog,
  UserTypeSlice,
} from "./bussiness";

const initialResult: ISliceResult = {
  message: "",
  httpStatus: 0,
  data: undefined,
  type: undefined,
};

const initialLocationResult: ILocationOfForm = {
  currentTab: Tab.TabHome,
};

const initialLoading: ILoading = {
  isLoading: false,
  loadingForLocation: undefined,
};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState: initialLoading,
  reducers: {
    loadingHandler: (state, { payload }: PayloadAction<ILoading>) => {
      state.loadingForLocation = payload.loadingForLocation;
      state.isLoading = payload.isLoading;
      state.id = payload.id;
    },
  },
});

const search: SearchType = {
  search: [],
};
export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: search,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<IUser[]>) => {
      state.search = Array.isArray(payload) ? payload : [payload];
    },
  },
});

const users: UserType = {
  users: [],
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState: users,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<TUser[]>) => {
      if (Array.isArray(payload)) state.users = payload;
      else state.users.push(payload);
    },
    updateUsers: (state, { payload }: PayloadAction<TUser>) => {
      let userIndex = state.users.findIndex((s) => s.userId == payload.userId);
      if (userIndex > -1) {
        state.users[userIndex] = { ...payload, username: payload.username };
      }
    },
    removeUserById: (state, { payload }: PayloadAction<{ userId: string }>) => {
      const newUsers = state.users.filter(
        (user) => user.userId !== payload.userId
      );
      return {
        ...state,
        users: newUsers,
      };
    },
    resetUser(){
      return users
    }
  },
});

type homeType = {
  homes: IHome[] | undefined;
  allResults: number;
};
const homeState: homeType = {
  homes: undefined,
  allResults: 0,
};
type homePayloadType = {
  homes: IHome[];
  allResults: number;
};
export const homeSlice = createSlice({
  name: "homeSlice",
  initialState: homeState,
  reducers: {
    setHomes(state, { payload }: PayloadAction<homePayloadType>) {
      return {
        homes: payload.homes,
        allResults: payload.allResults,
      };
    },
    removeUsers: (
      state,
      { payload }: PayloadAction<{ homeId: string; userId: string }>
    ) => {
      let homeIndex = state.homes?.findIndex(
        (home) => home.homeId == payload.homeId
      );
      if (homeIndex! > -1 && state.homes) {
        let userIndex = state?.homes[homeIndex!].users.findIndex(
          (s) => s.userId == payload.userId
        );
        console.log("homeIndex ", homeIndex, " userIndex ", userIndex);
        state?.homes[homeIndex!].users.splice(userIndex, 1);
      }
    },
    changeNumber: (
      state,
      {
        payload,
      }: PayloadAction<{ homeId: string; userId: string; mobile: string }>
    ) => {
      const { homeId, userId, mobile } = payload;

      const homes = state?.homes?.map((home) => {
        if (home.homeId === homeId) {
          const users = home.users.map((user) => {
            if (user.userId === userId) {
              return {
                ...user,
                mobile,
              };
            } else {
              return user;
            }
          });

          return {
            ...home,
            users,
          };
        } else {
          return home;
        }
      });

      return {
        ...state,
        homes,
      };
    },
    resetHomes(){
      return homeState
    }
  },
});

//response
export const resultSlice = createSlice({
  initialState: initialResult,
  name: "resultSlice",
  reducers: {
    setResult(state, { payload }: PayloadAction<ISliceResult>) {
      state.httpStatus = payload.httpStatus;
      state.message = payload.message;
      state.type = payload.type;
      state.uid = nanoid();
      state.data = payload.data;
    },
    resetResult(state) {
      return initialResult;
    },
  },
});

type LogType = {
  logs: ILog[] | undefined;
  allResults: number;
};
const initialLog: LogType = {
  logs: undefined,
  allResults: 0,
};
//response
export const logSlice = createSlice({
  initialState: initialLog,
  name: "resultSlice",
  reducers: {
    setLog: (state, { payload }: PayloadAction<LogType>) => {
      state.allResults = payload.allResults;
      state.logs = payload.logs;
    },
    resetLogs(){
      return initialLog
    }
  },
});

type nodesType = {
  nodes: INode[] | undefined;
  allResults: number;
};
const initialNodeSlice: nodesType = {
  nodes: undefined,
  allResults: 0,
};

export const nodesSlice = createSlice({
  initialState: initialNodeSlice,
  name: "nodesSlice",
  reducers: {
    setNodes(state, { payload }: PayloadAction<nodesType>) {
      state.nodes = payload.nodes;
      state.allResults = payload.allResults;
    },
    resetNodes(){
      return initialNodeSlice
    }
  },

  
});

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: initialLocationResult,
  reducers: {
    setLocation(
      state,
      { payload: { data, type, flag } }: PayloadAction<ILocations>
    ) {
      state.flag = flag;
      switch (type) {
        case LocationsType.Tab:
          state.currentTab = data.currentTab;
          break;
        case LocationsType.Menu:
          state.currentMenu = data.currentMenu;
          break;
        case LocationsType.Other:
          state.other = data.other;
          break;
        case LocationsType.SubMenu:
          state.currentSubMenu = data.currentSubMenu;
          break;
      }
    },
  },
});


const initialTicketSlice: UserTypeSlice = {
  tickets: { allResults: 0, data: [] },
};

export const ticketSlice = createSlice({
  name: "ticketSlice",
  initialState: initialTicketSlice,
  reducers: {
    setTickets: (state, { payload }: PayloadAction<UserTypeSlice>) => {
      return {
        ...payload,
      };
    },
    checkTicket: (state, { payload }: PayloadAction<{ ticketId: string }>) => {
      state.tickets.data.map((item) => {
        if (item.ticketId == payload.ticketId) item.check = true;
        else item.check = false;
      });
    },
    resetTicket(){
      return initialTicketSlice
    }
  },
});
