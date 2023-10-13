import { useState } from "react";
import "./App.css";
import Registro from './pages/registro/registro';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/*<SideBar />*/}
        {/*< EditProfile />*/}
        {/*<Solicitudes />*/}
        {/*<Home />*/}
        <Registro />
        {/*<Login />*/}
        {/*<Password />*/}
        {/*<FaceId />*/}
      </div>
    </>
  );
}

export default App;
