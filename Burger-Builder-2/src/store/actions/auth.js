//i want to dispatch the action when sumit button is clicked.
import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

//this is used to set a loading state and show a spinner..
export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail = (error) => {

    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

//to invalidate the token after one hour.
//auto logout when token expires.
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(()=> {
            dispatch(logout());
        },(expirationTime) * 1000);
    };
};


//async code to authenticate the user.
export const auth = (email,password,isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        //this will be transformed to json by axios automatically.
        const authData = {
            email:email,
            password:password,
            //whether you wnat to get the token or not from the server.
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdyN2cPoOmRAV3mY8gpozrqxB1Q_ecyPQ';
        //to validate a user..
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdyN2cPoOmRAV3mY8gpozrqxB1Q_ecyPQ';
        }
        
        axios.post(url,authData)
            .then(response => {
                console.log(response);
                //i want to store the token and related data on to the local storage of browser
                //  so that when we reload the application ,user still gets logged in
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate',expirationDate);
                localStorage.setItem('userId' ,response.data.localId);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                // console.log(err);
                console.log(err.response.data.error.message);
                dispatch(authFail(err.response.data.error.message));
            })
    }
} 

//payload -path(the path that we want to set.)
export const setAuthRedirectPath = (path) => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}

//i want to dispatch multiple actions from this function.
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }else {
            //wrap this into a new date ibject bcz we recieve string from local storage.
            const expirationDate= new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){

                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                //getTime will give in miliseconds ,so convert to seconds using /1000.
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));

            }else{
                dispatch(logout());
            }
        }

    }
}
