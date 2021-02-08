import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logout from "../component/auth/logout";
import { useAppContext } from "../store";

function Home(){
    const [boards,setBoards]=useState([])
    const {
        store: { jwtToken, name, pk },
      } = useAppContext();
      useEffect(()=>{
        const boardList = async () => {
            try{
                const response = await axios.get('http://localhost:8080/board/posts/');
                console.log(response.data)
                setBoards(response.data)
            }catch(e){
                console.log(e);
            }
        }
        boardList();
      },[])
      console.log(`name: ${name} ${pk}`)
return(
    <div>
        <ul>
        <li><Link to="/auth">auth</Link></li>
        {jwtToken ? (
        <>
        <li><Link to="/auth/userinfo">{name}</Link></li>
        <li><Logout/></li>
        </>
        ) : 
        (<>
            <li><Link to="/auth/login">Login</Link></li>
            <li><Link to="/auth/join">Join</Link></li>
        </>
        )}
        </ul>

      <hr/>
      <div style={{padding:'10px'}}>
          <table style={{width:'100%',border:'1px solid black',borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                    <th style={{width:'10%',border:'1px solid black'}}>num</th>
                    <th style={{border:'1px solid black'}}>제목</th>
                    <th style={{width:'18%',border:'1px solid black'}}>작성자</th>
                </tr>
              </thead>
            <tbody>
                {boards.map(board => (
                    <tr key={board.pk} style={{textAlign:'center'}}>
                        <td style={{width:'10%',border:'1px solid black'}}>{board.pk}</td>
                        <td style={{border:'1px solid black'}}>{board.title}</td>
                        <td style={{width:'18%',border:'1px solid black'}}>{board.user}</td>
                    </tr>
                ))}
            </tbody>
          </table>
      </div>
    </div>
)
}
export default Home;