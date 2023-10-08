import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import Webcam from 'react-webcam';
import './registro.css';
function Registro(){
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
	const[Correo, setCorreo] = useState('');
	const[FechaNacimiento, setFechaNacimiento] = useState('');
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
            // Convertir la imagen a un Blob
            const blob = new Blob([imageSrc], { type: 'image/jpeg' });
    
            // Crear un objeto File a partir del Blob
            const file = new File([blob], 'captured.jpg', { type: 'image/jpeg' });
            console.log(file);
    
            // Asignar el archivo a tu estado Foto
            setFoto(file);
            setNamephoto('captured.jpg');
            closeModal()
        }
    }
	//const navigate = useNavigate();
	const handleSubmit = (e) =>{
		e.preventDefault();
	}

	const onChangeNombres = (e) =>{
		console.log(e.target.value);
		setNombres(e.target.value);
	}

	const onChangeApellidos = (e) =>{
		setApellidos(e.target.value);
	}

	const onChangeCorreo = (e) =>{
		setCorreo(e.target.value);
	}

	const onChangeFechaNacimiento = (e) =>{
		console.log(e.target.value);
		setFechaNacimiento(e.target.value);
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
		if(Nombres === '' || Apellidos === '' || Correo === '' || Contrasena === '' || ConfirmarContrasena === ''){
			alert('Todos los campos son obligatorios');
			return;
		}
		if(Contrasena !== ConfirmarContrasena){
			alert('Las contraseñas no coinciden');
			return;
		}
		if(Foto === null){
			alert('Debes cargar una foto');
			return;
		}
        console.log('Foto')
        console.log(Foto)
		const formData = new FormData();
		formData.append('nombres', Nombres);
		formData.append('apellidos', Apellidos);
		formData.append('correo', Correo);
		formData.append('password', Contrasena);
		formData.append('fecha_nac', FechaNacimiento);
		formData.append('imagen', Foto);

		{/*try{
			Service.registro(formData)
			.then(response => {
				if(response.status){
					alert('Usuario registrado correctamente');
					navigate('/login')
				}
			})
		}catch(error){
			console.log(error);
		}*/}

	}
	const onChangeFoto = (e) =>{
		const selectedFile = e.target.files[0];
		console.log(selectedFile)
		setNamephoto(selectedFile.name);
		setFoto(selectedFile);
	}

    const onChangeCamera = (e) =>{
        console.log('Camera');
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
					placeholder="Nombre Completo" 
					onChange={onChangeNombres}
					value={Nombres}
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
					onChange={onChangeApellidos}
					value={Apellidos}
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
        <a to="/" className="text-sm ml-2 hover:text-white cursor-pointer text-azul">Inicia Sesión</a></p>
		</form>
	</div>
</div>
    );
}

export default Registro;