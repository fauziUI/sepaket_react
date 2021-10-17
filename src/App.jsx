import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import VerificationPage from './pages/Auth/verifiication'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Cart from './pages/Cart'
import History from './pages/History'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import MyNavbar from './components/MyNavbar'
import ManageProductsAdmin from "./pages/ManageProductsAdmin";
import FrontPage from './pages/frontPage'

import { connect } from "react-redux";
import { userKeepLogin, checkStorage } from "./redux/actions/user";
import { getCartData } from "./redux/actions/cart";
import RestockProductsAdmin from "./pages/RestockProductsAdmin";
import forgotPassword from "./pages/Auth/forgotPassword";

class App extends React.Component {
  componentDidMount() {
    const userLocalStorage = localStorage.getItem("userDataEmmerce");

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.username)
      //this.props.getCartData(userData.id);
    } else {
      this.props.checkStorage();
    }
  }

  render() {
    // if (this.props.userGlobal.storageIsChecked) {
    return (
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route component={Login} path="/Login" />
          <Route component={forgotPassword} path="/forgot-password" />
          <Route component={Register} path="/Register" />
          <Route component={VerificationPage} path="/auth/:token" />
          <Route component={Profile} path="/Profile" />
          <Route component={Admin} path="/Admin" />
          <Route component={Cart} path="/Cart" />
          <Route component={History} path="/History" />
          <Route component={ProductDetail} path="/ProductDetail/:productId" />
          <Route component={ManageProductsAdmin} path="/admin/manageproducts" />
          <Route component={Home} path="/home" />
          <Route component={FrontPage} path="/" />
          <Route
            component={RestockProductsAdmin}
            path="/admin/restockproducts"
          />
        </Switch>
      </BrowserRouter>
    );
    // }
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
