import { createSlice } from "@reduxjs/toolkit";

const loadFavoritesFromStorage = () => {
  try {
    const favorites = localStorage.getItem("favoriteCampers");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem("favoriteCampers", JSON.stringify(favorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteIds: loadFavoritesFromStorage(),
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.favoriteIds.indexOf(camperId);

      if (index === -1) {
        state.favoriteIds.push(camperId);
      } else {
        state.favoriteIds.splice(index, 1);
      }

      saveFavoritesToStorage(state.favoriteIds);
    },
    clearFavorites: (state) => {
      state.favoriteIds = [];
      localStorage.removeItem("favoriteCampers");
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
