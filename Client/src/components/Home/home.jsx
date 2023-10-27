import { WechatFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Service from "../../Service/Service";
import { useAuthContext } from "../../context/AuthContext";
function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
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


  const options = [
    { value: "es", label: "Español" },
    { value: "fr", label: "Francés" },
    { value: "en", label: "Inglés" },
    { value: "it", label: "Italiano" },
  ];

  let options2 = [{ value: "Todos", label: "Todos" }];
  const [showComentarios, setShowComentarios] = useState(false);
  const [makePublicacion, setMakePublicacion] = useState(false);
  const [filters, setFilters] = useState([options2[0]]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hayPublicaciones, setHayPublicaciones] = useState(false);
  const [response, setResponse] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [idPublicacion, setIdPublicacion] = useState("");
  const [idioma, setIdioma] = useState("es");
  const [makeComment, setMakeComment] = useState(false);
  const [selectedOption, setSelectedOption] = useState([options[0]]);
  const [inputComentario, setInputComentario] = useState("");
  const [fData, setFData] = useState({
    description: "",
    image: "",
  });

  const handleInputChange = (event) => {
    setFData({
      ...fData,
      [event.target.name]: event.target.value,
    });

    console.log(fData);
  };

  useEffect(() => {
    const obtPublicaciones = async () => {
      

      console.log(token);
      try {
        const res = await Service.getPublications(token);
        if (res.data.message === "ok") {
          console.log("Publicaciones obtenidas correctamente");
          const publicationData = res.data.data.publications;
          setPublicaciones(publicationData);
          //recorrer publicaciones y agregar a filtros:
          res.data.data.labels.map((label) => {
            console.log(label);
            options2.push({ value: label, label: label });
          });
          setFilters(options2);

          await obtDataUsers(publicationData);
        } else {
          console.log("Error al obtener las publicaciones");
        }
      } catch {}
    };
    obtPublicaciones();
    setResponse("");
  }, [response, token]);

  const obtDataUsers = async (publicacionesData) => {
    try {
      const updatedData = await Promise.all(
        publicacionesData.map(async (publicacion, index) => {
          console.log(publicacion.idUser);
          const res = await Service.getUser(publicacion.idUser, token);
          console.log(res.data.data);
          const userData = res.data;

          return { ...publicacion, ...userData };
        })
      );

      setPublicaciones(updatedData);

      console.log("updatedData: ", updatedData);

      console.log(publicaciones);
      setFilteredPublications(updatedData);
      setLoading(false);
      setHayPublicaciones(true);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleTranslate = async (idPublicacion, description) => {
    console.log(idPublicacion);
    console.log(description);
    console.log(idioma);
    let translated = "";

    let data = {
      id: idPublicacion,
      text: description,
      language: idioma,
    };

    console.log(data);
    try {
      const res = await Service.translate(data, token);
      if (res.data.message === "ok") {
        console.log("Traducción realizada correctamente");
        console.log(res.data.data.textTranslate);
        translated = res.data.data.textTranslate;
      } else {
        console.log("Error al realizar la traducción");
      }
    } catch (error) {
      console.log(error);
    }

    const updatedPublications = [...publicaciones];
    const index = updatedPublications.findIndex(
      (publicacion) => publicacion._id === idPublicacion
    );
    updatedPublications[index].description = translated;
    setPublicaciones(updatedPublications);

    console.log(publicaciones);
    //console.log(descTranslated);
  };

  const handleTranslateComment = async (idComentario, comment) => {
    console.log(idComentario);
    console.log(comment);
    console.log(idioma);
    let translated = "";

    let data = {
      id: idComentario,
      text: comment,
      language: idioma,
    };

    console.log(data);
    try {
      const res = await Service.translate(data);
      if (res.data.message === "ok") {
        console.log("Traducción realizada correctamente");
        console.log(res.data.data.textTranslate);
        translated = res.data.data.textTranslate;
      } else {
        console.log("Error al realizar la traducción");
      }
    } catch (error) {
      console.log(error);
    }

    const updatedComentarios = [...comentarios];
    const index = updatedComentarios.findIndex(
      (comentario) => comentario._id === idComentario
    );
    updatedComentarios[index].comment = translated;
    setComentarios(updatedComentarios);

    console.log(comentarios);
    //console.log(descTranslated);
  };

  const handleShowComentarios = async (idPublicacion) => {
    if (showComentarios) {
      setShowComentarios(false);
      setComentarios([]);
      setIdPublicacion("");
    } else {
      //obtener comentarios de la publicacion
      try {
        console.log(idPublicacion);
        const res = await Service.getComments(idPublicacion, token);

        console.log(res);
        if (res.data.message === "ok") {
          const comentariosData = res.data.data;
          setIdPublicacion(idPublicacion);
          console.log(comentariosData);
          setComentarios(comentariosData);
          console.log("Comentarios obtenidos correctamente");
          setShowComentarios(true);
        } else {
          console.log("Error al obtener los comentarios");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const eleccionIdioma = (idioma) => {
    setIdioma(idioma);
  };

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      const res = await Service.createPublication(fData, token);
      if (res.data.message === "Publication created") {
        console.log("Publicación agregada correctamente");
        setMakePublicacion(false);
        setSelectedImage(null);
      } else {
        console.log("Error al agregar la publicación");
      }
    } catch (error) {
      console.log(error);
    }
    setResponse("ADD");

    setFData({
      description: "",
      image: "",
    });
  };

  const filterPublications = (filters) => {
    console.log(filters);
    setSelectedOption(filters);
  };

  useEffect(() => {
    if (selectedOption.length === 0) {
      setHayPublicaciones(false);
    } else {
      setHayPublicaciones(true);
      if (selectedOption.some((option) => option.value === "Todos")) {
        setFilteredPublications(publicaciones);
      } else {
        const filtered = publicaciones.filter((publicacion) => {
          return selectedOption.some((option) => {
            return publicacion.labels.includes(option.value);
          });
        });
        setFilteredPublications(filtered);
      }
    }
  }, [selectedOption, response]);

  const handleAddComentarios = async (e) => {
    e.preventDefault();

    let data = {
      comment: inputComentario,
      idPublication: idPublicacion,
    };

    try {
      const res = await Service.createComment(data, token);
      if (res.data.message === "Comentario creado correctamente") {
        setMakeComment(false);
        setResponse("ADDC");
        setInputComentario("");
        //obtener comentarios de la publicacion
        try {
          console.log(idPublicacion);
          const res = await Service.getComments(idPublicacion, token);

          console.log(res);
          if (res.data.message === "ok") {
            const comentariosData = res.data.data;
            setComentarios(comentariosData);
          } else {
            console.log("Error al obtener los comentarios");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Error al agregar el comentario");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalComentarios = () => {
    if (makeComment) {
      setMakeComment(false);
    } else {
      setMakeComment(true);
    }
  };

  const handleCommentChange = (event) => {
    setInputComentario(event.target.value);
  };

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    console.log(date);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so we add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col">
      <div className="ml-[16rem] flex-1 ">
        <div className="flex cols-2 gap-4">
          <div className="flex flex-col w-8/12 h-screen">
            <div className="h-1/6">
              <div className="h-full p-4">
                <div className="h-full  p-4">
                  <div className="grid grid-cols-3">
                    <div className="px-2">
                      <h1 className="text-xl font-bold">Traducción: </h1>
                      <Select
                        options={options}
                        defaultValue={options[0]}
                        onChange={(e) => eleccionIdioma(e.value)}
                      />
                    </div>
                    <div className="px-2 col-span-2">
                      <h1 className="text-xl font-bold">Filtros: </h1>
                      <Select
                        isMulti
                        defaultValue={[filters[0]]}
                        options={filters}
                        onChange={filterPublications}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="py-2 px-8 ">
                <button
                  className="bg-darkBlue hover:bg-celeste text-white font-bold py-2 px-4 rounded flex "
                  onClick={() => handleMakePublicacion()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  Publicar
                </button>
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <h1 className="text-2xl font-bold text-white">
                  No hay publicaciones 
                </h1>
              </div>
            ) : (
              <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-hide ">
                {!hayPublicaciones ? (
                  <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500">
                    </div>
                  </div>
                ) : (
                  filteredPublications.map((publicacion) => {
                    return (
                      <div className=" px-4 py-4 rounded-lg border border-black mb-4 bg-white">
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            <img
                              className="h-16 w-16 rounded-full"
                              src={publicacion.data.pathImage}
                              alt=""
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xl font-medium text-gray-900">
                              <p>
                                {publicacion.data.name +
                                  " " +
                                  publicacion.data.lastName}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              {publicacion.data.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatFecha(publicacion.createdAt)}
                            </p>
                          </div>
                          <div className="flex-shrink-0 self-start">
                            <button
                              className="rounded-full p-2 bg-celeste mx-4 hover:bg-celeste_claro"
                              onClick={() =>
                                handleShowComentarios(publicacion._id)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                />
                              </svg>
                            </button>

                            <button
                              className="rounded-full p-2 bg-lila hover:bg-lila/50"
                              onClick={() =>
                                handleTranslate(
                                  publicacion._id,
                                  publicacion.description
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="mt-4 text-sm text-gray-700 flex items-center justify-center">
                          <img
                            class="object-scale-down h-56 w-96 "
                            src={publicacion.pathImage}
                          ></img>
                        </div>
                        <div className="mt-4 text-sm text-gray-700 flex items-center justify-center">
                          <p> {publicacion.description}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
          <div className="h-screen w-4/12">
            {showComentarios ? (
              <div className="h-screen bg-black/50 overflow-y-auto scrollbar-hide">
                {/*True*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
                  <h3 className=" text-2xl font-semibold text-white">
                    Comentarios
                  </h3>
                  <button
                    className="flex text-black-500 bg-yellow-500 rounded p-1 ml-auto text-dark leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleModalComentarios()}
                  >
                    Agregar
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </span>
                  </button>

                  <button
                    className="text-red-500 p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleShowComentarios()}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 22"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*COMENTARIOS*/}
                {comentarios.map((comentario) => {
                  return (
                    <div className="flex justify-center py-1">
                      <div className="w-full rounded overflow-hidden shadow-lg bg-white mx-2">
                        <div className="flex items-center space-x-2 px-6 py-4">
                          <div className="flex-shrink-0">
                            <img
                              className="h-16 w-16 rounded-full"
                              src={comentario.pahtImageUser}
                              alt=""
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xl font-medium text-gray-900">
                              <p className="">
                                {comentario.nameUser +
                                  " " +
                                  comentario.lasNameUser}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">
                              {comentario.email}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatFecha(comentario.createdAt)}
                            </p>
                          </div>
                          <div className="flex-shrink-0 self-start">
                            <button
                              className="rounded-full p-2 bg-lila hover:bg-lila/50"
                              onClick={() =>
                                handleTranslateComment(
                                  comentario._id,
                                  comentario.comment
                                )
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className=" text-sm text-gray-700 p-3">
                          <p>{comentario.comment}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/*COMENTARIOS*/}
              </div>
            ) : (
              <div className="h-screen">
                {/*False*/}
                <div className="flex flex-col h-full justify-center items-center bg-gradient-to-tr from-darkBlue-70 via-black/70 to-darkBlue-70 animate-gradient">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">
                      Selecciona una publicación para visualizar los comentarios
                    </h1>
                    <div className="flex justify-center">
                      <WechatFilled className="py-7 text-white text-9xl animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL PUBLICACION */}
      {makePublicacion ? (
        <>
          <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className=" relative w-7/12 my-6 mx-auto">
              {/*content*/}
              <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-white border-darkBlue/75">
                {/*header*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
                  <h3 className=" text-2xl font-semibold">Nueva Publicación</h3>
                  <button
                    className="text-red-500 p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleMakePublicacion()}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 22"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form className="justify-center" onSubmit={(e) => handleAdd(e)}>
                  <div className="relative p-6 flex-auto">
                    <div className="max-w-md mx-auto border border-4 border-black rounded-xl border-dashed	">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-input"
                        required={true}
                      />
                      <label
                        htmlFor="file-input"
                        className="block bg-darkBlue text-white rounded-md p-2 cursor-pointer hover:bg-azul flex text-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                        Sube una imagen
                      </label>
                      {selectedImage && (
                        <div className="mt-2 flex text-center justify-center">
                          <img
                            src={selectedImage}
                            alt="Preview"
                            className="object-contain h-64 w-64"
                          />
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <label
                        htmlFor="title"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Descripción{" "}
                      </label>
                      <textarea
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Añade una descripción..."
                        name="description"
                        onChange={handleInputChange}
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="mt-4 text-center flex text-center justify-center">
                      <button
                        type="submit"
                        className="bg-purple-600 rounded-lg flex p-3 hover:bg-purple-700"
                      >
                        <p className="text-white">Publicar</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {makeComment ? (
        <>
          <div className="shadow-[0_2px_15px_-3px_rgba(255,255,255.07),0_10px_20px_-2px_rgba(255,255,255,0.04)] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className=" relative w-7/12 my-6 mx-auto">
              {/*content*/}
              <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-white border-darkBlue/75">
                {/*header*/}
                <div className=" flex text-black items-start justify-between p-5 border-b border-solid border-gray-500 rounded-t">
                  <h3 className=" text-2xl font-semibold">Nuevo Comentario</h3>
                  <button
                    className="text-red-500 p-1 ml-auto text-dark  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => handleModalComentarios()}
                  >
                    <span className="h-6 w-6 text-2xl block outline-none focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 22 22"
                        strokeWidth={1.5}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
                {/*body*/}

                <form
                  className="justify-center"
                  onSubmit={(e) => handleAddComentarios(e)}
                >
                  <div className="relative p-6 flex-auto">
                    <div className="mt-4">
                      <label
                        htmlFor="title"
                        className="block text-lg font-medium text-black"
                      >
                        {" "}
                        Comentario{" "}
                      </label>
                      <textarea
                        className="w-full border-2 rounded-lg border-black p-2"
                        placeholder="Añade un comentario..."
                        name="comment"
                        onChange={handleCommentChange}
                        rows="4"
                      ></textarea>
                    </div>
                    <div className="mt-4 text-center flex text-center justify-center">
                      <button
                        type="submit"
                        className="bg-purple-600 rounded-lg flex p-3 hover:bg-purple-700"
                      >
                        <p className="text-white">Publicar</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="white"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Home;
