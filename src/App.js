import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Comps/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Comps/containers/Checkout/Checkout';

class App extends Component {
  
  render() { 
    return(
    <div>
      <Layout>
        <BurgerBuilder /> 
        <Checkout />
      </Layout>
    </div>
    );
  }
}
 
export default App;