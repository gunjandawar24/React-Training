import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component{
    state={
        //to show or hide the modal
        purchasing:false,
    }

    /*i can execute this axios.get call here in redux(setState na use kr ke hum action dispatch kar skte hai which updates our ingredients in the redux store)
    * or the better way of doing is using action-creators by redux-thunk. */
    componentDidMount(){
        this.props.onInitIngredients();
    }

    //I want array of values from ingredients objects and need to reduce it to a single value(Sum)
    //sum is constantly updated in reduce function by each element(value) of the the array
    //if sum>0 then set purchasable to true or else false.
    //now it returns either true or false.
    updatePurchaseState=(ingredients)=>{
        
        const sum=Object.keys(ingredients)
        .map(igKey=>{
            return ingredients[igKey];
        })
        .reduce((sum,elt)=>{
            return sum+elt;
        },0);
        return sum>0;

    };

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        //tell which button should be enabled or disabled. 
        const disabledInfo={
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        //{salad:true,meat:false,...} and if its true then it is disabled.

        let orderSummary=null;
        
        //will render spinner for a fraction of second when we load app for the first time..
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BurgerControls 
                        ingredientsAdd={this.props.onIngredientsAdded} 
                        ingredientsRemove={this.props.onIngredientsRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        displayOrder={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.price}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
            ingredients={this.props.ings}
            orderCancelled={this.purchaseCancelHandler}
            orderContinue={this.purchaseContinueHandler}
            price={this.props.price}/>;
        }

        //if true then show spinner..
        // if(this.state.loading){
        //     orderSummary=<Spinner />
        // }

        return(
            <Aux>
                {/*OrderSummary is re-rendending again and agian bcz it uses setState (states that are changed),so to avoid this
                if the model is you want to display then only order summary should be re-renderrd else not */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>    
        );
    }
}


const mapStateToProps = state => {
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    };
}

 const mapDispatchToProps = dispatch => {
    return{
        onIngredientsAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }

 }

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));



