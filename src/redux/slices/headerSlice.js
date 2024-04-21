import { createSlice } from "@reduxjs/toolkit";

export const headerSlice = createSlice({
  name: "header",
  initialState: {
    pageTitle: "Home",
    newNotificationMessage: "",
    newNotificationStatus: 1,
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title;
    },

    removeNotificationMessage: (state, action) => {
      state.newNotificationMessage = "";
    },

    showNotification: (state, action) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },
});

export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;

export default headerSlice.reducer;
