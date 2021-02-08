import React, { createContext, useContext } from "react";
import useReducerWithSideEffects, {
  Update,
  UpdateWithSideEffect,
} from 'use-reducer-with-side-effects';
import { getStorageItem, setStorageItem } from "./component/hook/useLocalStorage";

const AppContext = createContext();

const reducer = (prevState, action) => {
  const { type } = action;
  if (type === SET_TOKEN) {
    const { payload: jwtToken} = action;
    const newState = { ...prevState, jwtToken};
    return UpdateWithSideEffect(newState, (state, dispatch) => {
      setStorageItem("jwtToken", jwtToken);
    });
    }else if(type === SET_PK){
      const {payload:pk} = action;
      const newState = {...prevState, pk};
      return Update(newState);
    }else if(type === SET_USERNAME){
      const {payload:name} = action;
      const newState = {...prevState, name};
      return Update(newState);
    }
}

export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem("jwtToken", "");
  const [store, dispatch] = useReducerWithSideEffects(reducer, {
    jwtToken,
    pk:-1,
    name:'',
  });
  return (
    <AppContext.Provider value={{ store, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

// Actions
const SET_TOKEN = "APP/SET_TOKEN";
const SET_PK = "APP/SET_PK";
const SET_USERNAME = "APP/SET_USERNAME";

// Action Creators
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
})
export const setPK = (pk) => ({
  type: SET_PK,
  payload: pk,
})
export const setUsername = (name) => ({
  type: SET_USERNAME,
  payload: name,
})