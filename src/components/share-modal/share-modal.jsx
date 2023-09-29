import React, { useState, useEffect } from 'react';
import { Popup } from '../popup-modal/popup-modal.jsx';
import { fileCopyIcon, outLookIcon } from '../icons/icons.jsx';
import { Messagepopup } from '../message-modal/message-modal.jsx';

const ShareModal = ({ cardURL }) => {
  const [open, setOpen] = useState(true);
  const [copySuccess, setCopySuccess] = useState('');

  const body = `Take a look at this inspirational post I found on our Unilever Nutrition Platform: ${cardURL} What do you think?`;

  const copyToClipboard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('LINK COPIED');
      setTimeout(() => {
        setCopySuccess('');
      }, 5000);
    } catch (error) {
      setCopySuccess('Failed to LINK COPIED');
    }
  };

  const sendEmail = () => {
    const link = `mailto:support@unilever.com?subject=SendMail&body=${encodeURIComponent(
      body
    )}`;
    window.location.href = link;
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://teams.microsoft.com/share/launcher.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {open ? (
        <Popup
          text={
            <>
              <div className="share-modal-container">
                <h4>Share learning with your team</h4>
                <div className="icons">
                  <div
                    className="teams-share-button"
                    data-href={cardURL}
                    data-msg-text={body}
                  ></div>
                  <img
                    src={outLookIcon}
                    alt="outLookIcon"
                    className="outLookIcon"
                    onClick={sendEmail}
                  />
                </div>
              </div>
              <div className="file-copy-input">
                <label className="file-copy-label">OR copy link</label>
                <input
                  type="text"
                  placeholder={cardURL}
                  className="file-copy-inputfield"
                />
                <div className="fileIcon">
                  <img
                    src={fileCopyIcon}
                    alt="fileCopyIcon"
                    className="fileCopyIcon"
                    onClick={() => copyToClipboard(cardURL)}
                  />
                </div>
              </div>
              {copySuccess && (
                <p>
                  {<Messagepopup text={copySuccess} className="success-msg" />}
                </p>
              )}
            </>
          }
          closePopup={() => setOpen(false)}
        />
      ) : null}
    </>
  );
};

export default ShareModal;
