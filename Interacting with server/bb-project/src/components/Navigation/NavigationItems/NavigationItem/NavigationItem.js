import React from 'react';
import classes from './NavigationItem.module.css';

//If props.active is true then classname is set otherwise not(css wont be added)..
const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <a 
        href={props.link} 
        className={props.active ? classes.active : null}>{props.children}
        </a>
    </li>

);

export default navigationItem;