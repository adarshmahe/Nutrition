import React from 'react';
import PropTypes from 'prop-types';
import style from './concept-btn.module.scss';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import classNames from 'classnames';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 22,
      color: '#78F550'
    }}
    spin
  />
);

function ConceptBtn({onClick, loading, children, iconType, disabled}) {
  const clickHandle = () => {
    if (loading) return;
    onClick();
  };
  return (
    <div className={classNames(style.conceptBtn, loading && style.loading, disabled && style.disabled)} onClick={clickHandle}>
      {!loading && <div className={classNames(style.btnIcon, {
        [style.downloadData]: iconType === 'data',
        [style.downloadImg]: iconType === 'img',
        [style.extractText]: iconType === 'text',
      })}></div>}
      {loading && <Spin indicator={antIcon} style={{marginRight: '7px'}} />}
      <div className={style.btnText}>{ children }</div>
    </div>
  );
}

ConceptBtn.defaultProps = {
  loading: false,
  iconType: ''
};
ConceptBtn.propTypes = {
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  children: PropTypes.any,
  iconType: PropTypes.string
};

export default ConceptBtn;