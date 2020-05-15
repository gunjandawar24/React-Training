//here i want to do two things dispatch the Logout action and redirection.
import React , {Component} from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout();
    }

    render () {
        return (
            <Redirect to="/" />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actions.logout())
    }
}

export default connect(null,mapDispatchToProps)(Logout);