import React, { useState, useRef, useEffect } from 'react';
import { useProfileWhiteIcon } from '../icons/icons.jsx';
import ProfileDropdown from './profile-dropdown/profile-dropdown.jsx';

const Profile = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const modalRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    if (dropdownVisible) {
      document.addEventListener('click', handleDocumentClick);
    }
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dropdownVisible]);

  return (
    <div ref={modalRef}>
      <div className="profile" onClick={toggleDropdown}>
        <img src={useProfileWhiteIcon} alt="profile" />
      </div>
      {dropdownVisible && (
        <div className="modal" >
          <ProfileDropdown />
        </div>
      )}
    </div>
  );
};

export default Profile;
