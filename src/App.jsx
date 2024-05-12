import './index.scss'
import { Route, Routes, useLocation } from "react-router-dom";
import {Button, ConfigProvider, Modal} from 'antd'
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "@/components/pages/RegisterPage";
import HomePage from './components/pages/HomePage';
import ExamplePage from './components/pages/ExamplePage';
import ProfilePage from './components/pages/ProfilePage';
import AdminPage from "./components/pages/AdminPage";
import HackathonPage from "./components/pages/HackathonPage";
import Navbar from "./components/CNavbar";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { approveUserRankStatusThunk, fetchUserRankStatusThunk, getUserThunk } from './redux/features/userSlice';
import StartPage from "@/components/pages/StartPage/index.jsx";
import HackathonEditPage from './components/pages/HackathonEditPage';
import { getCategoriesThunk } from './redux/features/dictionarySlice';
import {fetchOrganizations } from './redux/features/organizationsSlice.js';
import TestPage from "@/components/pages/TestPage/index.jsx";
import StartHackathonPage from "@/components/pages/StartHackathonPage/index.jsx";
import AcceptPage from "@/components/pages/AcceptPage/index.jsx";
import { fetchUsersThunk } from './redux/features/usersSlice';
import HackathonCheckPage from './components/pages/HackathonCheckPage';
import HackathonTeamPage from './components/pages/HackathonTeamPage';
import HackathonDashboard from './components/pages/HackathonDashboard';
import FeaturesPanel from "@/components/FeaturesPanel/index.jsx";
import HighscorePage from './components/pages/HighscorePage';
import Ranks from './constants/ranks';
import AboutPage from "@/components/pages/AboutPage/index.jsx";
import OrganizationsPage from "@/components/pages/OrganizationsPage/index.jsx";
import Organization from "@/components/pages/Organization/index.jsx";
import EnterEmail from "@/components/pages/LoginPage/forgotPassword/email.jsx";
import RecoverPage from "@/components/pages/LoginPage/forgotPassword/recover.jsx";
import {t} from "i18next";




function App() {
  const location = useLocation();
  const dispatch = useDispatch()
  const { bearer: bearerFromStore, userInfo, userRankStatus } = useSelector((state) => state.userStore)
  const { darkMode } = useSelector((state) => state.mode);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState({
    length:true,
    match:true,
    registerError:''
  })
  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(approveUserRankStatusThunk())
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
      const bearer = localStorage.getItem('token')
      if (bearer) {
        dispatch(getUserThunk())
      }
  }, [dispatch, bearerFromStore])

  useEffect(() => {
    dispatch(getCategoriesThunk())
    dispatch(fetchOrganizations())
    if (userInfo?.role) {
      dispatch(fetchUserRankStatusThunk())
    }
    if (userInfo.statusCode === 401 && location.pathname !== '/login' && location.pathname !== '/register') {
      window.location.replace('/login')
    }
    if (userInfo.statusCode === 403) {
      window.location.replace('/404')
    }
  }, [dispatch, userInfo])

  useEffect(() => {
    if (userRankStatus && userRankStatus?.approved === false && location.pathname === '/profile') {
      setIsModalOpen(true)
    }
  }, [userRankStatus])

  useEffect(() => {
    if (userInfo && userInfo?.role === 'admin') {
      dispatch(fetchUsersThunk())
    }
  }, [dispatch, userInfo])


  useEffect(() => {
    const socket = new WebSocket(import.meta.env.VITE_BASE_WS_URL);

    socket.onopen = () => {
      console.log('Соединение установлено');
    };

    socket.onmessage = (event) => {
    console.log('Получено сообщение:', event.data);
      const data = JSON.parse(event.data);
      if (data.code === 'fetch_rank_status') {
        dispatch(fetchUserRankStatusThunk())
      }
      // здесь в зависимости от того что пришло, можно дёргать диспатчи
    }

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

    <div className={`appContainer transition-all  
                     duration-500  
                     ease-in-out  
                     ${darkMode ?
        "dark " :
        ""}`}>
      {location.pathname !== "/register" && location.pathname !== "/login"  && location.pathname !== "/" && !location.pathname.startsWith('/recover') && location.pathname !=='/dashboard' && location.pathname !=='/newPass' && (
          <>
        <Navbar />
        </>
      )}
      {location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !=='/dashboard' && (
          <>
            <FeaturesPanel/>
          </>
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
          <Route path='/dashboard' element={<HackathonDashboard />} />
          <Route path='/hackathon/:id/check' element={<HackathonCheckPage />}/>
          <Route path='/hackathon/:id/check/:teamId' element={<HackathonTeamPage />}/>
          <Route path='/hackathon/:id' element={<HackathonPage />}/>
          <Route path='/hackathon/:id/start' element={<StartHackathonPage/>}/>
          <Route path='/hackathon/:id/tasks' element={<TestPage />}/>
          <Route path='/hackathon/:id/edit' element={<HackathonEditPage />}/>
          <Route path='/test' element={<TestPage/>}/>
          <Route path='/team/accept/:teamId/:userId' element={<AcceptPage />} />
          <Route path='/highscore' element={<HighscorePage />} />
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/organizations' element={<OrganizationsPage/>}/>
          <Route path='/organizations/:id' element={<Organization/>}/>
          <Route path='/newPass' element={<EnterEmail/>}/>
          <Route path='/recover/:email/:token' element={<RecoverPage/>}/>
        </Routes>
      </div>
      <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#8797c4",
              backgroundColor: "#f5f7fa",
              colorBgContainer: "white",
              margin: "0",
              colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
              colorTextBase: "rgba(113, 128, 150, 1)",
              fontFamily:'Geologica',
              width:'100%',
              borderRadius:20,
              border:'none'
            },
          }}
      >
      <Modal title={t('ProfilePage.newRank')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  footer={null}>
        <div className='flexCenterCol'>
          <p>{t('ProfilePage.yourNewRank')} {t(`ProfilePage.ranks.${userRankStatus?.rank}`)}</p>
          {userRankStatus?.rank && <img src={Ranks[userRankStatus?.rank?.toUpperCase()]?.img} alt={userRankStatus?.rank} />}
        </div>
      </Modal>
      </ConfigProvider>
    </div>
  );
}

export default App;
