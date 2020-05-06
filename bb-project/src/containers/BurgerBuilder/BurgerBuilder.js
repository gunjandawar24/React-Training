import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';


const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.6,
    meat:1.5,
    bacon:1
}

class BurgerBuilder extends Component{
    state={
        ingredients:{
            cheese:0,
            meat:0,
            salad:0,
            bacon:0
        },
     totalPrice:4,    
     purchasable:false,
     purchasing:false
       
    }

//I want array of values from ingredients objects and need to reduce it to a single value(Sum)
//sum is constantly updated in reduce function by each element(value) of the the array
//if sum>0 then set purchasable to true or else false.
updatePurchaseState=(ingredients)=>{
    
    const sum=Object.keys(ingredients)
    .map(igKey=>{
        return ingredients[igKey];
    })
    .reduce((sum,elt)=>{
        return sum+elt;
    },0);
    this.setState({purchasable: sum>0})

};



addIngredientsHandler=(type)=>{
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

purchaseHandler=()=>{
    this.setState({purchasing:true})
}

purchaseCancelHandler=()=>{
    this.setState({purchasing:false})
}

purchaseContinueHandler=()=>{

    alert('You can Continue...!')

}
    render(){
        //tell which button should be enabled or disabled. 
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        //{salad:true,meat:false,...} and if its true then it is disabled.
        return(
            <Aux>
                {/*OrderSummary is re0rendending again agian bcz it uses setState (states that are changed),so to avoid this
                if the model is you want to display then only order summary should be re-renderrd else not */}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        orderCancelled={this.purchaseCancelHandler}
                        orderContinue={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls 
                    ingredientsAdd={this.addIngredientsHandler} 
                    ingredientsRemove={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    displayOrder={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>    
        );
    }


}

export default BurgerBuilder;


