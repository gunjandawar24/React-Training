import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

//now this component recieves state from redux.
class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map(strResult => (
                         <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                   
                </ul>
            </div>
        );
    }
}

//here state is the state stored in the redux(ie in reducer.js)
//Here ctr and res are reducers. 
const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults:state.res.results
    };
};

//actions to dispatch:
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter:       () => dispatch({type: actionTypes.ADD,value:5}),
        onSubtractCounter:  () => dispatch({type: actionTypes.SUBTRACT,value:5}),
        onStoreResult:      (result) => dispatch({type: actionTypes.STORE_RESULT,result:result}),
        onDeleteResult:     (id) => dispatch({type: actionTypes.DELETE_RESULT,resultElId:id}),
    }; 
}

//this connect() takes states used in this container and actions that i want to dispatch.
//if you dont have state then yoy pass null as first argument.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
