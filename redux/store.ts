import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import createSagaMiddleWare from "redux-saga";
import HomesWatcher from "./saga";

// const persistConfig = {
//   key: 'root',
//   storage,
// }

// const persistedReducer = persistReducer(persistConfig, homeSlice.reducer)
const saga = createSagaMiddleWare();
const store = configureStore({
  reducer: reducers,
  middleware: [...getDefaultMiddleware({ thunk: false }), saga],
});
saga.run(HomesWatcher);

type RootState = ReturnType<typeof store.getState>;
export const RootSelector = (state: RootState) => state;

// export const persistor = persistStore(store)
export default store;
