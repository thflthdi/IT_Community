import React from 'react';
import { setToken, useAppContext } from '../../store';


function Logout(){
    const {
        dispatch,
      } = useAppContext();
    const logoutUser = () => {
        dispatch(setToken(''))
    }
    
    return(
        <>  
            <button onClick={logoutUser}>로그아웃</button>
        </>
    )
}
export default Logout;