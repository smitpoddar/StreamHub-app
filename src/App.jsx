import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import { Route,Routes } from "react-router-dom"
import Player from "./pages/Player/Player";
import { ToastContainer, toast } from "react-toastify";

function App(){
  return (
    <div>
    <ToastContainer theme="dark"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
      </Routes>
    </div>
  );
}

export default App
