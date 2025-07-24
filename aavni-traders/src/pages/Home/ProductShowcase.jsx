import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiFilter, FiChevronDown, FiX, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import ProductCard from "../CartFeature/ProductCard";
import { useStore } from "../../store/useStore";

const ProductsShowcase = () => {
  const {
    products = { data: [] }, // Default empty object with data array
    categories = [], // Default empty array
    loadingStates: { products: loadingProducts, categories: loadingCategories },
    errors: { products: productsError, categories: categoriesError },
    fetchProducts,
    fetchCategories,
  } = useStore();
  console.log(products);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  // Safely filter products
  const filteredProducts = products
    ? activeFilter === "All"
      ? products
      : products.filter((product) => product.category?.name === activeFilter)
    : [];

  // Safely apply search filter
  const searchedProducts =
    filteredProducts?.filter((product) => {
      const nameMatch = product.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const descMatch = product.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || descMatch;
    }) || [];

  const clearFilters = () => {
    setActiveFilter("All");
    setSearchQuery("");
  };

  if (loadingProducts || loadingCategories) {
    return (
      <div className="py-16 bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="py-16 bg-white flex items-center justify-center">
        <div className="text-red-500">{productsError || categoriesError}</div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
            <p className="text-gray-600 mt-2">
              {activeFilter === "All" ? "All products" : activeFilter}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1 md:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
            >
              <FiFilter />
              <span>Filters</span>
              <FiChevronDown
                className={`transition-transform ${
                  showMobileFilters ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(activeFilter !== "All" || searchQuery) && (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm text-gray-500">Active filters:</span>
            {activeFilter !== "All" && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {activeFilter}
                <button
                  onClick={() => setActiveFilter("All")}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
            {searchQuery && (
              <div className="flex items-center bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                Search: "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  <FiX size={16} />
                </button>
              </div>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Mobile Filters Dropdown */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              className="md:hidden mb-6 bg-white p-4 rounded-lg shadow-lg border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setActiveFilter("All");
                    setShowMobileFilters(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm text-left ${
                    activeFilter === "All"
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveFilter(category.name);
                      setShowMobileFilters(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm text-left ${
                      activeFilter === category.name
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Filters */}
        <div className="hidden md:flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveFilter("All")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              activeFilter === "All"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.name)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeFilter === category.name
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {searchedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {searchedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                animationDelay={index * 0.05}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <FiSearch size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-lg mb-4">
              No products found matching your criteria
            </p>
            <button
              onClick={clearFilters}
              className="text-gray-900 font-medium underline hover:text-blue-600"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsShowcase;
