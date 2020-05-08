import React from 'react';
import classes from './Button.module.css';

//pass string in className
//btnType can be either danger or success   
//convert array of strings to strings using join(' ')
const button=(props)=>(
    <button 
    className={[classes.Button,classes[props.btnType]].join(' ')}
    onClick={props.clicked}>{props.children}</button>

);

export default button;