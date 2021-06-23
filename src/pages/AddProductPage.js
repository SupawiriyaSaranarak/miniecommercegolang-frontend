import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import AddProduct from "../components/AddProduct";
function AddProductPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <AddProduct />
      </div>
    </div>
  );
}

export default AddProductPage;
