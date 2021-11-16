import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './Comps/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Comps/containers/Checkout/Checkout';
import { Routes, Route } from 'react-router-dom'
import withRouter from './hoc/withRouter/withRouter';
// import ContactData from './Comps/containers/Checkout/ContactData/ContactData';


class App extends Component {
  state = {
    ingredients: ''
  }


  //Gets the value of state from ckeckout component
  handleCallback = (childData) => {
    this.setState({ingredients: childData})
  } 

  render() {  
    console.log(this.state.ingredients)
    return(
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout" element={<Checkout callback={this.handleCallback}/>} />        
          <Route path="/" exact element={<BurgerBuilder/>} />
          {/* <Route path="/checkout/contact-data" element={<ContactData stuff={this.ball} />} />       */}

        </Routes> 
      </Layout>
    </div>
    );
  }
}
 
export default withRouter(App);