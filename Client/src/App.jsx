import { useState } from "react";
import "./App.css";
import SideBar from "./components/Home/SideBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex">
        {/* <Home />*/}
        <SideBar />
        {/*<Registro />*/}
        {/*<Login />*/}
        {/*<Password />*/}
        {/*<FaceId />*/}
        <Home />
      </div>
    </>
  );
}

export default App;
