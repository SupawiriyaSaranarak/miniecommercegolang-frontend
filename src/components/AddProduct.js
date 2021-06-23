import React, { useState, useEffect, useContext } from "react";
import Table from "./Table";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function AddProduct() {
  const [error, setError] = useState({});

  const history = useHistory();

  useEffect(() => {}, []);

  const [input, setInput] = useState({});
  console.log(input);
  const [accomodationId, setAccomodationId] = useState([]);
  // upload picture
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  // const [productImg, setProductImg] = useState(null);

  const handleFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setError({});
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("productImg", file);
      formData.append("price", input.price);
      formData.append("stock", input.stock);

      console.log(input);

      await axios.post("api/product", formData);
      history.push("/my-goods");

      // console.log(response);
      // alert(response.data.message);
      // history.push("/booking/all");

      // console.log(response);
      // alert(response.data.message);

      // history.push("/booking/get-booking-by-id/:id");
    } catch (err) {
      if (err.response) {
        console.log(err);
        console.log({ server: err.response.data.message });
        // alert(err.response.data.message);
        // return (
        //   <Alert
        //     message="Error Text"
        //     description={err.response.data.message}
        //     type="error"
        //     closable
        //     // onClose={onClose}
        //   />
        // );

        setError({ server: err.response.data.message });
      } else {
        console.log({ front: err.message });
        // alert(err.message);
        setError({ front: err.message });
      }
    }
  };

  return (
    <div className="content-body">
      <div style={{ height: "auto" }}></div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "25%",
          }}
        ></div>
        <div
          style={{
            width: "75%",
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="clientEmail">ชื่อสินค้า:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="ชื่อสินค้า"
                value={input.name}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <label htmlFor="Price">ราคา:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="price"
                value={input.price}
                onChange={handleInputChange}
                placeholder="ราคา"
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentAmount">จำนวนสินค้า:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="stock"
                value={input.stock}
                onChange={handleInputChange}
                placeholder="จำนวนสินค้า"
              />
            </div>
            <div className="form-group">
              <div>
                <label htmlFor="paymentImg">รูปสินค้า:</label>&nbsp;&nbsp;
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="file" onChange={handleFileChange} />
                <br />
              </div>
            </div>

            {/* <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>&nbsp;&nbsp;
              <select
                id="paymentMethod"
                name="paymentMethod"
                onChange={handleInputChange}
              >
                <option name="paymentMethod" selected>
                  Select Payment Method
                </option>
                <option name="paymentMethod" value="CASH">
                  CASH
                </option>
                <option name="paymentMethod" value="CREDIT">
                  CREDIT
                </option>
                <option name="paymentMethod" value="TRANSFER">
                  TRANSFER
                </option>
              </select>
            </div> */}

            <button
              style={{
                backgroundColor: "rgba(174, 115, 75, 1)",
                border: "none",
                color: "white",
                borderRadius: "20px",
                height: "32px",
                width: "90px",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div
        style={{
          height: "70px",
        }}
      ></div>
    </div>
  );
}

export default AddProduct;
