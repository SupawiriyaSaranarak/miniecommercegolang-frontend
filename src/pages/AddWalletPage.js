import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import AddWallet from "../components/AddWallet";
function AddWalletPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div className="page-body">
        <AddWallet />
      </div>
    </div>
  );
}

export default AddWalletPage;
