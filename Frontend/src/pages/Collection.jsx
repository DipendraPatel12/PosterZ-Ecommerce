import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/slices/productSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";

const Collection = () => {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log("Products Data:", products);

  const categories = ["All", "Movies", "Spiritual", "Cartoon"];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    } else if (sortOption === "high-to-low") {
      return b.price - a.price;
    } else if (sortOption === "newest") {
      return (
        new Date(b.createdAt || "2024-01-01") -
        new Date(a.createdAt || "2024-01-01")
      );
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Explore Our Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover premium posters & art prints crafted with passion and delivered with excellence
          </p>
          <div className="flex items-center justify-center mt-6 space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              Free Shipping
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
              Premium Quality
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              Fast Delivery
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    {category}
                    {category !== "All" && (
                      <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                        {category === "All" ? products.length : products.filter(p => p.category?.toLowerCase() === category.toLowerCase()).length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sorting Filter */}
            <div className="w-full lg:w-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Sort By</h3>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-12 text-sm font-medium focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer hover:border-gray-300"
                >
                  <option value="newest">✨ Newest First</option>
                  <option value="low-to-high">💰 Price: Low to High</option>
                  <option value="high-to-low">💎 Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200/50">
            <p className="text-sm text-gray-600">
              {selectedCategory === "All" 
                ? `Showing all ${sortedProducts.length} products` 
                : `Showing ${sortedProducts.length} products in "${selectedCategory}" category`}
            </p>
          </div>
        </div>

        {/* Content Section */}
        {status === "loading" ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : (
          <>
            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedProducts.map((product, index) => (
                  <div 
                    key={product._id} 
                    className="transform hover:scale-105 transition-all duration-300"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">No Products Found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We couldn't find any products in the "{selectedCategory}" category. Try selecting a different category or check back later.
                </p>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  View All Products
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Collection;