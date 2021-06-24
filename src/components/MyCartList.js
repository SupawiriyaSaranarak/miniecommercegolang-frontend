import React, { useState, useEffect, useContext } from "react";
import Table from "./Table";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

function MyCartList() {
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([]);
  const [input, setInput] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const history = useHistory();
  const { balance } = useContext(AuthContext);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const res = await axios.get("/api/cart");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllProduct();
  }, [trigger]);

  const handleCheckChange = (e) => {
    const { value, checked } = e.target;

    console.log(value);
    console.log(checked);
    if (checked) {
      const newSelect = [...selectedProduct];
      newSelect.push(value);
      setSelectedProduct(newSelect);
      // console.log(newAcc);
    }
    if (!checked) {
      const newSelect = [...selectedProduct];
      let deletedIndex = newSelect.findIndex((x) => x === value);
      console.log(deletedIndex);
      newSelect.splice(deletedIndex, 1);
      setSelectedProduct(newSelect);
      console.log(newSelect);
    }
  };
  console.log(selectedProduct);

  function calTotalPrice(selectedProduct, data) {
    console.log("xxxxxx", selectedProduct);
    console.log("xxxx", data);
    if (selectedProduct.length) {
      let newTotalPrice = 0;
      for (let p of selectedProduct) {
        for (let o of data) {
          if (o.ID == p) {
            console.log("yyy", o);
            newTotalPrice += +o.PricePerUnit * +o.Amount;
          }
        }
        setTotalPrice(newTotalPrice);
      }
    } else {
      setTotalPrice(0);
    }
  }

  console.log(totalPrice);
  useEffect(() => {
    calTotalPrice(selectedProduct, data);
    const newInput = [];
    for (let sP of selectedProduct) {
      for (let p of data) {
        if (p.ID == sP) {
          const newP = {
            ...p,
            Amount: +p.Amount,
            Price: +p.Amount * p.PricePerUnit,
          };
          newInput.push(newP);
        }
      }
    }
    setInput(newInput);
  }, [selectedProduct, data]);

  const handleOrder = async () => {
    try {
      if (balance < totalPrice) {
        swal(
          "ไม่สามารถสั่งซื้อสินค้าได้!",
          "ยอดเงินคงเหลือไม่เพียงพอ",
          "warning"
        );

        return;
      }
      const req = input.map((item) => {
        return {
          productId: `${item.ProductID}`,
          amount: item.Amount,
          price: item.Price,
        };
      });

      let orderPromises = [];
      for (let k of req) {
        orderPromises.push(await axios.post("/api/order", k));
      }
      let removeCartPromises = [];

      for (let i of input) {
        removeCartPromises.push(await axios.delete(`/api/cart/${i.ID}`));
      }

      Promise.all(orderPromises);
      Promise.all(removeCartPromises);
      setTrigger((prev) => !prev);
      history.push("/my-purchase-history");
    } catch (err) {
      console.log(err);
    }
  };
  const buttonDeleteCart = [
    function (id) {
      return <button onClick={() => handleDeleteCart(id)}>นำออก</button>;
    },
  ];
  const handleDeleteCart = async (id) => {
    console.log(id);
    await axios.delete(`/api/cart/${id}`);
    setTrigger((prev) => !prev);
  };
  return (
    <div className="content-body">
      <div>
        <div className="table-name">รถเข็นของฉัน</div>

        <div>
          <Table
            items={data}
            checkbox={true}
            handleCheckChange={handleCheckChange}
            data={data}
            setData={setData}
            editAmount={true}
            showStock={false}
            button={buttonDeleteCart}
          ></Table>
        </div>
        <div style={{ height: "40px" }}></div>
        <div
          style={{ display: "flex", flexDirection: "row", marginLeft: "70vw" }}
        >
          <div style={{ fontSize: "26px" }}>
            จำนวนเงิน: <b>{totalPrice}</b> ฿
          </div>
          <div style={{ width: "40px" }}></div>
          <button onClick={() => handleOrder()}>จ่ายเงิน</button>
        </div>
      </div>
    </div>
  );
}

export default MyCartList;
