import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import ProductBody from "../components/ProductBody";

function AllProductPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <ProductBody></ProductBody>
      </div>
    </div>
  );
}

export default AllProductPage;
