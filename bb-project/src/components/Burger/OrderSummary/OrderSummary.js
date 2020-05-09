import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentDidUpdate(){
        console.log('[OrdersSummary] will update...');
        
    }
    
    render(){
        const ingredientSummary=Object.keys(this.props.ingredients)
        .map(igKey=>{
            return (
            <li key={igKey}>
                <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });
        return(
            <Aux>
            <h3>Order Details: </h3>
            <p>Your burger contains the following ingredients : </p>
            <ul>
                {ingredientSummary}
            </ul>
                <p><strong>Total Price of Burger is: {this.props.price.toFixed(2)}</strong></p>
            <p>
                Continue to Checkout?
            </p>
            <Button btnType="Danger" clicked={this.props.orderCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.orderContinue}>CONTINUE</Button>
        </Aux>

        );


    }



}

export default OrderSummary;