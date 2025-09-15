// CartItem.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../Redux/slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    } else if (type === 'decrement' && item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(item.id));
    }, 300);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 transform ${
      isRemoving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
    }`}>
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="relative group">
          <img
            src={item.image || item.image?.url}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-300"></div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate mb-1">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {formatPrice(item.price)} each
          </p>
          
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500 font-medium">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-lg bg-white">
              <button
                onClick={() => handleQuantityChange('decrement')}
                disabled={item.quantity <= 1}
                className="p-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center border-x border-gray-300">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange('increment')}
                className="p-1 hover:bg-gray-100 transition-colors rounded-r-lg"
              >
                <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Price and Remove */}
        <div className="text-right space-y-2">
          <div className="text-sm font-semibold text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </div>
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="group flex items-center justify-center w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            <svg className="w-4 h-4 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Savings indicator for multiple items */}
      {item.quantity > 1 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Item savings:</span>
            <span className="text-green-600 font-medium">
              {formatPrice(item.price * item.quantity * 0.05)} saved
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;