import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Comps/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Comps/containers/Checkout/Checkout';
import { Routes, Route } from 'react-router-dom'
import withRouter from './hoc/withRouter/withRouter';
import ContactData from './Comps/containers/Checkout/ContactData/ContactData';

class App extends Component {
  
  render() {  
    
    return(
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout" element={<Checkout/>} />        
          <Route path="/" exact element={<BurgerBuilder/>} />
          <Route path="/checkout/contact-data" element={<ContactData/>} /> 

        </Routes> 
      </Layout>
    </div>
    );
  }
}
 
export default withRouter(App);