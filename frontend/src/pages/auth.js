import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../component/auth/login';
import Join from '../component/auth/join'
import Logout from '../component/auth/logout';
function Auth(){
    const [users,setUsers]=useState([]);

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
    //users가 바뀔 때 마다 useEffect 실행

    
    return(
    <ul>
        {users.map(user => (
        <li key={user.pk}>
          {user.username} ({user.created_at})
        </li>
      ))}
      <hr/>
        <Login></Login>
        <Join></Join>
        <Logout/>

    </ul>
    )
}
export default Auth;