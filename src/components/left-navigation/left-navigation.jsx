import React, { useState, useEffect } from 'react';
import { collapsibleArrow, collapsibleArrowGreen } from '../icons/icons.jsx';
import Logo from '../../components/logo/logo.jsx';
import { menuItems } from './menu-items.jsx';
import { Link, useLocation } from 'react-router-dom';
import menuSound from '../../assets/sound/woosh-2-6471.mp3';
import closeSound from '../../assets/sound/mouse-click-2-89867.mp3';

const LeftSidebarCollapsible = ({ toggleCallback }) => {
  const [isClose, setIsClose] = useState(true);
  const [navItem, setNavItem] = useState(menuItems);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [audio /* setAudio */] = useState(new Audio(menuSound));
  const [collapseSound /* setcollapseSound */] = useState(
    new Audio(closeSound)
  );
  const location = useLocation();

  const toggleClass = () => {
    setIsClose(!isClose);
    collapseSound.play();
  };

  useEffect(() => {
    typeof toggleCallback === 'function' && toggleCallback(isClose);
  }, [isClose]);

  const toggleDropdown = (itemId) => {
    setIsDropdownOpen((prevState) => (prevState === itemId ? null : itemId));
  };

  const handleMouseEnter = (itemId) => {
    setIsHovered(true);

    if (isClose) {
      setIsDropdownOpen(itemId);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = () => {
    audio.play();
  };

  useEffect(() => {
    setIsDropdownOpen(null);
    setNavItem(navItem);
  }, [location]);

  return (
    <nav className={'sidebar ' + (isClose ? 'close' : '')}>
      <div className="sidebar-logo">
        <Logo />
      </div>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            {navItem.map((menu) => {
              return (
                <li
                  key={menu.id}
                  onClick={() => {
                    toggleDropdown(menu.id);
                    handleButtonClick();
                  }}
                  className={`navigation-bar ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={() => handleMouseEnter(menu.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* <a
                    className={location.pathname === menu.url ? 'active' : ''}
                    href={menu.url}
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  > */}
                  <Link
                    to={menu.url}
                    className={location.pathname === menu.url ? 'active' : ''}
                  >
                    <img
                      className="sidebar-icon"
                      src={menu.iconWhite}
                      alt={menu.title}
                    />
                    <img
                      className="sidebar-icon hover-icon"
                      src={menu.iconGreen}
                      alt={menu.title}
                    />
                    <span className="nav-text">{menu.title}</span>
                    <div
                      className={`left-nav-dropdown ${
                        isDropdownOpen === menu.id ? 'opened' : ''
                      }`}
                    >
                      <img
                        src={collapsibleArrow}
                        className="left-nav-sub-menu-icon"
                        alt="collapsible arrow"
                      />
                      <img
                        src={collapsibleArrowGreen}
                        className="left-nav-sub-menu-icon hover-icon"
                        alt="collapsible arrow"
                      />
                    </div>
                  </Link>
                  {/* </a> */}

                  {isDropdownOpen === menu.id && menu.submenus.length > 0 && (
                    <div className="sub-menu">
                      <ul>
                        {menu.submenus?.map((submenu, index) => (
                          <li key={index}>
                            {/* <a className="link_name" href={submenu.url}> */}
                            <Link to={submenu.url} className="link_name">
                              <img
                                className="sidebar-icon"
                                src={submenu.iconwhite}
                                alt={submenu.title}
                              />
                              <img
                                className="sidebar-icon hover-icon"
                                src={submenu.iconGreen}
                                alt={submenu.title}
                              />
                              {submenu.title}
                            </Link>
                            {/* </a> */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <button onClick={toggleClass} className="toggle">
        <span className="toggle-icon">
          <img src={collapsibleArrow} alt="collapsible arrow" />
        </span>
      </button>
    </nav>
  );
};

export default LeftSidebarCollapsible;
