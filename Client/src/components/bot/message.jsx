import React from 'react'
import { IconContext } from 'react-icons/lib';
import { FaRobot } from 'react-icons/fa';
import { useEffect, useRef } from 'react';

export default function Message({ message }) {
  const ref = useRef();

  // Scroll to bottom when message is sent
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex h-10  ${message.sender !== "bot" && "flex-row-reverse"}`}>
      {
        message.sender === "bot" ?
          <div className="flex items-center gap-4">
            <IconContext.Provider className="gap-4" value={{ color: '#F4FFE9', size: '20px' }}>
              <FaRobot />
            </IconContext.Provider>
            <div className="bg-white p-2 rounded-b-lg rounded-tr-lg shadow-md">
              <p className="text-gray-800">
                {message.text}
              </p>
            </div>
          </div>
          :
          <div className='flex  items-center gap-4'>
            <div className="bg-sky-200 p-2 rounded-b-lg rounded-tl-lg shadow-md">
              <p className="text-gray-800 break-words">
                {message.text}
              </p>
            </div>
            <img
              src={message.photo}
              alt="Avatar"
              className="w-10 h-10 rounded-full" />
          </div>
      }
    </div>
  )
}
