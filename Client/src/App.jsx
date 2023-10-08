import { useState } from "react";
import "./App.css";
import SideBar from "./components/Home/SideBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <Home />*/}
        <SideBar />
        {/*<Registro />*/}
        {/*<Login />*/}
        {/*<Password />*/}
        {/*<FaceId />*/}
      </div>
    </>
  );
}

export default App;
