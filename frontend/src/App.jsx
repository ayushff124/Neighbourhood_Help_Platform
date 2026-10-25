import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import {useAuth} from './context/AuthContext';
import Home from './pages/Home';
import Community from './pages/Community';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import CreatePost from './pages/CreatePost';
import PostDetails from './pages/PostDetails';
import Messages from './pages/Messages';
import MessageThread from './pages/MessageThread';
import Notifications from './pages/Notifications';
import Map from './pages/Map';
import Chatbot from './components/Chatbot';
import './styles.css';

function Private({children}){
  const {user,loading}=useAuth();
  if(loading)return <div className="loading">Loading Neighborhood Help...</div>;
  return user?children:<Navigate to="/login" replace/>;
}

export default function App(){
  return <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/verify-otp" element={<VerifyOtp/>}/>
      <Route path="/community" element={<Private><Community/></Private>}/>
      <Route path="/create" element={<Private><CreatePost/></Private>}/>
      <Route path="/post/:id" element={<Private><PostDetails/></Private>}/>
      <Route path="/messages" element={<Private><Messages/></Private>}/>
      <Route path="/messages/:id" element={<Private><MessageThread/></Private>}/>
      <Route path="/notifications" element={<Private><Notifications/></Private>}/>
      <Route path="/map" element={<Private><Map/></Private>}/>
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
    <Chatbot/>
  </BrowserRouter>;
}
