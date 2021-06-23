import React from "react";
import { useHistory } from "react-router-dom";

function Category() {
  const categories = [
    { id: 1, name: "รถยนต์" },
    { id: 2, name: "เครื่องสำอาง" },
  ];
  const history = useHistory();
  return (
    <div
      className="category-box"
      style={{
        width: "15%",
        height: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "white",
        height: "90vh",
        boxShadow: "5px 0px rgba(141, 141, 141, 0.514)",
      }}
    >
      <div>
        <b>หมวดหมู่</b>
      </div>
      {categories?.map((item) => (
        <div>
          <a onClick={() => console.log(item?.id)}>{item?.name}</a>
        </div>
      ))}
    </div>
  );
}

export default Category;
