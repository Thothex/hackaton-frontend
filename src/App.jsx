import './index.scss'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/index.jsx";


function App() {
  return (
    <>
<Routes>
    <Route path='/login' element={<LoginPage/>}/>
</Routes>
    </>
  )
}

export default App
