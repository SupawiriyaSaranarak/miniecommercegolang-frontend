import React, { useEffect, useState } from "react";

function TableData({
  item,
  checkbox,
  button,
  handleCheckChange,
  headers,
  editAmount,
  setData,
  showStock,
}) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    setAmount(item.Amount);
  }, []);
  const stock = item.Stock;
  const handleAddAmount = () => {
    if (amount < stock) {
      let int = amount;
      setAmount((prev) => +prev + 1);
      setData((prev) =>
        prev.map((i) =>
          i.ID == item.ID ? { ...i, Amount: +int + 1 } : { ...i }
        )
      );
    }
  };
  const handleReduceAmount = () => {
    if (amount > 1) {
      let int = amount;
      setAmount((prev) => +prev - 1);
      setData((prev) =>
        prev.map((i) =>
          i.ID == item.ID ? { ...i, Amount: +int - 1 } : { ...i }
        )
      );
    }
  };

  return (
    <tr>
      {headers.map((header) => {
        if (header === "ID" && checkbox) {
          return (
            <td>
              <input
                type="checkbox"
                value={item[header]}
                onChange={(e) => handleCheckChange(e)}
              ></input>
            </td>
          );
        }
        if (editAmount && header === "Amount") {
          return (
            <td style={{ align: "center" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  marginLeft: "150px",
                  // marginRight: "200px",
                }}
              >
                <button
                  style={
                    {
                      // padding: "10px",
                    }
                  }
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
                <button onClick={() => handleReduceAmount()}>-</button>
              </div>
            </td>
          );
        }
        if (header.includes("Img") || header.includes("Image")) {
          return (
            <td>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  margin: "0 15px",
                  objectFit: "cover",
                  overflow: "hidden",
                  objectPosition: "50% 50%",
                }}
                src={item[header]}
                alt="product-img"
              />
            </td>
          );
        }

        return <td>{item[header]}</td>;
      })}
      {button && button.map((but) => <td>{but(item.ID)}</td>)}
    </tr>
  );
}

export default TableData;
