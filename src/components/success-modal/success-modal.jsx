import React from 'react';

const SuccessModal = ({ showSuccessModal,setShowSuccessModal,handleOpen}) => {
  return (
    <div className="confirmation-modal modal">
      <div className="modal-backdrop"></div>
      <div className="modal-body">
        <div className="modal-container">
          <p>Form is submitted successfully</p>
          <div className="buttons">
            <button
              onClick={()=>{
                setShowSuccessModal(!showSuccessModal);
                handleOpen(false);
              }}
              className="share-learning-button cancel-button close"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
