import React from 'react'
import Order from '../../Comps/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders'

class Orders extends React.Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get(`/orders.json`)
            .then(res => {
                 const fetchedData = [];
                 console.log(res.data)
                 for (let key in res.data){
                     fetchedData.push({
                         ...res.data[key],
                         id: key
                     });
                 }
                console.log(fetchedData)
                this.setState({orders: fetchedData, loading: false});
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }
 
    render() { 
        console.log(this.state.orders)
        return ( 
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        ingredients={order.ingredients}
                        price={order.price}      
                        key={order.id }/>
                ))}
            </div>
            );
    }
}
 
export default withErrorHandler(Orders, axios );