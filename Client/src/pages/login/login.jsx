import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Encriptar, validarCorreo } from '../../utils/main';


import './login.css';

function Login() {
  const [email_user, setEmail_user] = useState('');
  const navigate = useNavigate();
  const { userLog, setuserLog } = useAuthContext();
  useEffect(() => {
    console.log(userLog)
    if(userLog){
      navigate('/user/home');
    }
  }, [userLog])
  
  const style_font = {
    fontFamily: "'Quicksand', sans-serif",
  };

  const handleSubmit = (e) =>{
		e.preventDefault();
	}

  const onChangeEmail = (e) =>{
    setEmail_user(e.target.value);
  }

  const iniciarConContraseña = () => {
    if(email_user === ''){
      toast('No puedes dejar el input en blanco',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      return;
    }
    if(validarCorreo(email_user) === false){
      toast('El correo no es valido',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      return;
    }
    const emailEncriptado = Encriptar(email_user);
    console.log(emailEncriptado);
    navigate(`/login/password/${emailEncriptado}`);
  }

  const iniciarConFaceID = () => {
    if(email_user === ''){
      toast('No puedes dejar el input en blanco',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      return;
    }
    if(validarCorreo(email_user) === false){
      toast('El correo no es valido',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      return;
    }
    const emailEncriptado = Encriptar(email_user);
    console.log(emailEncriptado);
    navigate(`/login/faceid/${emailEncriptado}`);
  }
    return (
        <div className="min-h-screen bg-celeste text-white flex justify-center fuente" >
      <div className="max-w-screen-xl m-0 sm:m-10 bg-azul shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <form className="bg-azul" onSubmit={handleSubmit}>
          <div>
            <img src="https://i.postimg.cc/TP3XcWK2/Semi-Social-Logo3.png"
              className="w-52 mx-auto" alt="Logo" />
          </div>
          <div className="mt-12 flex flex-col items-center" >
            <h1 className="text-2xl xl:text-3xl font-bold" style={style_font}>
              Inicia Sesión
            </h1>
            <div className="w-full flex-1 mt-8">
            
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email" placeholder="Email" style={style_font} id="email_user" name="email_user"
                  onChange={onChangeEmail}
                  value={email_user}/>
                <button
                  className="mt-5 tracking-wide font-semibold bg-darkBlue text-gray-100 w-full py-4 rounded-lg hover:bg-purple transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="button" onClick={iniciarConContraseña} >
                  <span className="ml-3" style={style_font}>
                    Iniciar Sesión con Contraseña
                  </span>
                </button>
                <button
                  className="mt-5 tracking-wide font-semibold bg-darkBlue text-gray-100 w-full py-4 rounded-lg hover:bg-purple transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="button" onClick={iniciarConFaceID} >
                  <span className="ml-3" style={style_font}>
                    Iniciar Sesión con Face ID
                  </span>
                </button>
                <p className="mt-6 text-xs text-white text-center"style={style_font}>
                  ¿Acaso no tienes cuenta? , 
                  <Link to="/registrarse" className="border-b border-darkBlue border-dotted text-darkBlue"style={style_font} >
                    Registrate Aqui
                  </Link>
                </p>
              </div>
            </div>
          </div>
          </form>
        </div>
        <div className="flex-1 bg-strongPurple text-center hidden lg:flex">
            <div className="flex flex-1 items-center justify-center">
                <div className="w-full h-full bg-contain bg-center bg-no-repeat"
                    style={{ 
                        backgroundImage: "url('https://i.postimg.cc/Lsb30r8Y/concepto-collage-reconocimiento-facial.jpg')", 
                        backgroundSize: "cover", 
                        backgroundPosition: "center center" }}>
                </div>
            </div>
        </div>

      </div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
    );
}

export default Login;