import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Auth(){
    const [users,setUsers]=useState([]);
    const [userid,setUserid]=useState('');
    const [userpw,setUserpw]=useState('');

    useEffect(()=>{
        const fetchUsers= async ()=>{
            try{
                const response = await axios.get('http://localhost:8080/accounts/users/');
                console.log(response.data)
                setUsers(response.data);
            }catch(e){
                console.log(e);
            }
        }
        fetchUsers();
    }, [])

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
        {users.map(user => (
        <li key={user.pk}>
          {user.username} ({user.created_at})
        </li>
      ))}
      <li>id:<input name="userid" value={userid} onChange={(e)=>setUserid(e.target.value)}/></li>
      <li>PW:<input name="userpw" value={userpw} onChange={(e)=>setUserpw(e.target.value)}/></li>

      <li><button onClick={joinUs}>회원가입</button></li>
      <li><button>로그인</button></li>
    </ul>
    )
}
export default Auth;