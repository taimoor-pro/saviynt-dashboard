import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCustomersContent = createAsyncThunk(
  "customers/getCustomersContent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/users?page=1", {});
      return response.data;
    } catch (error) {
      // You can log the error or handle it as needed
      console.error("Error fetching customers:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState: {
    isLoading: false,
    customers: [],
  },
  reducers: {
    addNewCustomer: (state, action) => {
      let { newCustomerObj } = action.payload;
      state.customers = [...state.customers, newCustomerObj];
      localStorage.setItem("customers", JSON.stringify(state.customers));
    },

    updateCustomer: (state, action) => {
      const { index, updatedCustomer } = action.payload;
      const updatedCustomers = [...state.customers];
      updatedCustomers[index] = updatedCustomer;
      state.customers = updatedCustomers;
      localStorage.setItem("customers", JSON.stringify(updatedCustomers));
    },

    deleteCustomer: (state, action) => {
      let { index } = action.payload;
      state.customers.splice(index, 1);
      localStorage.setItem("customers", JSON.stringify(state.customers));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomersContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomersContent.fulfilled, (state, action) => {
        state.customers = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getCustomersContent.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { addNewCustomer, updateCustomer, deleteCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
