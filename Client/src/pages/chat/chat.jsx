import { React } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { TbSend } from "react-icons/tb";
const Chat = () => {
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
                    <a href='#' className='flex w-full gap-2 mb-8'>
                        <div className='w-[20%] relative flex items-center justify-center'>
                            <img 
                                src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                                alt="profile photo" 
                                className='w-10 h-10 object-cover rounded-full'
                            />
                        </div>
                        <div className='w-[80%] flex justify-between'>
                            <div>
                                <h3 className='text-gray-300 font-semibold'>Nombre2</h3>
                                <p className='text-gray-400'>Hola bro!</p>
                            </div>
                            <div>
                                <h3 className='text-gray-500'>00:00</h3>
                                <span className='bg-red-600 text-white rounded-full py-1 px-2 text-xs float-right'>2</span>
                            </div>
                        </div>
                    </a>
                </div>
            </section>
            <section className='bg-[#1E1F24]  p-8 relative col-span-4 max-w-full flex-1 w-full'>
                {/* HEADER */}
                <div className='absolute left-0 top-0 w-full flex items-center gap-8 p-8 border-b border-gray-700'>
                    <div className='flex justify-center items-center'>
                        <img src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg?w=826&t=st=1698302186~exp=1698302786~hmac=ce7c94086209d45488726fb504536dec95eff764ec7f5e8006abbe16c9ea68cd" 
                        alt="profile photo"
                        className='w-12 h-12 object-cover rounded-full' 
                        />
                    </div>
                    <div>
                        <div className='flex-1 flex items-center justify-between'>
                            <h1 className='text-3xl text-gray-300'>Nombre2</h1>
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
                <div className='mt-24 max-h-[calc(100vh-10rem)] h-screen overflow-y-scroll overflow-x-hidden scrollbar-hide pb-24'>
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
            </section>
            </div>
        </div>
    );
}

export default Chat;