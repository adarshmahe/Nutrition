import React from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Affix } from 'antd';
import style from './page-container.module.scss';

function PageContainer({ scaleStyle, scaleRate, pageHeight, pageTitle, toolCom, children }) {
  const affixRef = useRef(null);
  function onChange(val) {
    setTimeout(() => {
      if (val) {
        const height = affixRef.current.fixedNodeRef.current.offsetHeight * scaleRate;
        affixRef.current.fixedNodeRef.current.style.height = height + 'px';
      }
    });
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <div className={style.pageContainer}>
      <Affix onChange={onChange} ref={affixRef}>
        <div className={style.headerBox} style={scaleStyle}>
          <div className={style.homeBtn} onClick={scrollToTop}></div>
          <div className={style.headerTitle}>{pageTitle}</div>
          <div className={style.headerToolBox}>{toolCom}</div>
        </div>
      </Affix>
      <div className={style.pageMainContent} style={{height: pageHeight}}>
        {children}
      </div>
    </div>
  );
}
PageContainer.defaultProps = {
  pageTitle: ''
};
PageContainer.propTypes = {
  scaleRate: PropTypes.number,
  scaleStyle: PropTypes.object,
  pageHeight: PropTypes.string,
  pageTitle: PropTypes.string,
  toolCom: PropTypes.element,
  children: PropTypes.element
};

export default PageContainer;