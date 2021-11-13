import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Comps/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Comps/containers/Checkout/Checkout';
import { Routes, Route } from 'react-router-dom'

class App extends Component {
  
  render() {  
    return(
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<BurgerBuilder/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes>
      </Layout>
    </div>
    );
  }
}
 
export default App;