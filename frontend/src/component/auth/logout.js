import React from 'react';
import { getStorageItem, setStorageItem } from "../hook/useLocalStorage";

function Logout(){

    const logoutUser = () => {
        setStorageItem('jwtToken','')
        console.log(getStorageItem('jwtToken'))
    }

    return(
        <>  
            <button onClick={logoutUser}>로그아웃</button>
        </>
    )
}
export default Logout;