import React , { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject ,checkValidity } from '../../shared/utility';

class Auth extends Component {

    state = {
        controls : {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email address'
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
                    placeholder: 'Enter your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:6
                },
                valid: false,
                touched: false
            }
        },
        //we should be in sign up mode initially.
        isSignUp:true
    }

    //if we are not building the burger and we are trying to reach to checkout.
    //then take me to the '/' page from '/auth' page.
    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp:!prevState.isSignUp};
        })
    }

    render() {

        //converting state object into array
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
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
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage =null;
        if(this.props.error){
            errorMessage = (
            <p>{this.props.error}</p>
            );
        }
        
        //after authentication redirect to either checkout page or to the home('/') page.
        let authRedirect = null ;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP' }</Button>
            </div>
        );
    }
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