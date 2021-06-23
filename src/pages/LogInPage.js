import React from "react";
import Header from "../components/Header";
import LogIn from "../components/auth/LogIn";
import Register from "../components/auth/Register";

function LogInPage() {
  return (
    <div>
      <Header></Header>
      <div class="dummy-head"></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <LogIn />
        <Register />
      </div>
    </div>
  );
}

export default LogInPage;
