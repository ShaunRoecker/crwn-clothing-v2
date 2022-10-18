import { createContext, useState, useEffect, useReducer } from 'react';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// createContext remains because context is what values we expose
// the only difference is how we are STORING currentUser is a little different,
// we are not using "useState" to store the value of state, we are using a
// reducer, which ultimately returns a new state object
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

// Actions we have: setCurrentUser
// States we have: currentUser

// we need to build an object to remember our case string values for reference
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER",
}

// After the createContext() function that initializes the state values, we need 
// to build a reducer function
///////////////////////////////////////////////////////////////////////////////////
const userReducer = (state, action) => {
    console.log(action);
    // there are only 2 possible properties (type, payoad(optional)) for the action arg,
    // so we can destructure it down for ease of use.
    const { type, payload } = action;
    // we need to conditionally return back an object with those values (payload) 
    // depending on the (type)
    // type represents what kind of actions we have, payload represents the new values

    // Type in this case could only be setCurrentUser because that is the only action (or 
    // function) that we created in the createContext() function. 

    // Basically, even though it doesnt have setCurrentUser, we are returning an object
    // that has currentUser "set" to a new value of "payload", so this is how we are setting 
    // user

    switch(type) 
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {...state, currentUser: payload };  

      //case "increment":    <- example of using the state to determine the action
      //    return { value: state.value + 1}

      //case "SET_CURRENT_USER":    <- example of using state to use an original object to push to so values
      //    return { ...state, currentUser: payload }   // we dont want to modify aren't changed, like firstName, lastName etc

        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};
///////////////////////////////////////////////////////////////////////////////////


const INITIAL_STATE = {
    currentUser: null,
};

///////////////////////////////////////////////////////////////////////////////////
export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null);  <-- we don't use useState with reducers

  // How to use userReducer vvvv- below -vvvv  produces 2 things, state and dispatch
  const [ {currentUser}, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);
  // state is the current values being store by this userReducer
  // dispatch is a function that when you call it, you pass it an action object.

  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
  };

  const value = { currentUser, setCurrentUser };


  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
///////////////////////////////////////////////////////////////////////////////////
// REDUCER VERSION
// reducers are just functions that return an object
// Basically, its a function that takes the current state object and arguments regarding
// what needs to be changed in that state object, and the function returns a new state object.
// when it returns the new state object, this queues React that state has been changed
// and it will rerender with the changes in the new state object.

// There are 2 *args to the reducer function.  The second argument is is the "action",
// the reducer function changes the properties and values of the state object based on this 
// action argument. The first argument is "state", and it is the current state of the state
// object.  This "state" argument with the current state is there because it allows you to set
// the new state using conditional statements based on the old state.

// Again, the reason why we always return a new object instead of changing the old one is because
// that is how React determines that something has changed in the state object and need to rerender
// the component/s.

// There is a useReducer() hook

// However, context is still context

















