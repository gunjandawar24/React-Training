import * as actioTypes from './actionTypes';
import axios from '../../axios-orders';

//onSuccess=id and orderData is fetched from the backend becoz we want store it in the orders array.
export const purchaseBurgerSuccess = (id,orderData) => {
    return{
        type:actioTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    };

};

export const purchaseBurgerFail = (error) => {
    return {
        type:actioTypes.PURCHASE_BURGER_FAIL,
        error:error
    }

};

export const purchaseBurgerStart = () => {
    return{
        type:actioTypes.PURCHASE_BURGER_START
    }
}

//async action-creator 
//this action gets dispatched once we click the order button.
//here orderdata is like userData ,addIngredients..
export const purchaseBurger = (orderData,token) => {
    return dispatch => {

        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token ,orderData)
    .then(response => {
        // console.log(response.data);
        // console.log(orderData);
        dispatch(purchaseBurgerSuccess(response.data.name,orderData));
    })
    .catch(error =>{
        dispatch(purchaseBurgerFail(error));
    });
    }
}

export const purchaseInit = () => {
    return{
        type:actioTypes.PURCHASE_INIT
    }
}

//error here is handled using high order component wrap to connect in ContactData

export const fetchOrdersSuccess = (orders) => {
    return {
        type:actioTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type:actioTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

//this will set loading to true.
export const fetchOrdersStart = () => {
    return {
        type:actioTypes.FETCH_ORDERS_START
    }
}

// if we are authenticated and have a token then only we can reach to orders.
export const fetchOrders = (token,userId) => {
    return dispatch => {
        //this will set loading to true first.
        dispatch(fetchOrdersStart());
        //orderBy is used by firebase to filter out the data .
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' +queryParams)
            .then(res => {
                const fetchedOrders = []; 
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    }
}