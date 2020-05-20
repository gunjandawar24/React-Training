import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject , checkValidity } from '../../../shared/utility';

const ContactData = props => {

   const [orderForm,setOrderform] = useState({
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        })
        const [formIsValid,setFormIsValid] = useState(false);
    

    const orderHandler = (event) => {
        //avoid reloading the page(does not make a new request.)
        event.preventDefault();
        // console.log(this.props.ingredients);
 
        // this.setState({ loading:true });
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const order ={
        ingredients:props.ings,
        //recalculate the price on server (in real App)
        price: props.price,
        orderData: formData,
        userId: props.userId
    }

    props.onOrderBurger(order,props.token);

    // axios.post('/orders.json',order)
    // .then(response => {
    //     this.setState({ loading:false});
    //     //will take me back to home page after clicking order.
    //     this.props.history.push('/');
    //     // console.log(response)
    // })
    // .catch(error =>{
    //     //  console.log(error));
    //      this.setState({ loading:false});
    // });
            
}

    //here i want to clone deeply.(bcoz order object has nested objects 
    // and when we mutate using setState it will change original data.)
    const inputChangedHandler = (event, inputIdentifier) => {
        
         //Example-email
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            //Setting its value
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderform(updatedOrderForm);
        setFormIsValid(formIsValid);
    }


        //convert orderForm object into array so that i can loop through.
        // i am pushing object into an array..
        //id:key -> name,street..
        //config:this.state.orderForm[key] ->stores all the config details.(right side data)
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key]
            });
        }

        let form = ( 
        <form onSubmit={orderHandler}>
            {/* <Input inputtype="input"  type="text" name="name" placeholder="Your name" /> */}
            
            {formElementsArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)} />
                
                ))}

            <Button btnType="Success" disabled={!formIsValid}>Order</Button>
        </form>
);
        if(props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details : </h4>
                {form}
            </div>

        );
        }
        

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
       
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));