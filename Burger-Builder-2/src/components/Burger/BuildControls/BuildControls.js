import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[

    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Meat',type:'meat'},
    {label:'Cheese',type:'cheese'},

];
const buildControls=(props)=>(
    <div className={classes.BuildControls}> 
        <p>Current Price Of Burger is : <strong>{props.price.toFixed(2)}</strong></p>
       { controls.map(contrl=>(
            <BuildControl 
             key={contrl.label} 
             label={contrl.label} 
             added={()=>props.ingredientsAdd(contrl.type)}
             removed={()=>props.ingredientsRemove(contrl.type)}
             disabled={props.disabled[contrl.type]}/>           
       )) }
       <button 
       className={classes.OrderButton}
       disabled={!props.purchasable}
      onClick={props.displayOrder}>{props.isAuth ? 'ORDER NOW' : 'lOGIN TO ORDER'} </button>
    </div>
);

export default buildControls;

//OrderNow Button will only be activated if the sum of price of all the ingredients is 1>=