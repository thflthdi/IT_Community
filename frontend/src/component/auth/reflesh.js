import React, { useEffect } from 'react';
import axios from 'axios';
import { getStorageItem, setStorageItem } from "../hook/useLocalStorage";

function RefleshToken(){
    useEffect(()=>{
        const refleshUser = async () => {
            try{
                const response = await axios.post('http://localhost:8080/accounts/token/refresh/',{token:getStorageItem('jwtToken')});
                setStorageItem('jwtToken',response.data.token)
            }catch(e){
                console.log(e)
            }
        }
        refleshUser();
    },[]) 

    return(
        <>
        </>
    )
}
export default RefleshToken;