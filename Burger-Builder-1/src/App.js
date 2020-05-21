import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route,Switch, withRouter , Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

//root component of our application:
class App extends Component  {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }


  render(){
    //for unauthenticated users..
    let routes = (
      <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );  
    }

  return (
    <div >
      <Layout>
        {routes}
      </Layout>
      
    </div>
  );
}
}

const mapStateToProps = state => {
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

//connect will give error if we use with routing therefore wrap it using withRouter.
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));


// --------------------------------- My Understanding----------------------------------

/*
  *the paths which you think never be visited by a user then you can load those path using lazy loading(bcz jab reactdom.render() call hoga tab sari files ka bundle bnta hai,which we dont want)
  *like here those paths can be /orders or /checkout. 
*/  
//for any unknown route then redirect to /--{/* <Redirect to="/" /> */}
// <Switch> returns only one first matching route. */}
