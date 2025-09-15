import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API base URL - adjust according to your backend
const API_BASE_URL = 'http://localhost:3000/api/pay';

// Async thunk for creating PayPal payment
export const createPayPalPayment = createAsyncThunk(
  'payment/createPayPalPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create-payment`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment creation failed');
      }

      if (!data.approvalUrl) {
        throw new Error('No approval URL received from PayPal');
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || 'Network error occurred',
      });
    }
  }
);

// Async thunk for handling payment success
export const handlePaymentSuccess = createAsyncThunk(
  'payment/handlePaymentSuccess',
  async ({ paymentId, payerId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/payment-success?paymentId=${paymentId}&PayerID=${payerId}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment processing failed');
      }

      return data;
    } catch (error) {
      return rejectWithValue({
        message: error.message || 'Payment processing error',
      });
    }
  }
);

// Async thunk for handling payment cancellation
export const handlePaymentCancel = createAsyncThunk(
  'payment/handlePaymentCancel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payment-cancel`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel payment');
      }

      return { message: 'Payment was cancelled' };
    } catch (error) {
      return rejectWithValue({
        message: error.message || 'Payment cancellation error',
      });
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    isProcessing: false,
    paymentData: null,
    approvalUrl: null,
    orderData: null,
    error: null,
    success: false,
    lastPaymentId: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.isProcessing = false;
      state.paymentData = null;
      state.approvalUrl = null;
      state.error = null;
      state.success = false;
    },
    resetPaymentError: (state) => {
      state.error = null;
    },
    setPaymentProcessing: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create PayPal Payment
      .addCase(createPayPalPayment.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPayPalPayment.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.approvalUrl = action.payload.approvalUrl;
        state.paymentData = action.payload;
        state.error = null;
      })
      .addCase(createPayPalPayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload?.message || 'Payment creation failed';
        state.approvalUrl = null;
      })
      
      // Handle Payment Success
      .addCase(handlePaymentSuccess.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(handlePaymentSuccess.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.success = true;
        state.orderData = action.payload.order;
        state.error = null;
      })
      .addCase(handlePaymentSuccess.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload?.message || 'Payment processing failed';
      })
      
      // Handle Payment Cancel
      .addCase(handlePaymentCancel.fulfilled, (state, action) => {
        state.isProcessing = false;
        state.error = null;
        state.success = false;
        state.approvalUrl = null;
        state.paymentData = null;
      });
  },
});

export const { clearPaymentState, resetPaymentError, setPaymentProcessing } = paymentSlice.actions;

export default paymentSlice.reducer;