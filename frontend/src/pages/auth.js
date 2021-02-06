import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Auth(){
    const[users,setUsers]=useState(null);

    useEffect(()=>{
        const fetchUsers= async ()=>{
            try{
                const response = axios.get('http://localhost:8080/accounts/users/');
                setUsers(response.data);
            }catch(e){
                console.log(e);
            }
        }
        fetchUsers();
    },[])
    
    return(
    <ul>
            hello
    </ul>
    )
}
export default Auth;