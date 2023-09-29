// ConfirmationModal.jsx
import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ show, onCancel, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="confirmation-modal modal">
      <div className="modal-backdrop"></div>
      <div className="modal-body">
        <div className="modal-container">
          <p>Are you sure you want to delete inspiration title?</p>
          <div className="buttons">
            <button
              onClick={onCancel}
              className="share-learning-button cancel-button close"
            >
              NO KEEP IT
            </button>
            <button
              onClick={onConfirm}
              className="share-learning-button delete-button confirm"
            >
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
