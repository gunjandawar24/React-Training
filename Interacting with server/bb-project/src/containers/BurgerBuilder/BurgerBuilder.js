import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.6,
    meat:1.5,
    bacon:1
}

class BurgerBuilder extends Component{
    state={
        ingredients:null,
        totalPrice:4,    
        purchasable:false,
        purchasing:false,
        //when loading is true i want to show the spinner and on false orderSummary.
        loading:false,
        error:false
       
    }

    componentDidMount(){
        axios.get('https://burger-builder-ea9c2.firebaseio.com/ingredients.json')
        .then( response => {
            this.setState({ingredients: response.data});
        })
        .catch(error =>{
            this.setState({error:true})
        });
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
    // alert('You can Continue...!')
    this.setState({ loading:true });
    const order ={
        ingredients:this.state.ingredients,
        //recalculate the price on server (in real App)
        price:this.state.totalPrice,
       
        customer:{
            name:'Gunjan',
            address:{
                street:'Sreet1',
                zipcode:'110009',
                country:'India'
            },
            email:'gunjan.dawar@tothenew.com'
        },
        deliveryMethod:'fastest'
    }
    
    axios.post('/orders.json',order)
    .then(response => {
        this.setState({ loading:true , purchasing:false});
        // console.log(response)
    })
    .catch(error =>{
        //  console.log(error));
         this.setState({ loading:true ,purchasing:false});
    });
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

        let orderSummary=null;
        //will render spinner for a fraction of second when we load app for the first time..
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(this.state.ingredients){
            burger=(
                <Aux>
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
            orderSummary=<OrderSummary 
            ingredients={this.state.ingredients}
            orderCancelled={this.purchaseCancelHandler}
            orderContinue={this.purchaseContinueHandler}
            price={this.state.totalPrice}/>;
        }

        //if true then show spinner..
        if(this.state.loading){
            orderSummary=<Spinner />
        }

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

export default withErrorHandler(BurgerBuilder,axios);


