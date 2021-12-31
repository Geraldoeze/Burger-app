import React from 'react'
import Order from '../../Comps/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'
import * as actions from '../../hoc/store/action/index'
import { connect } from 'react-redux';
import Spinner from '../../Comps/UI/Spinner/Spinner'

class Orders extends React.Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }
 
    render() { 
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                    <Order 
                        ingredients={order.ingredients}
                        price={order.price}      
                        key={order.id }/>
                ))}
            
        
        return ( 
            <div>
                {orders}
            </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)( withErrorHandler(Orders, axios ));