import React from 'react';
import Modal from "../../Comps/UI/Modal/Modal";
import Aux from "../Auxillary";


const withErrorHandler = ( WrappedComponent, axios) => {
   return class extends React.Component {
       state = {
           error: null
       }

       UNSAFE_componentWillMount () {
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
           });
           this.resInterceptor = axios.interceptors.request.use(res => res, error => {
              this.setState({error: error})
              return 
           })
       }

       UNSAFE_componentWillUnmount(){
            console.log('Will Unmount', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.request.eject(this.resInterceptor)
       }

       errorConfirmedHandler = () => {
           this.setState({error: null})
       } 

       render() {
        return ( 
            <Aux>
                <Modal 
                    modalClosed={this.errorConfirmedHandler}
                    show={this.state.error}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props } />
            </Aux>
         );
       }
   }

   
   
   
}
 
export default withErrorHandler;