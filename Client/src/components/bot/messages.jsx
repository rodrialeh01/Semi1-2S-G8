import React, { useEffect } from 'react'
import './messages.css'
import Message from './message'

export default function Messages({newMessage}) {
  const [counter, setCounter] = React.useState(50)
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: 'Hello',
      sender: 'user',
      photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
    },
    {
      id: 2,
      text: 'Hi',
      sender: 'bot',
    },
    {
      id: 3,
      text: 'How are you?',
      sender: 'user',
      photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
    },
    {
      id: 4,
      text: 'Fine, thanks',
      sender: 'bot',
    },
    {
      id: 5,
      text: 'What about you?',
      sender: 'bot',
    },
    {
      id: 6,
      text: 'I am good',
      sender: 'user',
      photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
    },
    {
      id: 7,
      text: 'What is your name?',
      sender: 'user',
      photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
    },
    {
      id: 8,
      text: 'My name is Bot',
      sender: 'bot',
    },
    {
      id: 9,
      text: 'And you?',
      sender: 'bot',
    }, {
      id: 10,
      text: 'I am Messi',
      sender: 'user',
      photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
    },
    {
      id: 11,
      text: 'Nice to meet you',
      sender: 'bot',
    },
    {
      id: 12,
      text: 'Nice to meet you too',
      sender: 'user',
      photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
    }
  ])
  
  // add new message to messages
  useEffect(() => {
    if (newMessage !== '') {
      messages.push({
        id: counter,
        text: newMessage,
        sender: 'user',
        photo: 'https://fotografias.lasexta.com/clipping/cmsimages02/2023/10/08/913ED116-F5FB-490E-B40A-036BE565C6B2/leo-messi-inter-miami_98.jpg'
      })
      console.log(messages)
      setCounter(counter + 1)
    }
  }, [newMessage])

  return (
    <div className="flex flex-col overflow-y-auto  scrollbar-hide  h-3/4  justify-start h-screen gap-y-2 p-2">
      {messages.map((message) => (
        <Message 
        key={message.id} 
        message={message}
         />
      ))}
    </div>
  )
}
