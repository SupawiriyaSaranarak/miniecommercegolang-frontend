import React, { useState, useEffect, useContext } from "react";
import Table from "./Table";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";

function AddWallet() {
  const [error, setError] = useState({});

  const history = useHistory();

  useEffect(() => {}, []);

  const [input, setInput] = useState({});
  console.log(input);

  const [file, setFile] = useState(null);

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
      formData.append("value", input.value);
      formData.append("paymentImg", file);

      await axios.post("api/wallet", formData);
      history.push("/my-goods");
    } catch (err) {
      if (err.response) {
        console.log(err);
        console.log({ server: err.response.data.message });

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
              <label htmlFor="clientEmail">มูลค่า:</label>&nbsp;&nbsp;
              <input
                className="form-control"
                type="text"
                name="value"
                placeholder="มูลค่า"
                value={input.value}
                onChange={handleInputChange}
              />
              <br />
            </div>

            <div className="form-group">
              <div>
                <label htmlFor="paymentImg">หลักฐานการชำระ:</label>&nbsp;&nbsp;
                <input type="file" onChange={handleFileChange} />
                <br />
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

export default AddWallet;
