import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../CartFeature/ProductCard";
import { useStore } from "../../store/useStore";

const ComboPacksShowcase = () => {
  const {
    comboPacks = { data: [] }, // Provide default value
    loadingStates: { comboPacks: loadingComboPacks },
    errors: { comboPacks: comboPacksError },
    fetchComboPacks,
  } = useStore();
  console.log(comboPacks);
  useEffect(() => {
    fetchComboPacks();
  }, [fetchComboPacks]);

  if (loadingComboPacks) {
    return (
      <div className="py-16 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (comboPacksError) {
    return (
      <div className="py-16 bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{comboPacksError}</div>
      </div>
    );
  }

  // Safely check for combo packs data
  const hasComboPacks = comboPacks?.length > 0;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Combo Packs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Special bundles with great discounts
          </p>
        </div>

        {hasComboPacks ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comboPacks?.map((combo, index) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {combo.name}
                    </h3>
                    <div className="text-right">
                      <span className="text-gray-500 line-through mr-2">
                        ${combo.price}
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${combo.discount_price}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {combo.products?.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-lg p-3 flex flex-col items-center"
                      >
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="h-20 w-20 object-contain mb-2"
                          />
                        ) : (
                          <div className="h-20 w-20 bg-gray-100 rounded flex items-center justify-center mb-2">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                        <p className="text-sm font-medium text-center">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {product.pivot?.quantity || 1}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/combo-packs/${combo.slug}`}
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Currently no combo packs available
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComboPacksShowcase;
