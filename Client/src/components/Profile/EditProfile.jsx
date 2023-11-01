import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import Service from "../../Service/Service";

function EditProfile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const { userLog, setUserLog } = useAuthContext();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [dpi, setDpi] = useState("");
  const [cambia, setCambia] = useState(false);
  const [token, setToken] = useState("");
  const [loadedToken, setLoadedToken] = useState(false);
  const [apellido, setApellido] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [idUser, setIdUser] = useState("");

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "password") {
      setFData({
        ...fData,
        password: e.target.value,
      });
    }
    console.log(data);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("CAMBIA: ", cambia)
    if (cambia === true) {
      setFData({
        ...fData,
        password: data.password,
      });
      
      try {
        console.log("Este es el res2_ ", fData);
        const res = await Service.editProfileImage(fData, token);
        if (res.status === 200) {
          let data_user = JSON.parse(localStorage.getItem("data_user"));
          let id = data_user.user._id;
          Service.getUser(id, token)
          .then((res) => {
            let foto = res.data.data.pathImage
            data_user.user.pathImage = foto
            localStorage.setItem("data_user", JSON.stringify(data_user));
          })

          console.log(res.data);
        } else {
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }

      setCambia(false);
    }

    try {
      const res = await Service.editUser(data, token);
      console.log("Este es el res_ ", res);
      if (res.status === 200) {
        console.log(res.data);
        let data_user = JSON.parse(localStorage.getItem("data_user"));
          let id = data_user.user._id;
          data_user.user.name = data.name
          data_user.user.lastName = data.lastName
          data_user.user.dpi = data.dpi
          localStorage.setItem("data_user", JSON.stringify(data_user));
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };

  useEffect(() => {
    if (userLog) {
      const data_user = JSON.parse(localStorage.getItem("data_user"));
      console.log("data_user", data_user);
      setToken(data_user.token);
      const timeout = setTimeout(() => {
        setLoadedToken(true);
      }, 500);

      setNombre(data_user.user.name);
      setApellido(data_user.user.lastName);
      setCorreo(data_user.user.email);
      setSelectedImage(data_user.user.pathImage);
      setDpi(data_user.user.dpi);
      setIdUser(data_user.user._id);

      console.log("dicho TOken", token)
      setData({
        name: data_user.user.name,
        lastName: data_user.user.lastName,
        dpi: dpi,
        password: "",
      });

      setFData({
        ...fData,
        image: data_user.user.pathImage,
        password: "",
      });

      return () => clearTimeout(timeout);
    }
  }, [userLog, token, loadedToken]);

  const [data, setData] = useState({
    name: nombre,
    lastName: apellido,
    dpi: dpi,
    password: "",
  });

  const [fData, setFData] = useState({
    password: "",
    image: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setFData({
          ...fData,
          image: file,
        });
        setCambia(true);
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
                <form
                  className="flex flex-col bg-white rounded-lg"
                  onSubmit={(e) => handleFormSubmit(e)}
                >
                  <div className="flex ">
                    <div className="w-1/3 flex items-center justify-center">
                      <div className="mb-4 ">
                        <label
                          htmlFor="section1"
                          className="text-lg text-black font-semibold"
                        >
                          Selecciona una foto de perfil
                        </label>

                        <img
                          src={selectedImage}
                          alt=""
                          className="object-contain w-64 h-64 rounded-full border border-8 border-dashed "
                        />
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
                            defaultValue={nombre}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </div>
                        <div className="mt-4">
                          <label
                            htmlFor="name"
                            className="block text-black font-semibold"
                          >
                            Apellido
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                            placeholder="Apellido"
                            defaultValue={apellido}
                            onChange={(e) => handleInputChange(e)}
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
                            value={dpi}
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
                        onChange={(e) => handleInputChange(e)}
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
