import React, { useEffect, useState } from "react";
import {
  UsergroupAddOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";

function Home() {
  const options = [
    { value: "esp", label: "Español" },
    { value: "fr", label: "Francés" },
    { value: "eng", label: "Inglés" },
    { value: "ita", label: "Italiano" },
  ];

  const options2 = [{ value: "Todos", label: "Todos" }];
  const [showComentarios, setShowComentarios] = useState(false);
  const [makePublicacion, setMakePublicacion] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMakePublicacion = () => {
    if (makePublicacion) {
      setMakePublicacion(false);
      setSelectedImage(null);
    } else {
      setMakePublicacion(true);
    }
  };

  const handleShowComentarios = () => {
    if (showComentarios) {
      setShowComentarios(false);
    } else {
      setShowComentarios(true);
    }
  };

  return (
<div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col scrollbar-hide">
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

        <div  className="w-1/3 max-w-xs bg-white shadow-lg rounded-lg overflow-hidden px-1 py-1 h-96 mx-8 my-8">
          <div className="flex items-center justify-center">
            <img
              src=""
              alt="Imagen de Perfil"
              className="w-48 h-48 rounded-lg"
            />
          </div>

          <div className="flex items-center justify-center">
            <div className="p-4">
              <h1 className="text-2xl font-semibold text-gray-800">
                Soy Panchito
              </h1>
              <p className="text-gray-600">correo@correo.com</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-1">
              Agregar
              <UserAddOutlined />
            </button>

            <button className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded-full  mx-1">
              Rechazar
              <UserDeleteOutlined style={{ fontSize: "16px" }} />
            </button>
          </div>
        </div>
      {/* SOLICITUDES */}
    </div>
    </div>
    </div>
  </div>
</div>
  );
}

export default Home;
