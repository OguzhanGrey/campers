import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    location: "",
    equipment: {
      AC: false,
      Automatic: false,
      Kitchen: false,
      TV: false,
      Bathroom: false,
    },
    vehicleType: {
      Van: false,
      FullyIntegrated: false,
      Alcove: false,
    },
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    toggleEquipment: (state, action) => {
      const equipment = action.payload;
      state.equipment[equipment] = !state.equipment[equipment];
    },
    toggleVehicleType: (state, action) => {
      const type = action.payload;
      state.vehicleType[type] = !state.vehicleType[type];
    },
    setFilters: (state, action) => {
      const { equipment, vehicleType } = action.payload;
      state.equipment = equipment;
      state.vehicleType = vehicleType;
    },
    clearFilters: (state) => {
      state.location = "";
      state.equipment = {
        AC: false,
        Automatic: false,
        Kitchen: false,
        TV: false,
        Bathroom: false,
      };
      state.vehicleType = {
        Van: false,
        FullyIntegrated: false,
        Alcove: false,
      };
    },
  },
});

export const {
  setLocation,
  toggleEquipment,
  toggleVehicleType,
  setFilters,
  clearFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
