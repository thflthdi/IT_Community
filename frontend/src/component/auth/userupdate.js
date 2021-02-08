import React, { useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../../store';

function UserUpdate(){
    const [userInfo,setUserInfo]=useState({username:'',password:'',first_name:'',last_name:''});
    const {
        store: { jwtToken, pk }
      } = useAppContext();
    
      const upUser = async () => {
        try{
            const headers = { Authorization: `JWT ${jwtToken}` };
            // const response = await axios.patch(`http://localhost:8080/accounts/users/${pk}/`, {...userInfo}, { headers })
            const response = await axios.put(`http://localhost:8080/accounts/users/${pk}/`,{...userInfo}, { headers })
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <ul>
            <li>id:<input onChange={(e)=>setUserInfo((prev) => ({ ...prev, username: e.target.value }))}/></li>
          <li>PW:<input type="password" onChange={(e)=>setUserInfo((prev) => ({ ...prev, password: e.target.value }))}/></li>
            first name: <input onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, first_name: e.target.value }))
                }></input>
            last name: <input onChange={(e) =>
                  setUserInfo((prev) => ({ ...prev, last_name: e.target.value }))
                }></input>
            <button onClick={upUser}>유저수정</button>
        </ul>
    )
}
export default UserUpdate;