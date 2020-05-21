import React, { useEffect , Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route,Switch, withRouter , Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

//root component of our application:
//we only want to re-render this only when inside function(func are objects in js) chnaged.
const App = props => {
  //object Destructuring
  const { onTryAutoSignUp } = props;

  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  //the paths which you think never be visited by a user then you can load those path using lazy loading
  //like here those paths can be /orders or /checkout.

    //for unauthenticated users..
    let routes = (
      <Switch>
         <Route path="/auth" render={props => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    );

    if(props.isAuthenticated){
      routes = (
        <Switch>
         <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={props => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        </Switch>
      );  
    }

  return (
    <div >
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
      
    </div>
  );
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


//for any unknown route--
// /* <Redirect to="/" /> */