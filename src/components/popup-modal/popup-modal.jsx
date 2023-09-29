import React from 'react';
import { closeIcon } from '../icons/icons.jsx';
export const Popup = ({ text, closePopup }) => {
  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="modal-body">
        <div className="modal-container">
          <a className="close-modal" onClick={closePopup}>
            <img src={closeIcon} alt="close button" className='event-close'/>
          </a>
          {text}
        </div>
      </div>
    </div>
  );
};
