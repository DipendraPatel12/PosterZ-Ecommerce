import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axiosClient";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axiosClient.get("/api/product/all-products");
    return response.data;
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error uploading product:",
        error.response?.data || error.message
      );
      return rejectWithValue(error.response?.data || "Upload failed");
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axiosClient.delete(`/products/${id}`);
    return id;
  }
);

// Edit a product (for example, updating the name or price)
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updatedData }) => {
    const response = await axiosClient.put(`/products/${id}`, updatedData, {
      headers: { "Content-Type": "multipart/form-data" }, // Ensure images are sent properly
    });
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/api/product/details/${id}`);
      return response.data.data; // API returns { message, data }
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productDetails: null, // For single product
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.product;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Product
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })

      // Edit Product
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })   // existing fetchProducts reducers ...
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
        state.productDetails = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetails = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
