import React, { useState, useEffect, useContext } from "react";
import Table from "./Table";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function MyGoodsList() {
  const [trigger, setTrigger] = useState(false);
  const [orders, setOrders] = useState([]);
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [deliveringOrders, setDeliveringOrders] = useState([]);
  const [orderHistories, setOrderHistories] = useState([]);
  const [myGoods, setMyGoods] = useState([]);
  const history = useHistory();
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res1 = await axios.get("api/order-seller?status=ordered");
        setOrders(res1.data);
        const res2 = await axios.get("api/order-seller?status=accepted");
        setAcceptedOrders(res2.data);
        const res3 = await axios.get("api/order-seller?status=delivered");
        setDeliveringOrders(res3.data);
        const res4 = await axios.get("api/order-seller?status=finished");
        setOrderHistories(res4.data);
        const res5 = await axios.get("api/my-product");
        setMyGoods(res5.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProduct();
  }, [trigger]);

  const buttonAcceptOrder = [
    function (id) {
      return (
        <button onClick={() => handleAcceptedOrder(id)}>รับคำสั่งซื้อ</button>
      );
    },
  ];
  const handleAcceptedOrder = async (id) => {
    console.log(id);
    await axios.put(`/api/order/${id}/accepted`);
    setTrigger((prev) => !prev);
  };
  const buttonDeliveringOrder = [
    function (id) {
      return (
        <button onClick={() => handleDeliveringOrder(id)}>ส่งสินค้า</button>
      );
    },
  ];
  const handleDeliveringOrder = async (id) => {
    console.log(id);
    await axios.put(`/api/order/${id}/delivered`);
    setTrigger((prev) => !prev);
  };
  const buttonAddStock = [
    function (id) {
      return (
        <button onClick={() => history.push(`/edit-product/${id}`)}>
          จัดคลังสินค้า
        </button>
      );
    },
  ];

  return (
    <div className="content-body">
      {myGoods && (
        <div>
          <div className="table-name">สินค้าของฉัน</div>
          <button onClick={() => history.push("/add-product")}>
            เพิ่มสินค้า
          </button>
          <div>
            <Table
              items={myGoods}
              checkbox={false}
              button={buttonAddStock}
            ></Table>
          </div>
        </div>
      )}
      {orders && (
        <div>
          <div className="table-name">คำสั่งซื้อ</div>

          <div>
            <Table
              items={orders}
              checkbox={false}
              button={buttonAcceptOrder}
            ></Table>
          </div>
        </div>
      )}
      {acceptedOrders && (
        <div>
          <div className="table-name">คำสั่งซื้อที่ต้องจัดส่ง</div>

          <div>
            <Table
              items={acceptedOrders}
              button={buttonDeliveringOrder}
            ></Table>
          </div>
        </div>
      )}
      {deliveringOrders && (
        <div>
          <div className="table-name">คำสั่งซื้อที่อยู่ระหว่างจัดส่ง</div>

          <div>
            <Table items={deliveringOrders}></Table>
          </div>
        </div>
      )}
      {orderHistories && (
        <div>
          <div className="table-name">ประวัติการขาย</div>

          <div>
            <Table items={orderHistories}></Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyGoodsList;
