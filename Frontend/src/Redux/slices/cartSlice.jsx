import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
  cartItems: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart : (state, action) => {
      const { id, price, image, quantity = 1 } = action.payload;
    
      if (!id || !price) {
        console.error("Invalid product data:", action.payload);
        return;
      }
    
      const existingItem = state.cartItems.find((item) => item.id === id);
    
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity,
          image: image?.url || image, // Ensure correct image format
        });
      }
    
      saveCartToStorage(state.cartItems);
    },
        removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      saveCartToStorage(state.cartItems);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        saveCartToStorage(state.cartItems);
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
