import React from 'react'
import './style.css'
import { IconContext } from 'react-icons/lib'
import { IoIosSend } from 'react-icons/io'

export default function Input({ setNewMessage }) {
  const[message, setMessage] = React.useState('')

  const handle_send = () => {
    setNewMessage(message)
    setMessage('')
  }

  return (
    <div className='inp-container flex items-center justify-center'>
      <div className='inp-div-high flex items-center justify-evenly rounded-full bg-celeste '>
        <input
          type="text"
          placeholder="Type something..."
          className="inp text-white placeholder-white rounded-none outline-none bg-transparent"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center gap-10 cursor-pointer" onClick={handle_send}>
          <IconContext.Provider value={{ color: '#F4FFE9', size: '30px' }}>
            <IoIosSend />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}
