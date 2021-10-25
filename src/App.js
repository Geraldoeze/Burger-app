import React, { Component } from 'react';
import './App.css';
import Layout from './Comps/Layout/Layout';
import BurgerBuilder from './Comps/containers/BurgerBuilder/BurgerBuilder';

class App extends React.Component {
  render() { 
    return(
    <div>
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
    );
  }
}
 
export default App;