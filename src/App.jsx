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
import HackathonEditPage from './components/pages/HackathonEditPage';
import { getCategoriesThunk, getOrganizationsThunk } from './redux/features/dictionarySlice';
import TestPage from "@/components/pages/TestPage/index.jsx";
import StartHackathonPage from "@/components/pages/StartHackathonPage/index.jsx";
import AcceptPage from "@/components/pages/AcceptPage/index.jsx";
import { fetchUsersThunk } from './redux/features/usersSlice';
import HackathonCheckPage from './components/pages/HackathonCheckPage';



function App() {
    const location = useLocation();
  const dispatch = useDispatch()
  const { bearer: bearerFromStore, userInfo } = useSelector((state) => state.userStore)


  useEffect(() => {
      const bearer = localStorage.getItem('token')
      if (bearer) {
        dispatch(getUserThunk())
      }
  }, [dispatch, bearerFromStore])

  useEffect(() => {
    dispatch(getCategoriesThunk())
    dispatch(getOrganizationsThunk())
    if (userInfo.statusCode === 401 && location.pathname !== '/login' && location.pathname !== '/register') {
      window.location.replace('/login')
    } 
    if (userInfo.statusCode === 403) {
      window.location.replace('/404')
    } 
  }, [dispatch, userInfo])
  
  useEffect(() => {
    if (userInfo && userInfo?.role === 'admin') {
      dispatch(fetchUsersThunk())
    }
  }, [dispatch, userInfo])


  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onopen = () => {
      console.log('Соединение установлено');
    };

    socket.onmessage = (event) => {
      console.log('Получено сообщение:', event.data);
      // здесь в зависимости от того что пришло, можно дёргать диспатчи
    };

    socket.onclose = () => {
      console.log('Соединение закрыто');
    };

    socket.onerror = (error) => {
      console.error('Ошибка:', error);
    };

    // Очистка эффекта
    return () => {
      socket.close();
    };
  }, []);

  

  return (
    <div className="appContainer">
      {location.pathname !== "/register" && location.pathname !== "/login"  && location.pathname !== "/" && (
        <Navbar />
      )}
      <div className='mainWrapper'>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/hackathon" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/example" element={<ExamplePage />} />
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/newhackathon' element={<HackathonEditPage />} />
          <Route path='/hackathon/:id/check' element={<HackathonCheckPage />}/>
          <Route path='/hackathon/:id' element={<HackathonPage />}/>
          <Route path='/hackathon/:id/start' element={<StartHackathonPage/>}/>
          <Route path='/hackathon/:id/tasks' element={<TestPage />}/>
          <Route path='/hackathon/:id/edit' element={<HackathonEditPage />}/>
          <Route path='/test' element={<TestPage/>}/>
          <Route path='/team/accept/:teamId/:userId' element={<AcceptPage />} />
          
        </Routes>
      </div>
    </div>
  );
}

export default App;
