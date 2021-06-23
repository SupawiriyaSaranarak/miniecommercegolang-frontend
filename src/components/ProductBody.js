import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

function ProductBody() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get("/api/product");
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProduct();
  }, []);
  return (
    <div className="product-body">
      {products.length &&
        products.map((product) => (
          <ProductCard product={product}></ProductCard>
        ))}
    </div>
  );
}

export default ProductBody;
