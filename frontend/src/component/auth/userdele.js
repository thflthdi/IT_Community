import React from 'react';
import axios from 'axios';
import { useAppContext } from '../../store';

function UserDel(){
    const {
        store: { jwtToken, pk },
        dispatch,
      } = useAppContext();
    
      const dleUser = async () => {
        try{
            const headers = { Authorization: `JWT ${jwtToken}` };
            const response = await axios.delete(`http://localhost:8080/accounts/users/${pk}/`, { headers })
            console.log(response.data)
        }catch(e){
            console.log(e)
        }
    }
    return(
        <>
            <button onClick={dleUser}>유저삭제</button>
        </>
    )
}
export default UserDel;