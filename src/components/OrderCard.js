import React from "react";
import Table from "./Table";

function OrderCard({ items, checkbox, handleCheckChange }) {
  return (
    <div>
      <Table
        items={items}
        checkbox={checkbox}
        handleCheckChange={handleCheckChange}
      ></Table>
    </div>
  );
}

export default OrderCard;
