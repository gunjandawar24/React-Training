import React , { Component, useEffect, useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject ,checkValidity } from '../../shared/utility';

const Auth = props => {

   const [authForm,setAuthForm] = useState({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        })
        
        //we should be in sign up mode initially.
        const [isSignup,setIsSignup] = useState(true);
    

     const {buildingBurger,authRedirectPath,onSetAuthRedirectPath} = props;   
    //if we are not building the burger and we are trying to reach to checkout.
    //then take me to the '/' page from '/auth' page.
    useEffect(() => {
        if(!buildingBurger && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }
    },[buildingBurger,authRedirectPath,onSetAuthRedirectPath]);

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( authForm, {
            [controlName]: updateObject( authForm[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, authForm[controlName].validation ),
                touched: true
            } )
        } );
        setAuthForm(updatedControls);
    }

   const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value,authForm.password.value,isSignup);
    }

   const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

        //converting state object into array
        const formElementsArray = [];
        for (let key in authForm) {
            formElementsArray.push({
                id: key,
                config: authForm[key]
            });
        }

        //now i'll loop through the array and create a form using jsx <Input />
        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

        if(props.loading){
            form = <Spinner />
        }

        let errorMessage =null;
        if(props.error){
            errorMessage = (
            <p>{props.error}</p>
            );
        }
        
        //after authentication redirect to either checkout page or to the home('/') page.
        let authRedirect = null ;
        if(props.isAuthenticated){
            authRedirect = <Redirect to={props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP' }</Button>
            </div>
        );
    }

const mapStateToProps = state => {

    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath : state.auth.authRedirectPath
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Auth);