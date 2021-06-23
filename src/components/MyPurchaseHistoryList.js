import React, { useState, useEffect } from "react";
import Table from "./Table";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

import OrderCard from "./OrderCard";
function MyPurchaseHistoryList() {
  const [trigger, setTrigger] = useState(false);
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [deliveringOrders, setDeliveringOrders] = useState([]);
  const [orderHistories, setOrderHistories] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res1 = await axios.get("api/order-buyer?status=ordered");
        setOrders(res1.data);
        const res2 = await axios.get("api/order-buyer?status=accepted");
        setAcceptedOrders(res2.data);
        const res3 = await axios.get("api/order-buyer?status=delivered");
        setDeliveringOrders(res3.data);
        const res4 = await axios.get("api/order-buyer?status=finished");
        setOrderHistories(res4.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProduct();
  }, [trigger]);

  const buttonCancelOrder = [
    function (id) {
      return (
        <button onClick={() => handleCancelOrder(id)}>ยกเลิกคำสั่งซื้อ</button>
      );
    },
  ];
  const handleCancelOrder = async (id) => {
    console.log(id);
    await axios.put(`/api/order/${id}/canceled`);
    setTrigger((prev) => !prev);
  };
  const buttonGetProduct = [
    function (id) {
      return <button onClick={() => handleGetProduct(id)}>ยอมรับสินค้า</button>;
    },
  ];
  const handleGetProduct = async (id) => {
    console.log(id);
    await axios.put(`/api/order/${id}/finished`);
    setTrigger((prev) => !prev);
  };

  return (
    <div className="content-body">
      {orders && (
        <div>
          <div className="table-name">คำสั่งซื้อ</div>

          <div>
            <Table
              items={orders}
              checkbox={false}
              button={buttonCancelOrder}
            ></Table>
          </div>
        </div>
      )}
      {acceptedOrders && (
        <div>
          <div className="table-name">คำสั่งซื้อที่ได้รับการตอบรับ</div>

          <div>
            <Table items={acceptedOrders}></Table>
          </div>
        </div>
      )}
      {deliveringOrders && (
        <div>
          <div className="table-name">คำสั่งซื้อที่กำลังจัดส่ง</div>

          <div>
            <Table items={deliveringOrders} button={buttonGetProduct}></Table>
          </div>
        </div>
      )}
      {orderHistories && (
        <div>
          <div className="table-name">ประวัติการสั่งซื้อ</div>

          <div>
            <Table items={orderHistories}></Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPurchaseHistoryList;
