import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Modal } from 'antd';
import BorderContainer from '../border-container/border-container.jsx';
import style from './video-player.module.scss';

let VideoPlayer = (_, ref) => {

  const [videoData, setVideoData] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    open: (videoDataItem) => {
      setVideoData(videoDataItem);
      setIsModalOpen(true);
    },
    close: () => {
      setIsModalOpen(false);
    },
  }));

  const viewRender = () => {
    if (videoData?.video_url) {
      return (
        <video controls >
          <source src={videoData?.video_url} />
          Your browser does not support the video.
        </video>
      );
    }
    if (videoData?.image_url) {
      return <img className={style.imageBox} src={videoData?.image_url} />;
    }
    return 'No Data';
  };

  return (
    <Modal
      title="" 
      wrapClassName={style.myDialog}
      width={1280} 
      centered 
      destroyOnClose
      footer={null} 
      open={isModalOpen}
      onCancel={handleCancel}
      closeIcon={(
        <div className={style.closeBtn}></div>
      )}
    >
      <div className={style.dialogBox}>
        <BorderContainer id="video">
          <div className={style.dialogMain}>
            <div className={style.videoBox}>
              {viewRender()}
            </div>
            <div className={style.textBox}>
              {videoData?.category && <div className={style.topicBox}>
                <span className={style.topicItem}>{videoData?.category}</span>
              </div>}
              {videoData?.title && <div className={style.titleBox}>{videoData?.title}</div>}
              {videoData?.topic && <div className={style.subjectBox}>{videoData?.topic}</div>}
              {videoData?.country && <div className={style.countryBox}>Country: &nbsp;{videoData?.country}</div>}
              {videoData?.age && <div className={style.countryBox}>Age: &nbsp;{videoData?.age}</div>}
              {videoData?.lifeStage && <div className={style.countryBox}>Life stage: &nbsp;{videoData?.lifeStage}</div>}
              {videoData?.socialClass && <div className={style.countryBox}>Social class: &nbsp;{videoData?.socialClass}</div>}
              {videoData?.dietary && <div className={style.countryBox}>Dietary: &nbsp;{videoData?.dietary}</div>}
              <div className={style.infoBox}>{videoData?.transcription}</div>
              <div className={style.labelBox}>
                {videoData?.tags?.map((item, index) => {
                  return <div key={index} className={style.labelItem}>{item}</div>;
                })}
              </div>
            </div>
          </div>
        </BorderContainer>
      </div>
    </Modal>
  );
};

VideoPlayer = forwardRef(VideoPlayer);

export default VideoPlayer;