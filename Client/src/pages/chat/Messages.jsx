import React, { useEffect } from "react";
import { TbSend } from "react-icons/tb";
import Service from "../../Service/Service";
const Messages = ({token, idAmigo, idUser}) => {
    useEffect(() => {
        const divchat = document.getElementById('divchat');
        divchat.scrollTop = divchat.scrollHeight;
    }, [])

    const tieneChat = async () => {
        try {
            const res = await Service.getChatMessages(token, idUser);
            console.log("response chat: ", res.data);
    
            if (res.data.data.length > 0) {
                if (res.data.data.some(chat => chat.members.includes(idAmigo))) {
                    return true;
                } else {
                    return false;
                }
            }
            
            return false;
        } catch (error) {
            console.error("Error al obtener los mensajes del chat:", error);
            return false;
        }
    }
    
    (async () => {
        const result = await tieneChat();
        console.log("tiene chat xdxd:", result);
    })();
    
    return (
        <div>
            <div className='absolute left-0 top-0 w-full flex items-center gap-8 p-8 border-b border-gray-700'>
                <div className='flex justify-center items-center'>
                    <img src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                    alt="profile photo"
                    className='w-12 h-12 object-cover rounded-full' 
                    />
                </div>
                <div>
                    <div className='flex-1 flex items-center justify-between'>
                        <h1 className='text-3xl text-gray-300 font-semibold'>Nombre2</h1>
                    </div>
                </div>
            </div>
            {/* SEND MESSAGE */}
            <div className='absolute bg-[#22222A] left-0 bottom-0 w-full p-8'>
                <form className='relative'>
                    <input type="text" placeholder='Escribe tu mensaje' className='p-2 px-8 bg-[#1E1F24] outline-none w-full rounded-full text-gray-300 pl-10 pr-28' />
                    <TbSend className='absolute right-4 top-3 flex text-gray-300 hover:cursor-pointer'/>
                </form>
            </div>
            {/* CHAT */}
            <div id="divchat" className='mt-24 max-h-[calc(100vh-10rem)] h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide pb-24'>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                <div className='flex gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold'>
                            Nombre2{" "}
                            <span className='text-gray-500 font-normal text-sm ml-8'>
                                00:00
                            </span>
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tr-lg rounded-br-lg rounded-bl-lg text-gray-300'>Hi!, Are you still Web Designer</p>
                    </div>
                </div>
                
                <div className='flex justify-end gap-4'>
                    <img 
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo" 
                        className='w-8 h-8 object-cover rounded-full order-1'
                    />
                    <div >
                        <h4 className='text-gray-300 font-semibold mb-2 text-right'>
                            <span className='text-gray-500 font-normal text-sm mr-8'>
                                00:01
                            </span>
                            Yo
                        </h4>
                        <p className='bg-gray-700 py-2 px-4 rounded-tl-lg rounded-br-lg rounded-bl-lg text-gray-300 order-1'>
                            Hi!, Are you still Web Designer
                        </p>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Messages;