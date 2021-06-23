import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContextProvider";

import LogInPage from "./pages/LogInPage";
import AllProductPage from "./pages/AllProductPage";
import MyGoodsPage from "./pages/MyGoodsPage";
import MyCartPage from "./pages/MyCartPage";
import MyPurchaseHistoryPage from "./pages/MyPurchaseHistoryPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AddWalletPage from "./pages/AddWalletPage";

const userRoutes = [
  {
    path: "/all",
    component: AllProductPage,
  },
  {
    path: "/my-goods",
    component: MyGoodsPage,
  },
  {
    path: "/my-cart",
    component: MyCartPage,
  },
  {
    path: "/my-purchase-history",
    component: MyPurchaseHistoryPage,
  },

  {
    path: "/add-product",
    component: AddProductPage,
  },
  {
    path: "/edit-product/:id",
    component: EditProductPage,
  },
  {
    path: "/add-wallet",
    component: AddWalletPage,
  },
];
const publicRoutes = [
  {
    path: "/all",
    component: AllProductPage,
  },
  {
    path: "/login",
    component: LogInPage,
  },
];
function App() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Switch>
      {user &&
        user.status === "user" &&
        userRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}

      {!user &&
        publicRoutes.map((el, index) => (
          <Route key={index} exact path={el.path} component={el.component} />
        ))}
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
