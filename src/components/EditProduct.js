import React, { useState, useEffect, useContext } from "react";
import Table from "./Table";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory, useParams } from "react-router-dom";

function EditProduct() {
  const [error, setError] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [input, setInput] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`api/product/${id}`);
      const product = {
        name: res.data.Name,
        price: res.data.Price,
        stock: res.data.Stock,
        productImg: res.data.ProductImg,
      };
      setInput(product);
      console.log(res);
    };
    getProduct();
  }, []);

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
      formData.append("id", id);
      formData.append("name", input.name);
      formData.append("productImg", file);
      formData.append("price", input.price);
      formData.append("stock", input.stock);

      console.log(input);

      await axios.put("api/product", formData);
      history.push("/my-goods");
    } catch (err) {
      if (err.response) {
        console.log(err);
        console.log({ server: err.response.data.message });

        setError({ server: err.response.data.message });
      } else {
        console.log({ front: err.message });

        setError({ front: err.message });
      }
    }
  };

  return (
    <div className="content-body">
      <div style={{ height: "70px" }}></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <h1>?????????????????????????????????????????????</h1>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40%",
            }}
          ></div>
          <div
            style={{
              width: "75%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="clientEmail">??????????????????????????????:</label>&nbsp;&nbsp;
                <div>{input.name}</div>
                <br />
              </div>

              <div className="form-group">
                <label htmlFor="Price">????????????:</label>&nbsp;&nbsp; <br />
                <div>{input.price}</div>
              </div>
              <div className="form-group">
                <label htmlFor="paymentAmount">?????????????????????????????????:</label>&nbsp;&nbsp;
                <input
                  className="form-control"
                  type="text"
                  name="stock"
                  value={input.stock}
                  onChange={handleInputChange}
                  placeholder="?????????????????????????????????"
                />
              </div>
              <div className="form-group">
                <div>
                  <label htmlFor="paymentImg">???????????????????????????:</label>
                  <img
                    style={{
                      height: "200px",
                      width: "200px",
                      margin: "0 15px",
                      objectFit: "cover",
                      overflow: "hidden",
                      objectPosition: "50% 50%",
                    }}
                    src={input.productImg}
                  />
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
      </div>
      <div
        style={{
          height: "70px",
        }}
      ></div>
    </div>
  );
}

export default EditProduct;
