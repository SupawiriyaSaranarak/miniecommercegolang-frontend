import React from "react";
import TableData from "./TableData";

function Table({
  items,
  checkbox,
  handleCheckChange,
  data,
  setData,
  editAmount,
  button,
  showStock
}) {
  const types = [
    { id: 1, name: "สิ้นค้าเบ็ดเตล็ด" },
    { id: 2, name: "น้ำหอม" },
    { id: 5, name: "โทรศัพท์มือถือ" },
    { id: 8, name: "เครื่องใช้ไฟฟ้า" },
  ];
  let headers = [];
  for (let k in items[0]) {
    headers.push(k);
  }
  console.log(headers);
  return (
    <div>
      <table>
        <tr>
          {headers?.map((item) => {
            if (item === "id" && checkbox) {
              return <th>เลือก</th>;
            }
            return <th>{item}</th>;
          })}
          {button && <th>action</th>}
        </tr>
        {items?.map((item) => {
          return (
            <TableData
              item={item}
              checkbox={checkbox}
              handleCheckChange={handleCheckChange}
              headers={headers}
              editAmount={editAmount}
              setData={setData}
              button={button}
            />
          );
        })}
      </table>
    </div>
  );
}

export default Table;
