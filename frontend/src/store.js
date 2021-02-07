import React, { useReducer } from 'react';

const initialState= {
    pk : -1
}
const reducer = (state, action)=> {

    switch (action.type) {
        case "SET_PK" :
          return {
            ...state, //현재 state가 하나뿐이라 생략해도 된다. 두개 이상일 경우 변경하지 않은 state를 유지하기 위해 사용한다
            pk: action.value,
          };
    }   
}
export const PKContext = React.createContext();

const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <PKContext.Provider value={{ pk: state.pk, dispatch }}>
            {children}
        </PKContext.Provider>
    )
}
export default ContextProvider;