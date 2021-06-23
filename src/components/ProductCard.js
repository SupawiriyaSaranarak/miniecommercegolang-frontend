import React from "react";
import { useState, useContext } from "react";
import swal from "sweetalert";
import axios from "../config/axios";
import { AuthContext } from "../contexts/AuthContextProvider";

function ProductCard({ product }) {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState(0);
  console.log(product);
  const stock = product.Stock;
  const handleAddAmount = () => {
    if (amount < stock) setAmount((prev) => prev + 1);
  };
  const handleReduceAmount = () => {
    if (amount > 0) setAmount((prev) => prev - 1);
  };
  const handleAddtoCart = async () => {
    if (product.UserID == user.id) {
      swal("ไม่สามารถเพิ่มสินค้าตนเองลงตะกร้าได้!", "", "warning");
      return;
    }
    if (amount != 0) {
      const res = await axios.post("/api/cart", {
        productId: String(product.ID),
        amount,
      });
      setAmount(0);
      swal("สำเร็จ!", "ได้เพิ่มสินค้าลงตะกร้าแล้ว!", "success");
    } else {
      swal("โปรดระบุจำนวนสินค้า!", "", "warning");
    }
  };
  return (
    <div className="product-card">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <img
          className="card-image"
          src={product.ProductImg}
          alt="product-image"
        />
      </div>
      <div style={{ borderTop: "2px solid black" }}>
        <div className="card-description">
          <div style={{ size: "30px" }}>
            <strong>{product.Name}</strong>
          </div>

          <div className="card-description">
            <strong>Price:</strong> {product.Price} THB
          </div>
          <div className="card-description">
            <strong>จำนวนที่ต้องการสั่งซื้อ:</strong>
          </div>
          <div
            className="card-description"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <button
                style={{
                  border: "none",
                  backgroundColor: "black",
                  fontSize: "20px",
                  color: "white",
                  width: "25px",
                }}
                onClick={() => handleAddAmount()}
              >
                +
              </button>
              <div
                style={{
                  display: "flex",
                  backgroundColor: "white",
                  width: "50px",
                  align: "center",
                  justifyContent: "center",
                  alignItem: "center",
                }}
              >
                <div>{amount}</div>
              </div>
              <button
                style={{
                  border: "none",
                  backgroundColor: "black",
                  fontSize: "20px",
                  color: "white",
                  width: "25px",
                }}
                onClick={() => handleReduceAmount()}
              >
                -
              </button>
            </div>
            {stock - amount <= 2 && (
              <div style={{ color: "red" }}>เหลือ {stock - amount} ชิ้น</div>
            )}
          </div>
          <div style={{ margin: "auto", textAlign: "center" }}>
            <button
              style={{ borderRadius: "5px", marginTop: "10px" }}
              onClick={() => handleAddtoCart()}
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
