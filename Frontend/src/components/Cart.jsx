// Updated Cart.js
import { AiOutlineClose } from "react-icons/ai";
import { BsCartX } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Redux/slices/cartSlice";
import { createPayPalPayment, clearPaymentState } from "../Redux/slices/paymentSlice";
import CartItem from "./CarItem";
import { useEffect } from "react";

const Cart = ({ onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { user } = useSelector((state) => state.auth);
  const { isProcessing, error, approvalUrl } = useSelector((state) => state.payment);
  
  const isCartEmpty = cartItems.length === 0;
  
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle PayPal redirect when approval URL is received
  useEffect(() => {
    if (approvalUrl) {
      window.location.href = approvalUrl;
    }
  }, [approvalUrl]);

  // Handle payment errors
  useEffect(() => {
    if (error) {
      alert(`Payment Error: ${error}`);
      dispatch(clearPaymentState());
    }
  }, [error, dispatch]);

  // PayPal Checkout Handler using Redux
  const handlePayPalCheckout = async () => {
    // Validation checks
    if (!user) {
      alert('Please login to proceed with checkout');
      return;
    }

    if (isCartEmpty) {
      alert('Your cart is empty');
      return;
    }

    // Prepare payment data
    const paymentData = {
      userId: user._id || user.id,
      address: user.address || "123 Default St, Default City", // You might want to collect this from a form
      location: {
        type: "Point",
        coordinates: [user.longitude || 0, user.latitude || 0], // Default coordinates or from user profile
      },
      Products: cartItems.map(item => ({
        ProductId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // Dispatch the createPayPalPayment action
    try {
      const result = await dispatch(createPayPalPayment(paymentData));
      if (createPayPalPayment.fulfilled.match(result)) {
        // Success - the useEffect will handle the redirect
        console.log('Payment creation successful, redirecting to PayPal...');
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end z-50">
      {/* Enhanced Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>

      {/* Cart Content */}
      <div className="w-80 sm:w-96 bg-white/95 backdrop-blur-md h-full shadow-2xl flex flex-col transform transition-all duration-300 ease-in-out border-l border-gray-200/50">
        
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-700/20"></div>
          <div className="relative flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">Shopping Cart</h3>
              <p className="text-blue-100 text-sm">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <button
              className="text-white hover:text-red-200 transition-colors duration-300 p-2 hover:bg-white/10 rounded-full"
              onClick={onClose}
            >
              <AiOutlineClose className="text-xl" />
            </button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-white/5 rounded-full"></div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50">
          {!isCartEmpty ? (
            <div className="p-4 space-y-3">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideInRight 0.4s ease-out forwards'
                  }}
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
              <div className="bg-gray-100 rounded-full p-8 mb-6">
                <BsCartX className="text-6xl text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 text-center text-sm leading-relaxed">
                Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Checkout Section */}
        {!isCartEmpty && (
          <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 p-6 space-y-4">
            {/* Savings indicator */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700 font-medium">You're saving:</span>
                <span className="text-green-600 font-semibold">{formatPrice(totalAmount * 0.1)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-50/80 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-800">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <button
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                onClick={handlePayPalCheckout}
                disabled={isProcessing}
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Pay with PayPal
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>

              <button
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center group"
                onClick={() => dispatch(clearCart())}
                disabled={isProcessing}
              >
                <svg className="w-4 h-4 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
