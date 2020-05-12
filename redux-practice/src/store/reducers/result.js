import * as actionTypes from '../actions';

const initialState = {
    results:[]
}


const reducer = (state = initialState, action) => {

    switch(action.type){
     
        case actionTypes.STORE_RESULT :
            return{
                ...state,
                results:state.results.concat({id:new Date() ,value:action.result})
            }
        
        case actionTypes.DELETE_RESULT :
            //****One Way  to immutably changing the results***
            //but it does not do deep cloning.
            // const id=2;
            // const newArray=[...state.results];
            // newArray.splice(id,1);

            //this will mutate our original state
            // state.results.splice(id,1);

            /*here it checks every elt id of array with the one to delete,if does not matches 
            *then create a new array with those elements and leave which matches that given condition*/
            const updatedArray=state.results.filter(result => result.id !== action.resultElId);
            return{
                ...state,
                results:updatedArray
            }    
    }
    //it returns thr current  state.
    return state;
};

export default reducer;