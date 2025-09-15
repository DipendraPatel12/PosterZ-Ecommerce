import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "Collection", path: "/collection" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  const categories = [
    { label: "Movies", path: "/collection?category=movies" },
    { label: "Spiritual", path: "/collection?category=spiritual" },
    { label: "Cartoon", path: "/collection?category=cartoon" },
    { label: "Abstract", path: "/collection?category=abstract" }
  ];

  const support = [
    { label: "Help Center", path: "/help" },
    { label: "Shipping Info", path: "/shipping" },
    { label: "Returns", path: "/returns" },
    { label: "Size Guide", path: "/size-guide" }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: "#", color: "hover:text-blue-500", label: "Facebook" },
    { icon: FaInstagram, href: "#", color: "hover:text-pink-500", label: "Instagram" },
    { icon: FaTwitter, href: "#", color: "hover:text-blue-400", label: "Twitter" },
    { icon: FaLinkedin, href: "#", color: "hover:text-blue-600", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-2xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-50 blur-lg animate-pulse"></div>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                PosterZ
              </h2>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transform your space with premium quality artwork. We bring creativity, culture, and beauty to every home.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group">
                <FaEnvelope className="mr-3 text-blue-400 group-hover:animate-pulse" />
                <span className="text-sm">support@posterz.com</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group">
                <FaPhone className="mr-3 text-green-400 group-hover:animate-pulse" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300 hover:text-white transition-colors duration-300 group">
                <FaMapMarkerAlt className="mr-3 text-red-400 group-hover:animate-pulse" />
                <span className="text-sm">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quick Links
              </span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Categories
              </span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              {categories.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(category.path)}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Support
              </span>
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-500 to-blue-600 rounded-full"></div>
            </h3>
            <ul className="space-y-3 mb-8">
              {support.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group"
                  >
                    <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
              <h4 className="text-sm font-semibold text-white mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                />
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-r-lg transition-all duration-300 transform hover:scale-105">
                  <FaEnvelope className="text-white text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Trust Badges */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            
            {/* Social Media */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm mr-4">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                >
                  <social.icon className="text-lg group-hover:animate-pulse" />
                </a>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                <span>Fast Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700"></div>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>&copy; {currentYear} PosterZ. All Rights Reserved.</span>
              <span className="mx-2">•</span>
              <span className="flex items-center">
                Made with <FaHeart className="text-red-500 mx-1 animate-pulse" /> for art lovers
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <button 
                onClick={() => navigate('/privacy')}
                className="hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => navigate('/terms')}
                className="hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </button>
              <button 
                onClick={() => navigate('/cookies')}
                className="hover:text-white transition-colors duration-300"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70">
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-pulse"></div>
      </div>
    </footer>
  );
};

export default Footer;