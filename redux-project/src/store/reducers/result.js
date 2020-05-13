import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results:[]
}


const deleteResult = (state,action) => {
    /*here it checks every elt id of array with the one to delete,if does not matches 
    *then create a new array with those elements and leave which matches that given condition*/       
    const updatedArray=state.results.filter(result => result.id !== action.resultElId);
    return updateObject(state,{results:updatedArray});
}

const reducer = (state = initialState, action) => {

    switch(action.type){
     
        //change data----
        case actionTypes.STORE_RESULT :

            /* You cannot do this in reducer file */
            // setTimeout(()=> {
            //     return {
            //           new state...
            //     }
            // },2000);

            return updateObject(state,{results:state.results.concat({id:new Date() ,value:action.result*2})})
           
        
        case actionTypes.DELETE_RESULT :
            //****One Way  to immutably changing the results***
            //but it does not do deep cloning.
            // const id=2;
            // const newArray=[...state.results];
            // newArray.splice(id,1);

            //this will mutate our original state
            // state.results.splice(id,1);

            return deleteResult(state,action);
               
    }
    //it returns thr current  state.
    return state;
};

export default reducer;