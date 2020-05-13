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


class BurgerBuilder extends Component{
    state={
        //purchasable is used to unlock/enabled or disabled the ORDER button.
        // purchasable:false,
        //to show or hide the modal
        purchasing:false,
        //when loading is true i want to show the spinner and on false orderSummary.
        // loading:false,
        // error:false
       
    }

    //i can execute this axios.get call here in redux(setState na use kr ke hum action dispatch kar skte hai which updates our ingredients in the redux store)
    //or the better way of doing is using action-creators by redux-thunk.
    componentDidMount(){
        console.log(this.props);
        this.props.onInitIngredients();
        // axios.get('https://burger-builder-ea9c2.firebaseio.com/ingredients.json')
        // .then( response => {
        //     this.setState({ingredients: response.data});
        // })
        // .catch(error =>{
        //     this.setState({error:true})
        // });
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



/* addIngredientsHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    const updatedCount=oldCount+1;
    const updatedIngredients={
        ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceAddition=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice+priceAddition;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

}

removeIngredientsHandler=(type)=>{
    const oldCount=this.state.ingredients[type];
    if(oldCount<=0){
        return;
    }
    const updatedCount=oldCount-1;
    const updatedIngredients={
        ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceDeduction=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice-priceDeduction;
    this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

}
*/

purchaseHandler=()=>{
    this.setState({purchasing:true})
}

purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
}

purchaseContinueHandler=()=>{
    // // alert('You can Continue...!')
    this.props.onInitPurchase();
    this.props.history.push('/checkout');

    /*const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');
        

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        */
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
                {/*OrderSummary is re0rendending again agian bcz it uses setState (states that are changed),so to avoid this
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
        error:state.burgerBuilder.error
    };
}

 const mapDispatchToProps = dispatch => {
    return{
        onIngredientsAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientsRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }

 }

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));


