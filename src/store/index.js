import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import appReducer from "./reducers/appReducer";

const persistConfig = {
  key: "app",
  storage,
  // stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, appReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
