import React, { useState } from 'react';
import axios from 'axios';
import { setPK, setToken, useAppContext } from '../../store';

function Login(){
    const [loginid,setLoginid]=useState('');
    const [loginpw,setLoginpw]=useState('');
    const [username,setUsername]=useState('');
    const {
        store: { jwtToken, pk },
        dispatch,
      } = useAppContext();
    const login = () => {
        const loginUser = async () => {
            try{
                const response = await axios.post('http://localhost:8080/accounts/token/',{username:loginid,password:loginpw});
                console.log(response.data)
                dispatch(setToken(response.data.token))
                dispatch(setPK(response.data.user.pk))
                setUsername(response.data.user.username)
            }catch(e){
                console.log(e)
            }
        }
        loginUser();
    }
    return(
        <ul>
            Login Page
            <li>현재유저 : {username}</li>
          <li>id:<input name="loginid" value={loginid} onChange={(e)=>setLoginid(e.target.value)}/></li>
          <li>PW:<input type="password" name="loginpw" value={loginpw} onChange={(e)=>setLoginpw(e.target.value)}/></li>
          <li><button onClick={login}>로그인</button></li>
        </ul>
        )
}
export default Login;