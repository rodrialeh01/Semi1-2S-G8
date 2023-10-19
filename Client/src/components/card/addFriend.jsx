import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { IconContext } from 'react-icons/lib'


export default function CardAddFriend({ user }) {
  const [active, setActive] = useState(false)
  const [btnColor, setBtnColor] = useState("bg-green-500 hover:bg-green-700")
  const sendFriendRequest = async (id) => {
    setActive(!active)
    if (active) {
      setBtnColor("bg-green-500 hover:bg-green-700")
      // remove request
    } else {
      setBtnColor("bg-red-500 hover:bg-red-700")
      // send request
    }
    // send request to server
    //
    //
  }
  return (
    <div className="h-auto max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
      <div className="flex items-center justify-center">
        <img
          src={user.photo}
          alt="Imagen de Perfil"
          className="w-48 h-48 rounded-lg"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {user.name}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <button onClick={() => sendFriendRequest(user.id)}
          className={btnColor+" flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1"}>
          <IconContext.Provider value={{ size: "1.2em" }}>
          {
            active ?
              <ImCancelCircle />
              :
              <AiOutlineCheck />
          }
          </IconContext.Provider>
        </button>
      </div>
    </div>
  )
}
