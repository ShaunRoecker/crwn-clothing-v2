import { compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import rootReducer from './reducers';


/*
import { configureStore } from "@reduxjs/toolkit";

import cakeReducer from "../components/cake/cakeSlice";
import iceCreamReducer from "../components/icecream/iceCreamSlice";
import userReducer from "../components/user/userSlice";

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: iceCreamReducer,
        user: userReducer,
    },
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), 
});

export default store;
*/
