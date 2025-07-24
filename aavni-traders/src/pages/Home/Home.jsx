import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import CategoriesSection from "./CategoriesSection";
import ProductsPage from "./ProductsPage";
import ComboPacksShowcase from "./ComboPacksShowcase";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <ProductShowcase />
      <ComboPacksShowcase />
    </div>
  );
}

export default Home;
