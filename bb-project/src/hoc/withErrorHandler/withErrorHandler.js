//i am using (with) becoz will be used with export not like <Aux> /jsx element
import React,{ useState , useEffect } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

//we will wrap burger builder component hre 
const withErrorHandler = ( WrappedComponent, axios ) => {
    return props => {
        //this func will return [error, errorConfirmedHandler]
        const [error,clearError] = useHttpErrorHandler(axios);
            return (
                <Aux>
                    <Modal 
                        show={error}
                        modalClosed={clearError}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
        }
    }

export default withErrorHandler;