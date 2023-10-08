import { useState } from "react";
import "./App.css";
import SideBar from "./components/Home/SideBar";
import Home from "./components/Home/home";
import Solicitudes from "./components/Friends/Solicitudes"; 
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <SideBar />
        
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
