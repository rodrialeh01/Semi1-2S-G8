import { React, useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import Messages from './Messages';

import Service from '../../Service/Service';
import { useChatContext } from '../../context/ChatContext';
const Chat = () => {
    const {userChats, isUserChatsLoading, userChatsError} = useChatContext();
    const [token, setToken] = useState('');
    const [amigos, setAmigos] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [idAmigo, setIdAmigo] = useState('');
    const [hayMensaje, setHayMensaje] = useState(false);
    const [ultimoMensaje, setUltimoMensaje] = useState('');
    const [idUser, setIdUser] = useState('');
    console.log("userChats",userChats);
    useEffect(() => {
        const user_data = JSON.parse(localStorage.getItem('data_user'));
        setToken(user_data.token);
        setIdUser(user_data.user._id);
        Service.getUserChats(user_data.token, user_data.user._id)
        .then((res) => {
            console.log("response chat: ",res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        
        Service.getUsers(user_data.token)
        .then((res) => {
            console.log("response: ",res.data)
            const onlyFriends = res.data.data.filter((user) => user._id !== user_data.user._id && user.isFriend === true);
            setAmigos(onlyFriends);
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    const showChatFriendHandler = (idFriend) => {
        tieneChat(idFriend)
        setShowChat(true);
        console.log("El amigo seleccionadoo fue:", idFriend)
        setIdAmigo(idFriend);
        console.log(token)
        const bodysend = {
            firstId: idUser,
            secondId: idFriend
        }
        if(!hayMensaje){
            Service.createChat(token, bodysend)
            .then((res) => {
                console.log("response chat: ",res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const tieneChat = (idFriend) => {
        Service.getChats(token, idUser)
        .then((res) => {
            if(res.data.data.length > 0){
                for(let i=0; i<res.data.data.length; i++){
                    if(res.data.data[i].members.includes(idFriend)){
                        Service.getChat(token, idUser, idFriend)
                        .then((res2) => {
                            Service.getChatMessages(token,res2.data.data[0]._id)
                            .then((res3) => {
                                if(res3.data.data.length > 0){
                                    setHayMensaje(true);
                                }
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                        break;
                    }
                }
            }            
        })
    }

    console.log("amigos: ",amigos)
    return (
        <div className='ml-[16rem] w-screen max-h-screen flex flex-col bg-[#22222A]'>
            <div className='h-[95vh] grid grid-cols-6 min-h-screen'>
            <section className='bg-[#22222A] col-span-1 p-8 overflow-y-scroll scrollbar-hide h-screen'>
                <div className='mb-8'>
                    <h1 className='text-white text-3xl mb-4'>Mensajes</h1>
                    <form className='hidden md:block'>
                        <div className='relative'>
                            <input 
                                type='text'
                                className='bg-[#050505] outline-none py-2 pl-4 pr-8 rounded text-gray-300 w-full'
                                placeholder='Buscar'
                            />
                            <AiOutlineSearch className='absolute right-2 top-3 text-gray-300'/>
                        </div>
                    </form>
                </div>
                <div>
                    {/* USER */}
                    {
                        amigos.map((amigo) => (
                            tieneChat(amigo._id),
                            <div href='#' className='flex w-full gap-2 mb-8 hover:bg-gray-800 rounded-[10px] cursor-pointer' onClick={() =>showChatFriendHandler(amigo._id)}>
                                <div className='w-[20%] relative flex items-center justify-center'>
                                    <img 
                                        src={amigo.pathImage} 
                                        alt="profile photo" 
                                        className='w-10 h-10 object-cover rounded-full'
                                    />
                                </div>
                                <div className='w-[80%] flex justify-between items-center'>
                                    <div>
                                        <h3 className='text-gray-300 font-semibold'>{amigo.name} <span className="text-gray-500 font-normal">00:00</span></h3>
                                        <p className='text-gray-400 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[12rem]'>
                                            {"Chatea conmigo!"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </section>
            <section className='bg-[#1E1F24]  p-8 relative col-span-4 max-w-full flex-1 w-full'>
                {/* HEADER */}
                {showChat && <Messages token={token} idAmigo={idAmigo} idUser={idUser}/>}
            </section>
            </div>
        </div>
    );
}

export default Chat;