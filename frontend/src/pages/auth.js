import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from '../component/auth/login';
import Join from '../component/auth/join'
import Logout from '../component/auth/logout';
import UserDel from '../component/auth/userdele';
import UserUpdate from '../component/auth/userupdate';
import { Link} from 'react-router-dom';
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
    return(
        <div>
            <hr/>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/auth/login">Login</Link></li>
                    <li><Link to="/auth/join">Join</Link></li>
                    {users.map(user => (
                    <li key={user.pk}>
                    {user.username} ({user.created_at})
                    </li>
                ))}
                <hr/>
                    <Login></Login>
                    <Join></Join>
                    <Logout/>
                    <hr/>
                    <UserDel></UserDel>
                    <UserUpdate></UserUpdate>
                </ul>
        </div>
        
    )
}
export default Auth;