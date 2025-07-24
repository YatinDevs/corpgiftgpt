import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStore } from "../../store/useStore";
import {
  Cpu,
  ShoppingBag,
  Shirt,
  Home,
  Smartphone,
  Watch,
  Headphones,
  Camera,
} from "lucide-react";

const CategoriesSection = () => {
  const {
    categories,
    loadingStates: { categories: loadingCategories },
    errors: { categories: categoriesError },
    fetchCategories,
  } = useStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Map category slugs to icons
  const getCategoryIcon = (slug) => {
    const iconMap = {
      electronics: <Smartphone className="h-8 w-8 text-blue-600" />,
      clothing: <Shirt className="h-8 w-8 text-green-600" />,
      "home-kitchen": <Home className="h-8 w-8 text-purple-600" />,
      // Add more mappings as needed
    };
    return iconMap[slug] || <ShoppingBag className="h-8 w-8 text-gray-600" />;
  };

  // Generate placeholder images based on category
  const getCategoryImage = (slug) => {
    const imageMap = {
      electronics:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      clothing:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "home-kitchen":
        "https://images.unsplash.com/photo-1583845112203-4549b8091f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      // Add more mappings as needed
    };
    return imageMap[slug] || "https://via.placeholder.com/500";
  };

  // Generate color classes based on index
  const getColorClass = (index) => {
    const colors = [
      "bg-blue-100",
      "bg-green-100",
      "bg-purple-100",
      "bg-amber-100",
      "bg-red-100",
      "bg-indigo-100",
      "bg-teal-100",
      "bg-gray-100",
    ];
    return colors[index % colors.length];
  };

  if (loadingCategories) {
    return (
      <div className="py-16 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{categoriesError}</div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/category/${category.slug}`} className="block">
                <div className="relative overflow-hidden rounded-xl aspect-square bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <img
                    src={getCategoryImage(category.slug)}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-end p-6">
                    <div
                      className={`${getColorClass(
                        index
                      )} p-3 rounded-full mb-3 group-hover:scale-110 transition-transform`}
                    >
                      {getCategoryIcon(category.slug)}
                    </div>
                    <h3 className="text-white font-bold text-lg sm:text-xl text-center">
                      {category.name}
                    </h3>
                    <span className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {category.products_count} products →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
