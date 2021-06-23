import React, { useContext, useEffect } from "react";
import axios from "../config/axios";
import { useHistory } from "react-router-dom";
import localStorageService from "../services/localStorageService";
import { AuthContext } from "../contexts/AuthContextProvider";

function Header() {
  const history = useHistory();
  const { user, balance, setBalance, trigger } = useContext(AuthContext);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get("api/wallet");
        setBalance(res.data[0].Balance);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProduct();
  }, [trigger]);
  const handleLogOut = (e) => {
    try {
      e.preventDefault();
      localStorageService.clearToken();
      window.location.reload();
    } catch (err) {
      console.log({ front: err.message });
    }
  };
  return (
    <div className="header">
      <div style={{ width: "20%", padding: "20px" }}>
        <a onClick={() => history.push("/all")}>Mini E-Commerce</a>
      </div>
      <div
        style={{
          width: "60%",
          padding: "5px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          <a onClick={() => history.push("/all")}>สินค้าทั้งหมด</a>
        </div>
        <div>
          <a onClick={() => history.push("/my-goods")}>ประกาศขาย</a>
        </div>
        <div>
          <a onClick={() => history.push("/my-cart")}>ตะกร้าสินค้า</a>
        </div>
        <div>
          <a onClick={() => history.push("/my-purchase-history")}>
            ประวัติการซื้อ
          </a>
        </div>
      </div>
      {!user && (
        <div
          style={{
            width: "20%",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a onClick={() => history.push("/login")}>Log in</a>
        </div>
      )}
      {user && (
        <div
          style={{
            width: "20%",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => history.push("/add-wallet")}>
            {"จำนวนเงินคงเหลือ: " + balance + "฿"}
          </button>
          <a onClick={(e) => handleLogOut(e)}>Log out</a>
        </div>
      )}
    </div>
  );
}

export default Header;
