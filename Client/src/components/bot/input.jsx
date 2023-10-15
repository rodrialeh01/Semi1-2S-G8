import React from 'react'
import './input.css'
import { IconContext } from 'react-icons/lib'
import { IoIosSend } from 'react-icons/io'

export default function Input({ setNewMessage }) {
  const[message, setMessage] = React.useState('')

  const handle_send = () => {
    setNewMessage(message)
    setMessage('')
  }

  return (
    <div className='flex container'>
      <div className='input'>
        <input
          type="text"
          placeholder="Type something..."
          className="input2 text-white placeholder-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="send" onClick={handle_send}>
          <IconContext.Provider value={{ color: '#F4FFE9', size: '30px' }}>
            <IoIosSend />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  )
}
