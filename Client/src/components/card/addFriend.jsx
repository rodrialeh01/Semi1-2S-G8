import React, { useEffect, useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { IconContext } from 'react-icons/lib'
import Service from "../../Service/Service";


export default function CardAddFriend({ user }) {
  const [active, setActive] = useState(false)
  const [btnColor, setBtnColor] = useState("bg-green-500 hover:bg-green-700")
  const [token, setToken] = useState("");

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem('data_user'));
    setToken(user_data.token);
  }, []);

  const sendFriendRequest = async (id) => {
    setActive(!active)
    if (active) {
      setBtnColor("bg-green-500 hover:bg-green-700")
      // remove request
    } else {
      try {
        const response = await Service.createRequestFriend(id, token);
        if (response.statusText !== "OK") {
          console.log("card res", response)
          alert("Error al enviar solicitud")
        }
      } catch (error) {
        console.log(error);
      }
      setBtnColor("bg-red-500")
    }
  }
  return (
    <div className="h-auto max-w-xs bg-white shadow-lg rounded-lg overflow-hidden transition-all ease-out duration-300 hover:scale-105 p-2 m-3">
      <div className="flex items-center justify-center">
        <img
          src={user.pathImage}
          alt="Imagen de Perfil"
          className="w-48 h-48 rounded-lg"
        />
      </div>

      <div className="flex items-center justify-center">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-800">
            {user.name + " " + user.lastName}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {
          active ?
            <div
              className={btnColor + " flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1"}>
              <IconContext.Provider value={{ size: "1.2em" }}>
                <ImCancelCircle />
              </IconContext.Provider>
            </div>
            :
            <button onClick={() => sendFriendRequest(user._id)}
              className={btnColor + " flex w-20 justify-center items-center text-white font-bold py-2 px-4 rounded-full mx-1"}>
              <IconContext.Provider value={{ size: "1.2em" }}>
                <AiOutlineCheck />
              </IconContext.Provider>
            </button>
        }
      </div>
    </div>
  )
}
