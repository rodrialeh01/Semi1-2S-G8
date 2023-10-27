import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Service from '../../Service/Service';
import { useAuthContext } from '../../context/AuthContext';
import { Desencriptar } from '../../utils/main';
import './Login.css';

function FaceId() {
  const [email_user, setEmail_user] = useState('');
  const [pass_user, setPass_user] = useState('');
  const [videoStream, setVideoStream] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const { user } = useParams();
  const { userLog, setUserLog } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Acceder a la cámara cuando el componente se monta
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        setVideoStream(stream);
      })
      .catch((error) => {
        console.error('Error al acceder a la cámara: ', error);
      });

    // Limpiar el stream cuando el componente se desmonta
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  function dataURLtoFile(dataURL, fileName) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], fileName, { type: mime });
  }
  
  const handleCapture = () => {
    if (videoStream) {
      const videoElement = document.querySelector('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // Establecer el tamaño del canvas igual al tamaño del video
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
  
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
      // Obtener la imagen en formato base64
      const imageDataURL = canvas.toDataURL('image/png');
  
      // Convertir la imagen a un objeto File
      const file = dataURLtoFile(imageDataURL, 'captured_image.png');
      console.log(file);

      videoStream.getTracks().forEach(track => track.stop());
      const email = Desencriptar(user);
      console.log(email)
      const data = new FormData();
      data.append('email', email);
      data.append('image', file);
      console.log(data)

      try{
        Service.loginFaceId(data)
        .then(response => {
          if(response.status !== 200){
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
          console.log(response.data)
          const uslog = {
            user: response.data.data.user,
            token: response.data.data.token
          }
          console.log(uslog)
          localStorage.setItem('data_user', JSON.stringify(uslog));
          setUserLog(true);
          navigate('/user/home');
        })
        
      }catch(error){
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
    }
  }

  const style_font = {
    fontFamily: "'Quicksand', sans-serif",
  };

  const handleSubmit = (e) =>{
		e.preventDefault();
	}

  const onChangeEmail = (e) =>{
    setEmail_user(e.target.value);
  }

  const onChangePass = (e) =>{
    setPass_user(e.target.value);
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
                <button
                  className="mt-5 tracking-wide font-semibold bg-darkBlue text-gray-100 w-full py-4 rounded-lg hover:bg-purple transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  type="button" onClick={handleCapture} >
                  <span className="ml-3" style={style_font}>
                    Tomar la foto e Iniciar Sesión
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
              <div className="w-full h-full">
                {videoStream && (
                  <video
                    width="100%"
                    height="100%"
                    autoPlay
                    playsInline
                    muted
                    ref={(videoElement) => {
                      if (videoElement) {
                        videoElement.srcObject = videoStream;
                      }
                    }}
                    style={{
                        with: "100%",
                        height: "100%",
                        position:"relative",
                        overflow:"hidden",
                        objectFit: "cover",
                    }}
                  />
                )}
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

export default FaceId;