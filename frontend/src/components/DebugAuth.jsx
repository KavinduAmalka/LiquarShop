import React from 'react';
import { useAppContext } from '../context/AppContext';

const DebugAuth = () => {
  const { user, logoutUser, clearAllCookies } = useAppContext();

  const handleForceLogout = () => {
    console.log('Force logout clicked');
    clearAllCookies();
    logoutUser();
  };

  const showCookies = () => {
    console.log('Current cookies:', document.cookie);
    alert('Cookies: ' + document.cookie);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid #ccc',
      zIndex: 9999
    }}>
      <h4>Debug Auth</h4>
      <p>User: {user ? user.email || user.name : 'Not logged in'}</p>
      <button onClick={showCookies} style={{ margin: '5px', padding: '5px' }}>
        Show Cookies
      </button>
      <button onClick={handleForceLogout} style={{ margin: '5px', padding: '5px', background: 'red', color: 'white' }}>
        Force Logout
      </button>
      <button onClick={clearAllCookies} style={{ margin: '5px', padding: '5px', background: 'orange', color: 'white' }}>
        Clear Cookies
      </button>
    </div>
  );
};

export default DebugAuth;
