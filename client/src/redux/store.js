import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";


// using redux persist to save the data across different loads
// i think it use local storage
const persistConfig = {
  key: "user",
  version: 1,
  storage,
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);


const rootReducer = ({
  user: persistedUserReducer,
})


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
