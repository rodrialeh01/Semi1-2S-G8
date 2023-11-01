import React, { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import Service from '../../Service/Service';
import './registro.css';
function Registro(){
    const navigate = useNavigate();
    const style_font = {
        fontFamily: "'Josefin Sans', sans-serif",
    };
    const style_font2 = {
        fontFamily: "'Jost', sans-serif",
    }
    const style_font3 = {
        fontFamily: "'Assistant', sans-serif",
    }

	const[Nombres, setNombres] = useState('');
	const[Apellidos, setApellidos] = useState('');
  const[Dpi, setDpi] = useState('');
	const[Correo, setCorreo] = useState('');
	const[Contrasena, setContrasena] = useState('');
	const[ConfirmarContrasena, setConfirmarContrasena] = useState('');
	const[Foto, setFoto] = useState(null);
	const[namephoto, setNamephoto] = useState('Carga tu foto ');
  const [nameCamera, setNameCamera] = useState('Toma tu foto ');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null); // Nuevo estado para la imagen capturada
  const webcamRef = useRef(null);
    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const capture = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      console.log(imageSrc);
  
      // Verificar si hay una imagen capturada antes de intentar crear el objeto File
      if (imageSrc) {
        const file = dataURLtoFile(imageSrc, 'captured_image.png');
        console.log(file);
        setFoto(file);
        setNamephoto('captured_image.jpg');
        closeModal()
      }
  }

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

	//const navigate = useNavigate();
	const handleSubmit = (e) =>{
		e.preventDefault();
	}

	const onChangeNombres = (e) =>{
		setNombres(e.target.value);
	}

	const onChangeApellidos = (e) =>{
		setApellidos(e.target.value);
	}

  const onChangeDpi = (e) =>{
		setDpi(e.target.value);
	}

	const onChangeCorreo = (e) =>{
		setCorreo(e.target.value);
	}

	const onChangeContrasena = (e) =>{
		setContrasena(e.target.value);
	}

	const onChangeConfirmarContrasena = (e) =>{
		setConfirmarContrasena(e.target.value);
	}


    const videoConstraints = {
        width: 1280,      // Ancho deseado para la cámara en píxeles
        height: 720,     // Alto deseado para la cámara en píxeles
        facingMode: 'user',  // 'user' para la cámara frontal, 'environment' para la trasera
      };

	const handleValidacionRegistro = () =>{
		if(Nombres === '' || Apellidos === '' || Correo === '' || Contrasena === '' || ConfirmarContrasena === '' || Dpi === ''){
			toast('Todos los campos son obligatorios',
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
		if(Contrasena !== ConfirmarContrasena){
      toast('Las contraseñas no coinciden',
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
		if(Foto === null){
			toast('Debes cargar una foto o tomarte una foto',
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
        console.log('Foto')
        console.log(Foto)
		const formData = new FormData();
		formData.append('name', Nombres);
		formData.append('lastName', Apellidos);
		formData.append('email', Correo);
    formData.append('dpi', Dpi);
		formData.append('password', Contrasena);
		formData.append('image', Foto);

		try{
			Service.registroUsuario(formData)
			.then(response => {
				if(response.status === 200){
					toast.success('Usuario registrado correctamente, verifica tu correo electrónico para poder loguearte', 
            {
              icon: '✅',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
          );
          setTimeout(() => {
            navigate('/')
          }, 2000);
				}else{
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
        }
			})
      .catch(error => {
        console.log(error)
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
      });  
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
		}

	}
	const onChangeFoto = (e) =>{
		const selectedFile = e.target.files[0];
		console.log(selectedFile)
		setNamephoto(selectedFile.name);
		setFoto(selectedFile);
	}

    return (
        <div className="h-screen md:flex fuente">
	<div
		className="fuente3 relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-lightPurple to-purple-700 i justify-around items-center hidden" style={{ 
            backgroundImage: "url('https://i.postimg.cc/rmRN6QDh/hermosa-joven-capucha-gris-mirando-camara-sonrisa-cara-sosteniendo-telefono-apuntando-al-telefono-pi.jpg')", 
            backgroundColor: "rgba(127, 63, 191, 0.7)",
            backgroundSize: "cover", 
            backgroundPosition: "center center" }}>
		<div>
        <img src="https://i.postimg.cc/DzF9w4rd/Logo2.png"
              className="w-50 mx-auto opacity-60" alt="Logo" />
		</div>
	</div>
	<div className="flex md:w-1/2 justify-center py-10 items-center bg-black">
		<form className="bg-black" onSubmit={handleSubmit}>
			<h1 className="text-white font-bold text-4xl mb-1 " style={style_font}><span className='text-azul'>Bienvenido</span>, Regístrate!</h1>
			<p className="text-s font-normal text-white mb-7" style={style_font2}>A la red social más interactiva!</p>
			<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4" style={style_font3}>
                <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-black text-white" 
					type="text" 
					name="name_user" 
					id="name_user" 
					placeholder="Nombres" 
					onChange={onChangeNombres}
					value={Nombres}
					required
                    style={{ width: "100%" }}
				/>
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4" style={style_font3}>
                <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/306bac/user--v1.png" alt="user--v1"/>
				<input className="pl-2 outline-none border-none bg-black text-white" 
					type="text" 
					name="ap_user" 
					id="ap_user" 
					placeholder="Apellidos" 
					onChange={onChangeApellidos}
					value={Apellidos}
					required
                    style={{ width: "100%" }}
				/>
      </div>
					<div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4" style={style_font3}>
                    <img width="20" height="20" src="https://img.icons8.com/material-rounded/20/306bac/new-post.png" alt="new-post"/>
						<input className="pl-2 outline-none border-none bg-black text-white" 
							type="email" 
							name="email_user" 
							id="email_user" 
							placeholder="Correo Electrónico"
							onChange={onChangeCorreo}
							value={Correo} 
							required
                            style={{ width: "100%" }}
                        />
      </div>
      <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4" style={style_font3}>
      <img width="20" height="20" src="https://img.icons8.com/ios-filled/20/306bac/identification-documents.png" alt="identification-documents"/>
				<input className="pl-2 outline-none border-none bg-black text-white" 
					type="text" 
					name="dpi_user" 
					id="dpi_user" 
					placeholder="No. de DPI" 
					onChange={onChangeDpi}
					value={Dpi}
					required
                    style={{ width: "100%" }}
				/>
      </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4" style={style_font3}>
                    <img width="20" height="20" src="https://img.icons8.com/metro/20/306bac/password.png" alt="password"/>
							<input className="pl-2 outline-none border-none bg-black text-white" 
								type="password" 
								name="pass_user" 
								id="pass_user" 
								placeholder="Contraseña" 
								onChange={onChangeContrasena}
								value={Contrasena}
								required/>
      </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4" style={style_font3}>
                    <img width="20" height="20" src="https://img.icons8.com/metro/20/306bac/password.png" alt="password"/>
							<input className="pl-2 outline-none border-none bg-black text-white" 
							type="password" 
							name="pass_user2" 
							id="pass_user2" 
							placeholder="Confirmar Contraseña"
							onChange={onChangeConfirmarContrasena}
							value={ConfirmarContrasena} 
							required/>
      </div>
      <div className="grid grid-cols-2 gap-4" style={style_font3}>
  {/* Primer label */}
  <label className="flex items-center border-2 py-2 px-3 rounded-2xl cursor-pointer">
    <img 
      width="20" 
      height="20" 
      src="https://img.icons8.com/ios-filled/20/306bac/camera--v3.png" 
      alt="camera--v3"
    />
    <input 
      className="hidden" 
      type="file" 
      accept="image/*" 
      capture="camera" 
      name="photo_user" 
      id="photo_user" 
      onChange={onChangeFoto}
      required
    />
    <span className="pl-2 outline-none border-none bg-black text-white" style={{ pointerEvents: "none" }}>{namephoto}</span>
  </label>

  {/* Segundo label */}
  <label className="flex items-center border-2 py-2 px-3 rounded-2xl cursor-pointer" onClick={openModal}>
  <img 
      width="20" 
      height="20" 
      src="https://img.icons8.com/ios-filled/20/306bac/camera--v3.png" 
      alt="camera--v3"
    />
<span className="pl-2 outline-none border-none bg-black text-white" style={{ pointerEvents: "none" }}>{nameCamera}</span>
  </label>
  <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Tomar Foto"
  style={{
    content: {
      width: 'fit-content',
      height: 'fit-content',
      margin: 'auto',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }}
  className="bg-black text-white p-4 d-flex flex-column align-items-center justify-content-center"
>
  <Webcam
    audio={false}
    ref={webcamRef}
    screenshotFormat="image/jpeg"
    height={720}
    width={1280}
    videoConstraints={videoConstraints}
  />
  <div className="mt-4 text-center"> {/* Añade la clase text-center aquí */}
    <button onClick={capture} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2" style={style_font3}>Capturar Foto</button>
    <button onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" style={style_font3}>Cancelar</button>
  </div>
</Modal>

</div>
        <button type="submit" className="block w-full bg-azul mt-4 py-2 rounded-2xl text-white font-semibold mb-2" onClick={handleValidacionRegistro} style={style_font3}>Registrar</button>
        <p className='text-sm ml-2 text-white'>Acaso ya tienes cuenta ? 
        <Link to="/" className="text-sm ml-2 hover:text-white cursor-pointer text-azul">Inicia Sesión</Link></p>
		</form>
	</div>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
</div>

    );
}

export default Registro;