import './index.scss'
import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "@/components/pages/RegisterPage";
import HomePage from './components/pages/HomePage';
import ExamplePage from './components/pages/ExamplePage';
import ProfilePage from './components/pages/ProfilePage';
import AdminPage from "./components/pages/AdminPage";
import HackathonPage from "./components/pages/HackathonPage";
import Navbar from "./components/CNavbar";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk } from './redux/features/userSlice';
import StartPage from "@/components/pages/StartPage/index.jsx";

function App() {
    const location = useLocation();
  const dispatch = useDispatch()
  const { bearer: bearerFromStore } = useSelector((state) => state.userStore)

  useEffect(() => {
      const bearer = localStorage.getItem('token')
      if (bearer) {
        dispatch(getUserThunk())
      }
  }, [dispatch, bearerFromStore])


  return (
    <div className="appContainer">
      {location.pathname !== "/register" && location.pathname !== "/login"  && location.pathname !== "/" && (
        <Navbar />
      )}
      <Routes>
        <Route path='/' element={<StartPage/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/example" element={<ExamplePage />} />
        <Route path='/profile' element={<ProfilePage />}/>
      </Routes>
    </div>
  );
}

export default App;
