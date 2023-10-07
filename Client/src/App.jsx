import { useState } from "react";
import "./App.css";
import Home from "./components/Home/home";
import SideBar from "./components/Home/SideBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <Home />*/}
        <SideBar />
      </div>
    </>
  );
}

export default App;
