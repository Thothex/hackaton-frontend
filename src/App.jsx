import './index.scss'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/index.jsx";
import RegisterPage from "@/components/pages/RegisterPage/index.jsx";


function App() {
  return (
    <>
<Routes>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
</Routes>
    </>
  )
}

export default App
