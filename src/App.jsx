import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"

import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile'
import Home from './pages/Home'
import MyNavbar from './components/MyNavbar'

import { connect } from 'react-redux'
import { userKeepLogin, checkStorage } from './redux/actions/user'
import { getCartData } from './redux/actions/cart'

 
class App extends React.Component{

  componentDidMount(){
    const userLocalStorage = localStorage.getItem("userDataEmmerce")

    if (userLocalStorage) {
      const userData = JSON.parse(userLocalStorage);
      this.props.userKeepLogin(userData);
      this.props.getCartData(userData.id)
    } else {
      this.props.checkStorage()
    }
  }

  render (){
    if (this.props.userGlobal.storageIsChecked){
      return (
        <BrowserRouter>
        <MyNavbar/>
        <Switch>
          <Route component={Login} path="/Login"/>
          <Route component={Register} path="/Register"/>
          <Route component={Profile} path="/Profile"/>
          <Route component={Home} path="/"/>
        </Switch>
        </BrowserRouter>
      )
    }

    return(
      <div>
        Loading...
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return {
    userGlobal: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  checkStorage,
  getCartData
}

export default connect(mapStateToProps, mapDispatchToProps)(App)