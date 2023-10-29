import { formatDistanceToNow } from 'date-fns';
import { parseISO } from 'date-fns/esm';
import React, { useEffect, useState } from "react";
import { TbSend } from "react-icons/tb";
import InputEmoji from 'react-input-emoji';
import Service from "../../Service/Service";
const Messages = ({token, idAmigo, idUser}) => {
    const [idChat, setIdChat] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [text_Message, setText_Message] = useState('');
    const [Foto, setFoto] = useState('');
    const [miData, setMiData] = useState([]);
    const [Nombre, setNombre] = useState('');
    useEffect(() => {
        const divchat = document.getElementById('divchat');
        divchat.scrollTop = divchat.scrollHeight;

        Service.getChat(token, idUser, idAmigo)
        .then((res) => {
            setIdChat(res.data.data[0]._id);
        })
        .catch((err) => {
            console.log(err)
        })

        Service.getUser(idAmigo, token)
        .then((res) => {
            setFoto(res.data.data.pathImage);
            setNombre(res.data.data.name);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        Service.getChatMessages(token, idChat)
        .then((res) => {
            console.log("response messages: ",res.data)
            setMensajes(res.data.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }, [idChat])
    console.log("id chat:", idChat)
    console.log("mensajes: ", mensajes)

    const formatoMessage = (message) => {
        console.log("message: ",message)
        if(message.senderId  !== idUser){
            const data = []
            const fecha = parseISO(message.createdAt);
            const diferencia = formatDistanceToNow(fecha, { addSuffix: true });
            data.push({
                nombre: Nombre,
                mensaje: message.text,
                hora: diferencia
            })

            return (
                <div className='flex gap-4'>
                    <img 
                        src={Foto} 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            {data[0].nombre + " "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                {data[0].hora}
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>{data[0].mensaje}</p>
                    </div>
                </div>
            )
        }else{
            const data2 = []
            const fecha = parseISO(message.createdAt);
            const diferencia = formatDistanceToNow(fecha, { addSuffix: true });
            const datau = JSON.parse(localStorage.getItem('data_user'));
            data2.push({
                mensaje: message.text,
                foto: datau.user.pathImage,
                hora: diferencia
            })
            return (
                <div className='flex justify-end gap-4'>
                    <img 
                        src={data2[0].foto} 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full order-1'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold mb-2 text-right'>
                            <span className='text-gray-500 font-normal text-sm mr-8'>
                                {data2[0].hora}
                            </span>
                            Yo
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tl-lg rounded-br-lg rounded-bl-lg text-gray-300 order-1'>
                            {data2[0].mensaje}
                        </p>
                    </div>
                </div>
            )
        }
    }
    const onChangeMessageHandler = (e) => {
        console.log(e)
        setText_Message(e);
    }
    
    const sendMessageHandler = () => {
        if(text_Message.trim() !== ''){
            const data = {
                chatId: idChat,
                senderId: idUser,
                text: text_Message
            }
            Service.sendMessage(token, data)
            .then((res) => {
                console.log(res.data)
                setText_Message('');
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    const handleSubmit = (e) =>{
		e.preventDefault();
	}
    
    return (
        <div>
            <div className='absolute left-0 top-0 w-full flex items-center gap-8 p-8 border-b border-gray-700'>
                <div className='flex justify-center items-center'>
                    <img src={Foto} 
                    alt="profile photo"
                    className='w-12 h-12 object-cover rounded-full' 
                    />
                </div>
                <div>
                    <div className='flex-1 flex items-center justify-between'>
                        <h1 className='text-3xl text-gray-300 font-semibold'>{Nombre}</h1>
                    </div>
                </div>
            </div>
            {/* SEND MESSAGE */}
            <div className='absolute bg-[#22222A] left-0 bottom-0 w-full p-8'>
                <form className='relative flex items-center' onSubmit={handleSubmit}>
                    <InputEmoji
                        value={text_Message}
                        onChange={onChangeMessageHandler}
                        placeholder="Escribe un mensaje"
                    />
                    <div onClick={sendMessageHandler} className='ml-2'> 
                        <TbSend className='flex text-gray-300 text-2xl hover:cursor-pointer'/>
                    </div>
                </form>
            </div>
            {/* CHAT */}
            <div id="divchat" className='mt-24 max-h-[calc(100vh-10rem)] h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide pb-24'>
                {mensajes.map((message) => (
                    formatoMessage(message)
                ))}                
            </div>
        </div>
    );
}

export default Messages;