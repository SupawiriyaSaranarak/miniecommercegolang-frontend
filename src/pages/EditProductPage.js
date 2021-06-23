import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import EditProduct from "../components/EditProduct";
function EditProductPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <EditProduct />
      </div>
    </div>
  );
}

export default EditProductPage;
