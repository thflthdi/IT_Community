import React from 'react';
import axios from 'axios';

function UserDel(){
    const dleUser = async () => {
        const response = await axios.delete(`http://localhost:8080/accounts/users/{id}/`)
    }
    return(
        <>
            <button onClick={dleUser}>유저삭제</button>
        </>
    )
}
export default UserDel;