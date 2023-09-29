import React from 'react';
import addIcon from '../../../../assets/images/consumer-theater/svg/add.svg';
import style from './header-nav.module.scss';

function HeaderNav({openNewTopic}) {

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  return (
    <div className={style.headerNav}>
      <div className={style.headerTitle} onClick={scrollToTop}></div>
      <div className={style.newTopicBtn} onClick={openNewTopic}>
        <img className={style.newTopicBtnIcon} src={addIcon} alt="" />
        Suggest New Topic
      </div>
    </div>
  );
}

export default HeaderNav;