import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { userProfile } from '../../icons/icons.jsx';

function ProfileDropdown() {
  const { accounts, instance } = useMsal();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(()=> {
    if (accounts.length > 0) {
      const account = accounts[0];
      setUserName(account.name);
      setEmail(account.username);
    }
  },[]);

  const handleLogout = () => {
    instance.logout();
  };

  return (
    <div className="profile-dropdown-container">
      <div className="dropdown-contents">
        <div><img src={userProfile} alt='profile Icon'/></div>
        <div className='username'>{userName}</div>
        <div className='user-email'>{email}</div>
        <button onClick={handleLogout} className='share-learning-button btn px-16'>Sign Out</button>
      </div>
    </div>
  );
}

export default ProfileDropdown;
