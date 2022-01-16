import React, { useEffect, Suspense } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// import { Navigate } from 'react-router';
// import Checkout from './containers/Checkout/Checkout';
import { Routes, Route } from 'react-router-dom'
import withRouter from './hoc/withRouter/withRouter';
import ContactData from './containers/Checkout/ContactData/ContactData';
// import Orders from './containers/Orders/Orders';



// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './hoc/store/action/index'


const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth')
});

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders')
});


const App = (props) => {
 
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

    let routes = (
      <div> 
        <Routes>
          
           <Route path="/" exact element={<BurgerBuilder/>} />
           
        </Routes>

      </div>
    );

      if (props.isAuthenticated) {
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
          <Suspense fallback={<p>Loading...</p>}>
          {routes}

          <Routes>
          <Route  path="/auth" element={<Auth/>} /> 
          </Routes>
        </Suspense>
      </Layout>
    </div>
    );
  
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