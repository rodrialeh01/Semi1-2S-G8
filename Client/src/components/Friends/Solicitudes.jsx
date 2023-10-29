import React, { useEffect, useState } from "react";
import {
  UsergroupAddOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import Service from "../../Service/Service";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthContext } from "../../context/AuthContext";

function Solicitudes() {
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);
  const [response, setResponse] = useState("");
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
    const getSolicitudesPendientes = async () => {
      try {
        console.log(token);
        const response = await Service.getUsers(token);
        if (response.data.message === "ok") {
          let solicitudes = [];
          response.data.data.forEach((element) => {
            if (element.isPendigResponseRequest) {
              console.log(element);
              solicitudes.push(element);
            }

            setSolicitudesPendientes(solicitudes);
          });
          //console.log(response.data.data);
        }
        setResponse("")
        //setSolicitudesPendientes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSolicitudesPendientes();
  }, [response, token]);

  const acceptFriendRequest = async (e, id) => {
    try {
      e.preventDefault();
      console.log(id);
      const response = await Service.acceptRequest(id, token);
      console.log(response)
      if (response.data.message === "Request accepted") {
        setResponse("Friend")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const rejectFriendRequest = async (e, id) => {
    try {
      e.preventDefault();
      console.log(id);
      const response = await Service.rejectRequest(id, token);
      console.log(response)
      if (response.data.message === "Request rejected") {
        setResponse("Not Friend")
      }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col scrollbar-hide">
      <ToastContainer />
      <div className="ml-[16rem] flex-1 ">
        <div className="flex cols-2 gap-4">
          <div className="flex flex-col w-full h-screen">
            <h1 className="text-2xl text-white font-bold text-center mt-4">
              Estos usuarios te han enviado solicitud de amistad. ¿Conoces a
              alguien? ¡Agrégalo!{" "}
              <UsergroupAddOutlined className="text-6xl text-white mx-auto mt-4" />
            </h1>

            <div className="overflow-y-auto scrollbar-hide max-h-[calc(100vh-6rem)] flex flex-wrap justify-start h-screen p-8">
              {/* SOLICITUDES */}
              {
                solicitudesPendientes.map((solicitud) => 
              
              <div className="w-1/3 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden px-1 py-1 h-96 mx-8 my-8">
                <div className="flex items-center justify-center">
                  <img
                    src={solicitud.pathImage}
                    alt="Imagen de Perfil"
                    className="w-48 h-48 rounded-lg"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="p-4">
                    <h1 className="text-2xl font-semibold text-gray-800">
                      {solicitud.name + " " + solicitud.lastName}
                    </h1>
                    <p className="text-gray-600">{solicitud.email}</p>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <button 
                  onClick={(e) => acceptFriendRequest(e, solicitud._id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-1">
                    Agregar
                    <UserAddOutlined />
                  </button>

                  <button 
                  onClick={(e) => rejectFriendRequest(e, solicitud._id)}
                  className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full  mx-1">
                    Rechazar
                    <UserDeleteOutlined style={{ fontSize: "16px" }} />
                  </button>
                </div>
              </div>
              
              )}
              {/* SOLICITUDES */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Solicitudes;
