import React from "react";
import HeroSection from "./HeroSection";
import ProductShowcase from "./ProductShowcase";
import CategoriesSection from "./CategoriesSection";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <ProductShowcase />
    </div>
  );
}

export default Home;
