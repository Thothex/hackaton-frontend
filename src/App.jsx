import './index.scss'
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage/index.jsx";
import RegisterPage from "@/components/pages/RegisterPage/index.jsx";
import HomePage from './components/pages/HomePage/index.jsx';
import ExamplePage from './components/pages/ExamplePage/index.jsx';


function App() {
  return (
    <>
      <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/' element={<HomePage />}/>
          <Route path='/example' element={<ExamplePage />}/>
      </Routes>
    </>
  )
}

export default App
