import React from 'react'
import { FaRobot } from 'react-icons/fa'
import Messages from '../../components/bot/messages'
import { IconContext } from 'react-icons/lib'
import Input from '../../components/bot/input'

export default function Chatbot() {
  const [newMessage, setNewMessage] = React.useState('')  
  
  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col">
      <div className="ml-[16rem] flex-1">
        <div className='flex-col h-screen'>
          <div className='hder-high flex bg-celeste items-center justify-center'>
            <IconContext.Provider value={{ color: '#F4FFE9', size: '30px' }}>
              <FaRobot />
            </IconContext.Provider>
          </div>
          <Messages
          newMessage={newMessage}/>
          <Input 
          setNewMessage={setNewMessage}/>
        </div>
      </div>
    </div>
  )
}
