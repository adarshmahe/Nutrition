import React from 'react';

export const Messagepopup = ({ text }) => {

  return (
    <div className="modal">
      <div className="modal-backdrop"></div>
      <div className="modal-body-message ">
        <div className="modal-container">
          {}
          {text}
        </div>
      </div>
    </div>
  );
};
