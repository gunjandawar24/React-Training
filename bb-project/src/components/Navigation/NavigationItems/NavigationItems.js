import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

//i will outsource the single links into own components here bcz of different styling.
const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        {/* orders nav is only visible if we are authenticated */}
        {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
        {props.isAuthenticated
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link="/auth">Login</NavigationItem>}
    </ul>

);

export default navigationItems;