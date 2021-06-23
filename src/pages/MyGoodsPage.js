import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import MyGoodsList from "../components/MyGoodsList";

function MyGoodsPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <MyGoodsList></MyGoodsList>
      </div>
    </div>
  );
}

export default MyGoodsPage;
