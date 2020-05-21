import React, {  } from 'react';
import { Route , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = props =>  {



    // state = {
    //     ingredients: null,
    //     price:0
    // }

    // //search includes url and so on..
    // //We use willmount instead of didMount bcz we want this component to be rendered before child components.
    // componentWillMount () {
    //     const query = new URLSearchParams( this.props.location.search );
    //     const ingredients = {};
    //     let price = 0;
    //     for ( let param of query.entries() ) {
    //         // ['salad', '1']
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState( { ingredients: ingredients, totalPrice: price } );
    // }

    const checkoutCancelled = () => {
        props.history.goBack();
    }

    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data');
    }

        // if ingredients not been loaded yet
        let summary = <Redirect to="/" />
        if(props.ings){
            const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null ;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelled}
                        checkoutContinued={checkoutContinued}/> 
                    <Route 
                        path={props.match.path + '/contact-data'}
                        component={ContactData}
                        // render={ (props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
                    />       
                </div>
                
            )
        }
        return summary ;
    }

const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);

//render is getting special props from the server like history.