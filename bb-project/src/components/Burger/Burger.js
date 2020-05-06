import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger=(props)=>{

    //tranform object of key value pairs into an array of burger-ingredients
    //where value decides how many ingredients i need
    //and key decides which type of ingredient i need
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
                });
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
            
        if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding ingredients!</p>;
        }
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top" />
                {transformedIngredients}
                <BurgerIngredient type="bread-bottom" />
            </div>
        );
    };

export default burger;

