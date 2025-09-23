import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
const Client_url = import.meta.env.VITE_REACT_APP_API_URL
const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: ["", "", "", ""],
    password: "",
    confirmPassword: "",
  });
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Timer for OTP resend
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0 && currentStep === 2) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, currentStep]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData({ ...formData, otp: newOtp });

      // Auto-focus next input
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace with actual API call
      const response = await fetch(`${Client_url}/api/auth/forgetpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      
        const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to send OTP");
        return;
      }

      toast.success(data.message || "OTP sent successfully!");

      setCurrentStep(2);
      setTimer(300); // 5 minutes
      setCanResend(false);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpString = formData.otp.join("");
    if (otpString.length !== 4) {
      toast.error("Please enter complete 4-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace with actual API call
      const response = await fetch(`${Client_url}/api/auth/verifyotp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: otpString })
      });
      
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "OTP verification failed");
        return;
      }

      toast.success(data.message || "OTP verified successfully!");
      setCurrentStep(3);
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Replace with actual API call
      const response = await fetch(`${Client_url}/api/auth/resetpassword`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password,
          otp: formData.otp.join("")
        })
      });
      
    const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Password reset failed");
        return;
      }

      toast.success(data.message || "Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("OTP resent successfully!");
      setTimer(300);
      setCanResend(false);
      setFormData({ ...formData, otp: ["", "", "", ""] });
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                      currentStep >= step
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-white/60 border-2 border-gray-300 text-gray-400"
                    }`}
                  >
                    {currentStep > step ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-8 h-0.5 transition-all duration-300 ${
                        currentStep > step ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
            {/* Card Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>

            <AnimatePresence mode="wait">
              {/* Step 1: Email Input */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      Forgot Password?
                    </h1>
                    <p className="text-gray-600">Enter your email to receive OTP</p>
                  </div>

                  <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">
                        Email Address
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending OTP...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Send OTP
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      Verify OTP
                    </h1>
                    <p className="text-gray-600">Enter the 4-digit code sent to</p>
                    <p className="text-blue-600 font-medium">{formData.email}</p>
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    {/* OTP Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block text-center">
                        Enter Verification Code
                      </label>
                      <div className="flex justify-center space-x-3">
                        {formData.otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="text-center">
                      {timer > 0 ? (
                        <p className="text-gray-600">
                          Resend OTP in{" "}
                          <span className="text-blue-600 font-semibold">{formatTime(timer)}</span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={handleResendOtp}
                          disabled={isLoading}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Verifying...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Verify OTP
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Step 3: Reset Password */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                      </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      Reset Password
                    </h1>
                    <p className="text-gray-600">Create a new secure password</p>
                  </div>

                  <form onSubmit={handleResetPassword} className="space-y-6">
                    {/* New Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">
                        New Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">
                        Confirm Password
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="Confirm new password"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="bg-gray-50/80 rounded-xl p-4">
                      <p className="text-xs text-gray-600 mb-2 font-medium">Password requirements:</p>
                      <ul className="text-xs text-gray-500 space-y-1">
                        <li className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          At least 8 characters
                        </li>
                        <li className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          One uppercase letter
                        </li>
                        <li className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                          One number
                        </li>
                      </ul>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Resetting Password...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            Change Password
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Back to Login Link */}
            <div className="text-center mt-8 relative">
              <p className="text-gray-600">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 relative group"
                >
                  Sign In
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;