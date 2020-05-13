import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


const initialState = {
    orders:[],
    //loading is set to true when we start fetching the burger
    loading:false,
    purchased:false
}

const purchaseInit = ( state, action ) => {
    return updateObject( state, { purchased: false } );
};

const purchaseBurgerStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const purchaseBurgerSuccess = ( state, action ) => {
    const newOrder = updateObject( action.orderData, { id: action.orderId } );
    return updateObject( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat( newOrder )
    } );
};

const purchaseBurgerFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const fetchOrdersStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        orders: action.orders,
        loading: false
    } );
};

const fetchOrdersFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.PURCHASE_INIT: return purchaseInit( state, action );
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart( state, action );
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess( state, action )
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail( state, action );
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart( state, action );
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail( state, action );
        default: return state;
    }
};

export default reducer;






// case actionTypes.PURCHASE_BURGER_SUCCESS:
//     const newOrder = {
//         ...action.orderData,
//         id:action.orderId
//     }
//     return{
//         ...state,
//         //because i am done with my order.
//         loading:false,
//         purchased:true,
//         orders:state.orders.concat(newOrder),
       
//     }

// case actionTypes.PURCHASE_BURGER_FAIL:
//     return{
//         ...state,
//         //false bcz even if we fail then also we are done.
//         loading:false

//     } 