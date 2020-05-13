import * as actionTypes from './actionTypes';

//synchronous action-creator
export const saveResult = ( res ) => {
    //change data----
    // const updatedResult = res*2;
    return {
        type: actionTypes.STORE_RESULT, 
        result: res
    };
}

//async action-crreator
export const storeResult = ( res ) => {
    //after 2 seconds i want to store the result.
    //i'll get dispatch(in argument ) hre due to redux-thunk which can call to dispatch the action.
    //save result ko pause kr dega for 2 seconds (basically blocking the old action and dispatch it gain in future)
    return (dispatch,getState) => {
        setTimeout( () => {
            // const oldCounter = getState().ctr.counter;
            // console.log(oldCounter);
            dispatch(saveResult(res));
        }, 2000 );
    }
};

export const deleteResult = ( resElId ) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resElId
    };
};
