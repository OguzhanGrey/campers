import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    items: [],
    filteredItems: [],
    displayedItems: [],
    total: 0,
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 4,
    hasMoreItems: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    filterCampers: (state, action) => {
      const { location, equipment, vehicleType } = action.payload;

      state.filteredItems = state.items.filter((camper) => {
        if (
          location &&
          !camper.location.toLowerCase().includes(location.toLowerCase())
        ) {
          return false;
        }

        const hasAnyEquipmentSelected = Object.values(equipment).some(
          (selected) => selected
        );
        if (hasAnyEquipmentSelected) {
          const hasMatchingEquipment = Object.entries(equipment).some(
            ([key, selected]) => {
              if (!selected) return false;

              switch (key) {
                case "AC":
                  return camper.AC;
                case "Automatic":
                  return camper.transmission === "automatic";
                case "Kitchen":
                  return camper.kitchen;
                case "TV":
                  return camper.TV;
                case "Bathroom":
                  return camper.bathroom;
                default:
                  return false;
              }
            }
          );

          if (!hasMatchingEquipment) {
            return false;
          }
        }

        const hasAnyVehicleTypeSelected = Object.values(vehicleType).some(
          (selected) => selected
        );
        if (hasAnyVehicleTypeSelected) {
          const hasMatchingVehicleType = Object.entries(vehicleType).some(
            ([key, selected]) => {
              if (!selected) return false;

              switch (key) {
                case "Van":
                  return camper.form === "panelTruck";
                case "FullyIntegrated":
                  return camper.form === "fullyIntegrated";
                case "Alcove":
                  return camper.form === "alcove";
                default:
                  return false;
              }
            }
          );

          if (!hasMatchingVehicleType) {
            return false;
          }
        }

        return true;
      });

      state.currentPage = 1;
      state.displayedItems = state.filteredItems.slice(0, state.itemsPerPage);
      state.hasMoreItems = state.filteredItems.length > state.itemsPerPage;
    },
    loadMoreItems: (state) => {
      const nextPage = state.currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * state.itemsPerPage;

      state.displayedItems = state.filteredItems.slice(startIndex, endIndex);
      state.currentPage = nextPage;
      state.hasMoreItems = endIndex < state.filteredItems.length;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.displayedItems = state.filteredItems.slice(0, state.itemsPerPage);
      state.hasMoreItems = state.filteredItems.length > state.itemsPerPage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.filteredItems = action.payload.items;
        state.total = action.payload.total;
        state.error = null;

        state.currentPage = 1;
        state.displayedItems = action.payload.items.slice(
          0,
          state.itemsPerPage
        );
        state.hasMoreItems = action.payload.items.length > state.itemsPerPage;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, filterCampers, loadMoreItems, resetPagination } =
  campersSlice.actions;
export default campersSlice.reducer;
