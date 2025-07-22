import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import useStore from "../../store/useStore";

const ProductCard = ({ product, index }) => {
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
        <Link to={`/product/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images?.[0] || "/placeholder-product.jpg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <button className="absolute top-3 right-3 bg-white/80 hover:bg-white p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110">
              <Heart className="w-4 h-4 text-rose-500" />
            </button>
          </div>
        </Link>

        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-medium text-gray-900 line-clamp-1 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            <span className="font-bold text-gray-900">₹{product.price}</span>
          </div>

          {product.specifications?.size && (
            <p className="text-xs text-gray-500 mb-2">
              Size: {product.specifications.size}
            </p>
          )}

          <div className="flex justify-between items-center mt-3">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <Link
              to={`/product/${product.id}`}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
