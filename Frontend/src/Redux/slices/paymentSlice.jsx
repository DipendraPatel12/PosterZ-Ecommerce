import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API base URL - adjust according to your backend
// const API_BASE_URL = 'http://localhost:3000/api/pay';
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
// Async thunk for creating PayPal payment
export const createPayPalPayment = createAsyncThunk(
  "payment/createPayPalPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pay/create-payment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment creation failed");
      }

      if (!data.approvalUrl) {
        throw new Error("No approval URL received from PayPal");
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Network error occurred",
      });
    }
  }
);

// New async thunk for executing payment
// New async thunk for executing payment
export const executePayment = createAsyncThunk(
  "payment/executePayment",
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pay/execute-payment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ paymentId, payerId, orderId }), // ✅ send orderId too
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Payment execution failed");
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Payment execution error",
      });
    }
  }
);

// Async thunk for handling payment cancellation
export const handlePaymentCancel = createAsyncThunk(
  "payment/handlePaymentCancel",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment-cancel`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to cancel payment");
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || "Payment cancellation error",
      });
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    isProcessing: false,
    paymentData: null,
    approvalUrl: null,
    orderData: null,
    error: null,
    success: false,
    cancelled: false,
    lastPaymentId: null,
    paymentDetails: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.isProcessing = false;
      state.paymentData = null;
      state.approvalUrl = null;
      state.error = null;
      state.success = false;
      state.cancelled = false;
      state.orderData = null;
      state.paymentDetails = null;
    },
    resetPaymentError: (state) => {
      state.error = null;
    },
    setPaymentProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
    setPaymentSuccess: (state, action) => {
      state.success = true;
      state.orderData = action.payload.order;
      state.paymentDetails = action.payload.paymentDetails;
    },
    setPaymentFailure: (state, action) => {
      state.success = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create PayPal Payment
      .addCase(createPayPalPayment.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.success = false;
        state.cancelled = false;
      })
      .addCase(createPayPalPayment.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.paymentData = action.payload;
        state.error = null;

        if (action.payload.orderId) {
          localStorage.setItem("orderId", action.payload.orderId); // ✅ save orderId
        }
      })
      .addCase(createPayPalPayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload?.message || "Payment creation failed";
        state.approvalUrl = null;
      })

      // Execute Payment
      .addCase(executePayment.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(executePayment.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.success = true;
        state.orderData = action.payload.order;
        state.paymentDetails = action.payload.paymentDetails;
        state.error = null;
        state.approvalUrl = null;
      })
      .addCase(executePayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload?.message || "Payment execution failed";
        state.success = false;
      })

      // Handle Payment Cancel
      .addCase(handlePaymentCancel.pending, (state) => {
        state.isProcessing = true;
      })
      .addCase(handlePaymentCancel.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.error = null;
        state.success = false;
        state.cancelled = true;
        state.approvalUrl = null;
        state.paymentData = null;
      })
      .addCase(handlePaymentCancel.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload?.message || "Payment cancellation failed";
      });
  },
});

export const {
  clearPaymentState,
  resetPaymentError,
  setPaymentProcessing,
  setPaymentSuccess,
  setPaymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
