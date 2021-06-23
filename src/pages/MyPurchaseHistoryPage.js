import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import MyPurchaseHistoryList from "../components/MyPurchaseHistoryList";

function MyPurchaseHistoryPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <MyPurchaseHistoryList></MyPurchaseHistoryList>
      </div>
    </div>
  );
}

export default MyPurchaseHistoryPage;
