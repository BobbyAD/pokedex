import React, { useReducer } from "react";

export const Context = React.createContext();

const initialState = {
    loggedIn: false,
    collections: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return { ...state, loggedIn: true };
        case "LOG_OUT":
            return { ...state, loggedIn: false };
        case "GET_COLLECTIONS":
            return {...state, collections: action.payload}
    }
};

const ContextStore = (props) => {
    const stateHook = useReducer(reducer, initialState);

    return (
        <Context.Provider value={stateHook}>{props.children}</Context.Provider>
    );
};

export default ContextStore;
