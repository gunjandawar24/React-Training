import React, { useState, useEffect ,useCallback } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export const BurgerBuilder = props => {
    const [purchasing,setPurchasing] = useState(false);

    //dispatches an action to a redux store.
    const dispatch = useDispatch();


      const ings = useSelector(state => {return state.burgerBuilder.ingredients;});
      const price = useSelector(state => state.burgerBuilder.totalPrice);
      const error = useSelector(state => state.burgerBuilder.error);
      const isAuthenticated = useSelector(state => state.auth.token !== null);
    
      const onIngredientsAdded = ingName => dispatch(actions.addIngredient(ingName));
      const onIngredientsRemoved = ingName =>
        dispatch(actions.removeIngredient(ingName));
      const onInitIngredients = useCallback(
        () => dispatch(actions.initIngredients()),
        [dispatch]
      );
      const onInitPurchase = () => dispatch(actions.purchaseInit());
      const onSetAuthRedirectPath = path =>
        dispatch(actions.setAuthRedirectPath(path));
    


    // const onIngredientsAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    // const onIngredientsRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    // const onInitIngredients = () => dispatch(actions.initIngredients());
    // const onInitPurchase= () => dispatch(actions.purchaseInit());
    // const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    },[onInitIngredients]);

//I want array of values from ingredients objects and need to reduce it to a single value(Sum)
//sum is constantly updated in reduce function by each element(value) of the the array
//if sum>0 then set purchasable to true or else false.
//now it returns either true or false.
const updatePurchaseState=(ingredients)=>{
    
    const sum=Object.keys(ingredients)
    .map(igKey=>{
        return ingredients[igKey];
    })
    .reduce((sum,elt)=>{
        return sum+elt;
    },0);
    return sum>0;

};


const purchaseHandler=()=>{
    if(isAuthenticated){
        setPurchasing(true);
    }else{
        onSetAuthRedirectPath('/checkout');
        props.history.push('/auth');
    }
   
}

const purchaseCancelHandler=()=>{
    setPurchasing(false);
}

const purchaseContinueHandler=()=>{
    // // alert('You can Continue...!')
    onInitPurchase();
    props.history.push('/checkout');
}

        //tell which button should be enabled or disabled. 
        const disabledInfo={
            ...ings
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        //{salad:true,meat:false,...} and if its true then it is disabled.

        let orderSummary=null;
        //will render spinner for a fraction of second when we load app for the first time..
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if(ings) {
            burger=(
                <Aux>
                    <Burger ingredients={ings}/>
                    <BurgerControls 
                        ingredientsAdd={onIngredientsAdded} 
                        ingredientsRemove={onIngredientsRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState(ings)}
                        displayOrder={purchaseHandler}
                        isAuth={isAuthenticated}
                        price={price}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
            ingredients={ings}
            orderCancelled={purchaseCancelHandler}
            orderContinue={purchaseContinueHandler}
            price={price}/>;
        }

        return(
            <Aux>
                {/*OrderSummary is re0rendending again agian bcz it uses setState (states that are changed),so to avoid this
                if the model is you want to display then only order summary should be re-renderrd else not */}
                <Modal 
                show={purchasing} 
                modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>    
        );
    }


export default withErrorHandler(BurgerBuilder,axios);


