import { useState } from "react";
import "./App.css";
import Registro from './pages/registro/registro';
import Home from './components/Home/home';
import SideBar from './components/Home/SideBar';
import Solicitudes from './components/Friends/Solicitudes';
import Chatbot from "./pages/bot/chat";
import AddFriend from "./components/Friends/add";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/*<SideBar />*/}
        <SideBar />
        <AddFriend />
        {/*< EditProfile />*/}
        {/*<Solicitudes />*/}
        {/*<Home />*/}
        {/*<Registro />*/}
        {/*<Login />*/}
        {/*<Password />*/}
        {/*<FaceId />*/}
      </div>
    </>
  );
}

export default App;
