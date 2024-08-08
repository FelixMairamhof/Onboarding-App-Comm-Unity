// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BackgroundLogo from './components/BackgroundLogo.jsx';
import RoleSwitch from './components/RoleSwitch.jsx'; 
import LoginUser from './components/LoginUser.jsx';
import CerpStackPage from './components/CerpStackPage.jsx';
import useToken from './hooks/useToken.js';  
import FileUpload from './components/FileUpload.jsx';
import LogOut from './components/LogOut.jsx';
import ThingBoardPage from './components/ThingBoardPage.jsx';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import AddAdmin from './components/AddAdmin.jsx';
import JsonUpload from './components/JsonUpload.jsx';
import SensorProfile from './components/SensorProfile.jsx';
import InstructionPage from './components/InstructionPage.jsx';

function App() {
  const [isUser, setIsUser] = useState(true); 
  const [token, updateToken] = useToken("");
  const [isAdmin, setIsAdmin] = useState(false); 
  const [isOnCerpStackPage, setIsOnCerpStackPage] = useState(true);
  const [isOnInstructionPage, setIsOnInstructionPage] = useState(false);
  const [isOnThingBoardPage, setIsOnThingBoardPage] = useState(false); // State for ThingBoardPage
  const [activeSensorProfile, setActiveSensorProfile] = useState(null); 

  useEffect(() => {
    if (token) {
      const checkAdminStatus = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/admins', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const admins = response.data;
          const decodedToken = jwtDecode(token);
          const userEmail = decodedToken.sub;
          const isAdminUser = admins.some(admin => admin.email === userEmail);
          setIsAdmin(isAdminUser);
        } catch (error) {
          console.error('Error fetching admin status:', error);
        }
      };

      checkAdminStatus();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {token ? (
          <>
            {isUser ? (
              isOnInstructionPage ? (
                <InstructionPage 
                  activeSensorProfile={activeSensorProfile} 
                  setIsOnInstructionPage={setIsOnInstructionPage} 
                  setIsOnThingBoardPage={setIsOnThingBoardPage} // Pass the function here
                />
              ) : isOnThingBoardPage ? (
                <ThingBoardPage 
                  setIsOnCerpStackPage={setIsOnCerpStackPage} 
                  setIsOnInstructionPage={setIsOnInstructionPage}
                  setIsOnThingBoardPage={setIsOnThingBoardPage}
                   
                />
              ) : isOnCerpStackPage ? (
                <CerpStackPage 
                  setIsOnInstructionPage={setIsOnInstructionPage} 
                  setActiveSensorProfile={setActiveSensorProfile} 
                />
              ) : (
                <div className='grid grid-cols-4 gap-10 max-sm:block'>
                  <FileUpload />
                  <AddAdmin />
                  <JsonUpload />
                  <SensorProfile />
                </div>
              )
            ) : (
              <div className='grid grid-cols-4 gap-10 max-sm:block'>
                <FileUpload />
                <AddAdmin />
                <JsonUpload />
                <SensorProfile />
              </div>
            )}
            <LogOut updateToken={updateToken} />
            {isAdmin && <RoleSwitch isUser={isUser} onToggle={() => setIsUser(!isUser)} />}
          </>
        ) : (
          <LoginUser updateToken={updateToken} />
        )}
      </div>
      <BackgroundLogo />
      <Footer />
    </div>
  );
}

export default App;
