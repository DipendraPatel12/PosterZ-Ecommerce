// Navbar.js
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/slices/authSlice";
import Cart from "./Cart";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Get auth state from Redux
  const { user, token } = useSelector((state) => state.auth);

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Calculate total quantity in cart
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Collection', path: '/collection' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div
              className="group cursor-pointer flex items-center space-x-2"
              onClick={() => navigate("/")}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                PosterZ
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {token ? (
                <div className="flex items-center space-x-4">
                  {user?.isAdmin && (
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      Admin
                    </button>
                  )}
                  <button
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition-all duration-300 group"
                    onClick={handleLogout}
                  >
                    <FaUser className="group-hover:animate-pulse" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate("/login")}
                >
                  <FaUser />
                  <span>Login</span>
                </button>
              )}

              {/* Cart Button */}
              <button
                className="relative group bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl p-3 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsCartOpen(true)}
              >
                <FaShoppingCart size={20} className="group-hover:animate-bounce" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse min-w-[1.5rem] text-center">
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button - Fixed positioning */}
            <button
              className="md:hidden relative z-50 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <FaTimes className="text-gray-700 transform rotate-0 transition-transform duration-300" size={18} />
              ) : (
                <FaBars className="text-gray-700" size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Fixed positioning and overflow */}
        <div className={`md:hidden absolute left-0 right-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 transform transition-all duration-300 z-30 ${
          menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ 
          top: '100%',
          maxHeight: 'calc(100vh - 5rem)'
        }}
        >
          <div className="container mx-auto px-4 py-6 space-y-4 overflow-y-auto h-full">
            {/* Mobile Navigation */}
            {navigationItems.map((item, index) => (
              <button
                key={item.path}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-300"
                onClick={() => {
                  navigate(item.path);
                  setMenuOpen(false);
                }}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </button>
            ))}

            <div className="border-t border-gray-200 pt-4 space-y-3">
              {token ? (
                <>
                  {user?.isAdmin && (
                    <button
                      className="w-full px-4 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-medium transition-all duration-300"
                      onClick={() => {
                        navigate("/admin/dashboard");
                        setMenuOpen(false);
                      }}
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <button
                    className="flex items-center space-x-3 w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium transition-all duration-300"
                    onClick={handleLogout}
                  >
                    <FaUser />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  className="flex items-center space-x-3 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium transition-all duration-300"
                  onClick={() => {
                    navigate("/login");
                    setMenuOpen(false);
                  }}
                >
                  <FaUser />
                  <span>Login</span>
                </button>
              )}

              <button
                className="flex items-center justify-between w-full px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300"
                onClick={() => {
                  setIsCartOpen(true);
                  setMenuOpen(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <FaShoppingCart />
                  <span>Shopping Cart</span>
                </div>
                {totalQuantity > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20"></div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Show Cart Component if `isCartOpen` is true */}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </>
  );
};

export default Navbar;