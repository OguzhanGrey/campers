import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slices/campersSlice";
import filtersReducer from "./slices/filtersSlice";
import favoritesReducer from "./slices/favoritesSlice";

const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
