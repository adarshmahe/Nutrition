import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { backwardIcon, rectangle } from '../../../../components/icons/icons.jsx';

const Modal = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>
            <img src={backwardIcon} className="back-arrow-icon" />
            Back
          </span>
          <div className="rectangle-wrapper">
            <img src={rectangle} alt="rectangle" className="rectangle" />
          </div>
          <ul className="main-navigation-sub-menu">
            {props.content.map((e, i) => (
              <li key={i} onClick={() => navigate(`${e.path}`)}>
                {e.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
  content: PropTypes.array,
};

export default Modal;
