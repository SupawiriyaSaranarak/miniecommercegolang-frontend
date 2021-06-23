import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import MyCartList from "../components/MyCartList";

function MyCartPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <MyCartList></MyCartList>
      </div>
    </div>
  );
}

export default MyCartPage;
