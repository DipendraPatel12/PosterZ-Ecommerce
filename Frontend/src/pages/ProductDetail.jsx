import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetails } from "../Redux/slices/productSlice";
import { addToCart } from "../Redux/slices/cartSlice";
import Loader from "../components/Loader";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productDetails, status } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = async () => {
    if (isAdding) return;
    
    setIsAdding(true);
    dispatch(
      addToCart({
        id: id,
        name: productDetails.productName,
        price: productDetails.price,
        image: productDetails.image,
        quantity: quantity,
      })
    );

    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => Math.min(prev + 1, productDetails.stock || 99));
    } else if (type === 'decrement') {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock > 0) return { text: 'Available', color: 'text-green-600', bg: 'bg-green-100' };
    return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4 text-sm">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate('/collection')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(productDetails.stock);
  const images = productDetails.images || [productDetails.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-6 max-w-7xl">
        {/* Compact Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-600 mb-4">
          <button onClick={() => navigate('/')} className="hover:text-blue-600 transition-colors">
            Home
          </button>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <button onClick={() => navigate('/category')} className="hover:text-blue-600 transition-colors">
            Collection
          </button>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-800 font-medium truncate text-xs">{productDetails.productName}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-8 h-fit">
          {/* Image Section - 2 columns */}
          <div className="lg:col-span-2 space-y-3">
            {/* Main Image - Smaller */}
            <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/5', maxHeight: '400px' }}>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              )}
              <img
                src={images[selectedImage]}
                alt={productDetails.productName}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x500?text=No+Image';
                  setImageLoaded(true);
                }}
              />
              
              {/* Compact Image Navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-white transition-all duration-300"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Compact Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section - 3 columns */}
          <div className="lg:col-span-3 space-y-4">
            {/* Header Section */}
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-5">
              {/* Category & Title */}
              <div className="mb-3">
                {productDetails.category && (
                  <span className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 text-xs font-medium px-2 py-1 rounded-full mb-2">
                    {productDetails.category}
                  </span>
                )}
                <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                  {productDetails.productName}
                </h1>
              </div>

              {/* Rating & Price Row */}
              <div className="flex items-center justify-between mb-3">
                {/* Rating */}
                {productDetails.rating && (
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(productDetails.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{productDetails.rating}</span>
                    {productDetails.reviewCount && (
                      <span className="text-gray-500 text-sm">({productDetails.reviewCount})</span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="text-right">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {formatPrice(productDetails.price)}
                    </span>
                    {productDetails.originalPrice && productDetails.originalPrice > productDetails.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(productDetails.originalPrice)}
                      </span>
                    )}
                  </div>
                  {productDetails.originalPrice && productDetails.originalPrice > productDetails.price && (
                    <div className="inline-block bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full mt-1">
                      Save {formatPrice(productDetails.originalPrice - productDetails.price)}
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                  <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${stockStatus.color.replace('text-', 'bg-')}`}></div>
                  {stockStatus.text}
                </span>
                {productDetails.stock > 0 && (
                  <span className="text-gray-600 text-xs">
                    {productDetails.stock} items available
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {productDetails.description && (
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{productDetails.description}</p>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border-2 border-gray-200 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                    className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-l-lg"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-3 py-1.5 font-medium text-sm min-w-[2.5rem] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    disabled={quantity >= (productDetails.stock || 99)}
                    className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-r-lg"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding || productDetails.stock === 0}
                className={`w-full group/btn relative overflow-hidden rounded-lg font-semibold py-3 px-6 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : productDetails.stock === 0
                    ? 'bg-gray-300 text-gray-500'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:shadow-lg hover:shadow-blue-500/25'
                }`}
              >
                <span className={`flex items-center justify-center transition-all duration-300 ${isAdding ? 'opacity-0' : 'opacity-100'}`}>
                  <svg className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  {productDetails.stock === 0 ? 'Out of Stock' : `Add ${quantity} to Cart`}
                </span>

                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isAdding ? 'opacity-100' : 'opacity-0'}`}>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </span>
              </button>

              {/* Total Price Display */}
              <div className="text-center pt-2 border-t border-gray-200/50">
                <span className="text-sm font-semibold text-gray-700">
                  Total: <span className="text-blue-600">{formatPrice(productDetails.price * quantity)}</span>
                </span>
              </div>
            </div>

            {/* Features/Benefits - Horizontal */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center space-x-2 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for shimmer effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;