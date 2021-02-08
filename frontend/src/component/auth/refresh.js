import React, { Children, useEffect } from 'react';
import axios from 'axios';
import { setToken, useAppContext } from '../../store';
import Home from '../../pages/home';
import { Link } from 'react-router-dom';
import Login from './login';
import App from '../../App';

function RefreshToken(){
    const {store:{jwtToken},dispatch}=useAppContext()


    if(jwtToken){

        const refreshUser = async () => {
            try{
                const body = {token:jwtToken}

                console.log(jwtToken)
                const response = await axios.post('http://localhost:8080/accounts/token/refresh/', {...body});
                dispatch(setToken(response.data.token))
                console.log(response.data.token)

            }catch(e){
                console.log(e)
            }
        }
            refreshUser();
    }

    return(
        <>

        </>
    )
}
export default RefreshToken;