import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../useSlice/authSlice";
import musicSlice from "../useSlice/musicSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    music: musicSlice,
  },
});

export default store;
