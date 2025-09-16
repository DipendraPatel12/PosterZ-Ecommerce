import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handlePaymentCancel, clearPaymentState } from '../Redux/slices/paymentSlice';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isProcessing, cancelled } = useSelector(state => state.payment);

  useEffect(() => {
    // Dispatch cancel action when component mounts
    if (!cancelled) {
      dispatch(handlePaymentCancel());
    }
  }, [dispatch, cancelled]);

  const handleReturnToCart = () => {
    dispatch(clearPaymentState());
    navigate('/', { state: { openCart: true } }); // You can use this state to open cart
  };

  const handleContinueShopping = () => {
    dispatch(clearPaymentState());
    navigate('/');
  };

  const handleTryAgain = () => {
    dispatch(clearPaymentState());
    navigate('/', { state: { openCart: true, retryPayment: true } });
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-spin w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Processing Cancellation</h2>
          <p className="text-gray-600">Please wait while we process your payment cancellation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        {/* Cancel Icon and Animation */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-orange-600 mb-2">Payment Cancelled</h2>
          <p className="text-gray-600 text-lg">Your payment has been cancelled and no charges were made.</p>
        </div>

        {/* Information Section */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-orange-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-orange-800 mb-2">What happened?</h3>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• You cancelled the payment process on PayPal</li>
                <li>• No money has been charged to your account</li>
                <li>• Your items are still in your shopping cart</li>
                <li>• You can complete your purchase anytime</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reasons Section */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need help with checkout?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Having trouble with PayPal? Try refreshing your browser or using a different payment method.</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Your cart items are safely saved and waiting for you.</span>
            </div>
            <div className="flex items-start">
              <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.5a9.5 9.5 0 110 19 9.5 9.5 0 010-19z" />
              </svg>
              <span>Contact our support team if you need assistance with your order.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleTryAgain}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m4.5-5a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Complete Your Purchase
          </button>

          <button
            onClick={handleReturnToCart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5" />
            </svg>
            View Cart
          </button>

          <button
            onClick={handleContinueShopping}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Continue Shopping
          </button>
        </div>

        {/* Support Contact */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Need help with your order?</p>
          <div className="flex justify-center space-x-4 text-sm">
            <a href="mailto:support@yourstore.com" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
              Email Support
            </a>
            <span className="text-gray-300">|</span>
            <a href="/help" className="text-blue-500 hover:text-blue-600 transition-colors duration-300">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;