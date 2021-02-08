import React, { useState } from 'react';
import axios from 'axios';
import { setPK, setToken, setUsername, useAppContext } from '../../store';
import { Link } from 'react-router-dom';

function Login(){
    const [loginid,setLoginid]=useState('');
    const [loginpw,setLoginpw]=useState('');
    const {
        store:{name},
        dispatch,
      } = useAppContext();
    const login = () => {
        const loginUser = async () => {
            try{
                const response = await axios.post('http://localhost:8080/accounts/token/',{username:loginid,password:loginpw});
                console.log(response.data)
                dispatch(setToken(response.data.token))
                dispatch(setPK(response.data.user.pk))
                dispatch(setUsername(response.data.user.username))
            }catch(e){
                console.log(e)
            }
        }
        loginUser();
    }
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            Login Page
          <li>id:<input name="loginid" value={loginid} onChange={(e)=>setLoginid(e.target.value)}/></li>
          <li>PW:<input type="password" name="loginpw" value={loginpw} onChange={(e)=>setLoginpw(e.target.value)}/></li>
          <li><button onClick={login}>로그인</button></li>
        </ul>
        )
}
export default Login;