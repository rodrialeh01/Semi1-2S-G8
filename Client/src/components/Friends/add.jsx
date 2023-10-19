import React, { useEffect } from 'react'
import CardAddFriend from '../card/addFriend'
import '../bot/style.css'
export default function AddFriend() {
  const [users, setUsers] = React.useState([
    {
      id: 1,
      name: 'Emily Rodd',
      email: 'userwe1@gmail.com',
      photo: 'https://preview.redd.it/emily-rudd-v0-h5oen1oe1qjb1.jpg?auto=webp&s=d5d9eef3bd7b4a0453459a710069b10c6809c4c9'
    },
    {
      id: 2,
      name: 'Henrry Cavil',
      email: 'user2@gmail.com',
      photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Henry_Cavill_%2848417913146%29_%28cropped%29.jpg/800px-Henry_Cavill_%2848417913146%29_%28cropped%29.jpg'
    }
  ])

  useEffect(() => {
    // add more users
    const moreUsers = [...users]
    for(let i = 3; i < 10; i++) {
      const newUser = {
        id: i,
        name: 'Tonelito',
        email: `user${i}@gmail.com`,
        photo: 'https://www.soy502.com/sites/default/files/styles/escalar_image_inline/public/2023/Oct/11/tonel_pmt_guatemala.jpeg'
      }
      moreUsers.push(newUser)
    }
    setUsers(moreUsers)
  }, [])

  return (
    <div className="h-screen max-h-screen w-screen bg-gradient-to-tr from-darkBlue to-azul flex flex-col">
      <div className="ml-[16rem] flex-1">
        <div className='h-1/6 flex flex-col items-center justify-center'>
          <h1 className="text-2xl text-white font-bold">
            Conoces a alguien? Agrégalo!
          </h1>
        </div>
        <div className="w-full height-100 flex flex-wrap overflow-y-auto scrollbar-hide  justify-center p-5">
          {
            users.map((user) => 
            <CardAddFriend
            key={user.id}
            user={user}/>
            )
          }
        </div>
      </div>
    </div>
  )
}
