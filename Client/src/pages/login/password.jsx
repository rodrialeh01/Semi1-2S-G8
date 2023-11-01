import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Service from '../../Service/Service';
import { useAuthContext } from '../../context/AuthContext';
import { useChatContext } from '../../context/ChatContext';
import { Desencriptar } from '../../utils/main';
import './login.css';

function Password() {
  const [pass_user, setPass_user] = useState('');
  const { user } = useParams();
  const navigate = useNavigate();
  const { userLog, setUserLog } = useAuthContext();
  const { userC, setUserC } = useChatContext();
  const style_font = {
    fontFamily: "'Quicksand', sans-serif",
  };

  const handleSubmit = (e) =>{
		e.preventDefault();
	}

  const onChangePass = (e) =>{
    setPass_user(e.target.value);
  }

  const handleLogin = () => {
    const email = Desencriptar(user);
    const data = {
      email: email,
      password: pass_user
    }
    console.log(data)
    try{
      Service.loginPassword(data)
      .then(response => {
        if(response.status !== 200){
          setTimeout(() => {
            toast('Hubo un error!, intentalo de nuevo',
              {
                icon: '❌',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              }
            );
            navigate('/');
          }, 2000);
        }
        console.log(response.data)
        const uslog = {
          user: response.data.data.user,
          token: response.data.data.token
        }
        localStorage.setItem('data_user', JSON.stringify(uslog));
        setUserLog(true);
        setUserC(response.data.data.user);
        navigate('/user/home');
      })
      .catch(error => {
        console.log(error)
        setTimeout(() => {
          toast('Hubo un error!, intentalo de nuevo',
            {
              icon: '❌',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
          navigate('/');
        }, 2000);
      })
      console.log(userC)
    }catch(error){
      toast('Hubo un error!, intentalo de nuevo',
        {
          icon: '❌',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
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
                  className="w-full px-8 py-4 rounded-lg font-medium text-black bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password" placeholder="Password" style={style_font} id="pass_user" name="pass_user"
                  onChange={onChangePass}
                  value={pass_user}/>
                <button
                  className="mt-5 tracking-wide font-semibold bg-darkBlue text-gray-100 w-full py-4 rounded-lg hover:bg-purple transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="button" onClick={handleLogin} >
                  <span className="ml-3" style={style_font}>
                    Inicia Sesión
                  </span>
                </button>
                <p className="mt-6 text-xs text-white text-center"style={style_font}>
                  ¿Acaso no tienes cuenta? , 
                  <Link to="/registrarse" className="border-b border-darkBlue border-dotted text-darkBlue"style={style_font} >
                    Registrate Aqui
                  </Link>
                </p>
                <p className="mt-6 text-xs text-white text-center"style={style_font}>
                  <Link to="/login" className="border-b border-darkBlue border-dotted text-darkBlue"style={style_font} >
                    Regresar
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
      <div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      </div>
    </div>
    );
}

export default Password;