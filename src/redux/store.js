import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slices/campersSlice";
import filtersReducer from "./slices/filtersSlice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
