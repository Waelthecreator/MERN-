import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/404";
import ViewAll from "./pages/ViewAll";
import Guide from "./pages/Guide";
import Navbar from './components/Nav';
import SignUp from "./pages/Sign";
import Logout from "./pages/logout";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path='/ViewPersonal' element={<ViewAll page="personal"/>} />
        <Route path='/Guide' element={<Guide />} />
        <Route path='/Guide/:name' element={<Guide />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/Signup' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App;
