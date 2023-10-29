import React, { useEffect, useState } from 'react'
import CardAddFriend from '../card/addFriend'
import Service from "../../Service/Service";
import { useAuthContext } from "../../context/AuthContext";
import '../bot/style.css'

export default function AddFriend() {
  const [users, setUsers] = React.useState([])
  const { userLog, setUserLog } = useAuthContext();
  const [token, setToken] = useState("");
  const [loadedToken, setLoadedToken] = useState(false);
  
  useEffect(() => {
    if(!userLog){
      navigate('/');
    }
    const user_data = JSON.parse(localStorage.getItem('data_user'));
    setToken(user_data.token);
    const timeout = setTimeout(() => {
      setLoadedToken(true);
    }, 1000)

    return () => clearTimeout(timeout)
  },[userLog, token, loadedToken]);

  useEffect(() => {
    const doRequest = async () => {
      try {
        const response = await Service.getUsers(token);
        if (response.data.message === "ok") {
          const userList = response.data.data.filter((user) => !user.isFriend);
          setUsers(userList)
        }
      } catch (error) {
        console.log(error);
      }
    };
    doRequest();
  }, [token]);

  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col">
      <div className="ml-[16rem] flex-1">
        <div className='h-1/6 flex flex-col items-center justify-center'>
          <h1 className="text-2xl text-white font-bold">
            Conoces a alguien? Agrégalo!
          </h1>
        </div>
        <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center p-5">
          {
            users.map((user) => 
            <CardAddFriend
            key={user.id}
            user={user}/>
            )
          }
        </div>
      </div>
    </div>
  )
}
