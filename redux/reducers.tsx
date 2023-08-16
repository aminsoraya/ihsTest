import { combineReducers } from "redux";
import {
  loadingSlice,
  searchSlice,
  userSlice,
  resultSlice,
  locationSlice,
  homeSlice,
  nodesSlice,
  logSlice,
  ticketSlice
} from "./slices";

export const { resetResult, setResult } = resultSlice.actions;
export const { setLocation } = locationSlice.actions;
export const { loadingHandler } = loadingSlice.actions;
export const { setUsers, removeUserById, updateUsers,resetUser } = userSlice.actions;
export const { setSearch } = searchSlice.actions;
export const { setHomes, changeNumber, removeUsers,resetHomes } = homeSlice.actions;
export const { setNodes,resetNodes } = nodesSlice.actions;
export const { setLog,resetLogs } = logSlice.actions;
export const { checkTicket,setTickets,resetTicket } = ticketSlice.actions;


export const reducers = combineReducers({
  userReducer: userSlice.reducer,
  searchReducer: searchSlice.reducer,
  homesReducer: homeSlice.reducer,
  resultReducer: resultSlice.reducer,
  locationReducer: locationSlice.reducer,
  loadingReducer: loadingSlice.reducer,
  nodeReducer: nodesSlice.reducer,
  logReducer:logSlice.reducer,
  ticketReducer:ticketSlice.reducer
});
