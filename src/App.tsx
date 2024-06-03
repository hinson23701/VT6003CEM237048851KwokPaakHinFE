//import './App.css'
import 'antd/dist/reset.css';
import { Layout, Space,Col, FloatButton} from 'antd';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './components/about';
import { LogoutOutlined, HomeOutlined,DashboardOutlined,InfoCircleOutlined,HeartFilled } from '@ant-design/icons';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from './components/Home';
import UserT from './types/user.type';
import * as AuthService from "./services/auth.service";
import event from "./components/common/Event";
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';


const { Header, Content, Footer } = Layout;

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserT | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    event.on("logout", logOut);

    return () => {
      event.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
      <Router>
        <Layout>
        <Header>              
          <nav style={{float:'left'}}>  
            <div> <Space> 
              <Link to={"/"} >
            
              </Link>   
            <Link to="/"><HomeOutlined style={{ fontSize: '32px', }} /></Link>
              <Link to="/dashboard"><DashboardOutlined style={{ fontSize: '32px', }}/></Link>
            <Link to="/about"><InfoCircleOutlined style={{ fontSize: '32px', }}/></Link>

            </Space></div>
          </nav>

          <nav style={{float:'right'}}>
              {currentUser ? (
                <div>  <Space>   

                    <Link to={"/profile"} >
                      {currentUser.username }
                    </Link>  
                    <Link to="/favpage"><HeartFilled style={{ fontSize: '32px', }}/></Link>                           
                    <a href="/" className="nav-link" onClick={logOut}> <LogoutOutlined style={{ fontSize: '32px', }} /></a>               
                 </Space></div>
              ) : (
                <div><Space> 
                  <Login />
                  <Link to="/register">Register</Link> 
                </Space></div>
              )}              
          </nav>

        </Header>
        <Content>
          <Routes>
            <Route index element={ <Home /> } />
            <Route path="/dashboard" element={<Dashboard />}  />  
            <Route path="/about" element={<About />}  />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/register" element={<Register />} />
          
          </Routes>
        </Content>
        <Footer>
       <img
                src="/src/assets/shelter.jpeg"
                alt="profile-img"
                className="profile-img-card"
                style={{float:'right'}}
              />
        </Footer>
        <FloatButton.BackTop  />
        </Layout>
      </Router>
    )
  }