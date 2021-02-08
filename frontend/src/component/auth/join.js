import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Join(){
    const [userid,setUserid]=useState('');
    const [userpw,setUserpw]=useState('');

    const joinUs = () => {
        console.log(userid)
        console.log(userpw)
        const joinUser = async () => {
            try{
                const response = await axios.post('http://localhost:8080/accounts/users/',{username:userid,password:userpw});
                console.log(response.data)
            }catch(e){
                console.log(e)
            }
        }
        joinUser();
    }
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            회원가입 Page
            <li>id:<input name="userid" value={userid} onChange={(e)=>setUserid(e.target.value)}/></li>
            <li>PW:<input type="password" name="userpw" value={userpw} onChange={(e)=>setUserpw(e.target.value)}/></li>
            <li><button onClick={joinUs}>회원가입</button></li>
        </ul>
    )
}
export default Join;