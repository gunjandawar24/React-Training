import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {

    // componentDidUpdate(){
    //     // console.log('[OrdersSummary] will update...');
        
    // }
    
    
        const ingredientSummary=Object.keys(props.ingredients)
        .map(igKey=>{
            return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });
        return(
            <Aux>
            <h3>Order Details: </h3>
            <p>Your burger contains the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
                <p><strong>Total Price of Burger is: {props.price.toFixed(2)}</strong></p>
            <p>
                Continue to Checkout?
            </p>
            <Button btnType="Danger" clicked={props.orderCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderContinue}>CONTINUE</Button>
        </Aux>

        );


    }

export default OrderSummary;