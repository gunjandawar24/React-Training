import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux  from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
// import { logout } from '../../store/actions/auth';

const Layout = props => {
    const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler=()=>{
        setSideDrawerIsVisible(false)
        // this.setState({showSideDrawer:false});
    }    

    //when we are using state in setState then do it using function
    const sideDrawerToggleHandler = () => {
        // this.setState({showSideDrawer:!this.state.showSideDrawer})
       setSideDrawerIsVisible(!sideDrawerIsVisible);
    }
        return(
        <Aux>
            <Toolbar  
            isAuth={props.isAuthenticated}
            drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
            isAuth={props.isAuthenticated}
            open={sideDrawerIsVisible} 
            closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
        )
    }

const mapSateToProps = state => {
    return {
       isAuthenticated:state.auth.token !==null
    };
};

export default connect(mapSateToProps)(Layout);
