import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { Navigate } from 'react-router';
import Checkout from './containers/Checkout/Checkout';
import { Routes, Route } from 'react-router-dom'
import withRouter from './hoc/withRouter/withRouter';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './hoc/store/action/index'


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup()
  }
  state = {
    ingredients: '',
    totalPrice: null
  }


  // //Gets the value of state from ckeckout component
  // handleCallback = (childData) => {
  //   this.setState({ingredients: childData})
  // } 

  // //Gets the totalPrice value from checkout.js
  // PriceCallback = (childData) => {
  //   this.setState({totalPrice:childData})
  // }
  render() {  

    let routes = (
      <div> 
        <Routes>
          
           <Route path="/" exact element={<BurgerBuilder/>} />
           
        </Routes>

      </div>
    );

      if (this.props.isAuthenticated) {
         routes = (
          <Routes>
              <Route path="/logout" element={<Logout />} />
              <Route path="/checkout" element={<Checkout/>} />        
              <Route path="/" exact element={<BurgerBuilder/>} />
              <Route path="/checkout/contact-data" 
                element={<ContactData />} /> 
              <Route  path="/orders" element={<Orders/>} />

          </Routes>       
         )
      }
    return(
    <div>
      <Layout>
         {routes}

        <Routes>
         <Route  path="/auth" element={<Auth/>} /> 
        </Routes>
      </Layout>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));