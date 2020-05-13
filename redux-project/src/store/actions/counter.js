import * as actionTypes from './actionTypes';

//its a action-creator(function) which returns an action
export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    };
};

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    };
};

export const add = ( value ) => {
    return {
        type: actionTypes.ADD,
        val: value
    };
};

export const subtract = ( value ) => {
    return {
        type: actionTypes.SUBTRACT,
        val: value
    };
};