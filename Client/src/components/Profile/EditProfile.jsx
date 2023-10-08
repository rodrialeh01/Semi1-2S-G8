import React, { useEffect, useState } from "react";

function EditProfile() {
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

  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col scrollbar-hide">
      <div className="ml-[16rem] flex-1">
        <div className="flex cols-2 gap-4">
          <div className="flex flex-col w-full h-auto">
            <div className="overflow-y-auto scrollbar-hide flex flex-wrap justify-start p-8">
              <h1 className="text-5xl text-white font-bold text-center mt-4">
                Editar Perfil
              </h1>
              <div className="w-full shadow-lg rounded-lg overflow-hidden px-1 py-1 mx-8 my-8">
                <form className="flex flex-col bg-white rounded-lg">
                  <div className="flex ">
                    <div className="w-1/3 flex items-center justify-center">
                      <div className="mb-4 ">
                        <label
                          htmlFor="section1"
                          className="text-lg text-black font-semibold"
                        >
                          Selecciona una foto de perfil
                        </label>

                        <img src={selectedImage} alt="" className="object-contain w-64 h-64 rounded-full border border-8 border-dashed " />
                        <input 
                          type="file"
                          accept="image/*"
                          name="image"
                          id="image"
                          className=""
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <div className="w-2/3 px-4">
                      <div className="mb-4">
                        <label
                          htmlFor="section2"
                          className="text-3xl text-black font-semibold"
                        >
                          Datos Personales
                        </label>

                        <div className="mt-4">
                          <label
                            htmlFor="name"
                            className="block text-black font-semibold"
                          >
                            Nombre
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                            placeholder="Nombre"
                          />
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor="email"
                            className="block text-black font-semibold"
                          >
                            Correo
                          </label>
                          <input
                            type="mail"
                            name="email"
                            id="email"
                            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                            readOnly
                          />
                        </div>

                        <div className="mt-4">
                          <label
                            htmlFor="DPI"
                            className="block text-black font-semibold"
                          >
                            DPI
                          </label>
                          <input
                            type="number"
                            name="DPI"
                            id="DPI"
                            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                            placeholder="Número de DPI"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-black font-semibold"
                      >
                        Confirma tu contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500 px-4 py-2"
                        placeholder="Contraseña"
                      />
                    </div>

                    <div className="flex items-center justify-end mt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-darkBlue"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;
