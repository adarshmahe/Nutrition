import React from 'react';
import style from './header-nav.module.scss';
import classNames from 'classnames';

function HeaderNav() {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  const openUserManual = ()  => {
    window.open('/User_Manual_Concept_AI.pdf', '_blank');
  };
  
  return (
    <div className={style.headerNav}>
      <div className={style.logoBox}></div>
      <div className={style.headerTitle} onClick={scrollToTop}></div>
      <div className={style.userBox}>
        <div className={classNames(style.userItem, style.tool)} onClick={openUserManual}></div>
        <div className={classNames(style.userItem, style.user)}></div>
      </div>
    </div>
  );
}

export default HeaderNav;