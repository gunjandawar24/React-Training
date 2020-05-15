import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject , checkValidity } from '../../../shared/utility';

class ContactData extends Component {

    state = {
        orderForm: {
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
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        //avoid reloading the page(does not make a new request.)
        event.preventDefault();
        // console.log(this.props.ingredients);
 
        // this.setState({ loading:true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order ={
        ingredients:this.props.ings,
        //recalculate the price on server (in real App)
        price:this.props.price,
        orderData: formData,
        userId:this.props.userId
    }

    this.props.onOrderBurger(order,this.props.token);

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
    inputChangedHandler = (event, inputIdentifier) => {
        
         //Example-email
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            //Setting its value
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){

        //convert orderForm object into array so that i can loop through.
        // i am pushing object into an array..
        //id:key -> name,street..
        //config:this.state.orderForm[key] ->stores all the config details.(right side data)
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = ( 
        <form onSubmit={this.orderHandler}>
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
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                
                ))}

            <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
        </form>
);
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details : </h4>
                {form}
            </div>

        );
    }
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