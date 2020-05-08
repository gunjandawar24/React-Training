//i am using (with) becoz will be used with export not like <Aux> /jsx element
import React,{Component} from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

//we will wrap burger builder component hre 
const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        //automatically generate error like network error..
        /*i want this code to get executed as soon as components is 
        created bcz it can check if igredients are nulll or not if yes then generate network error.*/
        //so this can be done using constructor or componentwillmount not with componentdidmount bcz it get executed at last
        //i want this to be called before child components are renderd 
        //if we add/wrap this hoc with other components then this constructor is called again again again so need to unmount 
        constructor () {
            super();
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
            }
    
            componentWillUnmount() {
                axios.interceptors.request.eject(this.reqInterceptor);
                axios.interceptors.response.eject(this.resInterceptor);
            }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;