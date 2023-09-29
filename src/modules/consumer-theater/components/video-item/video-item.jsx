import React from 'react';
import style from './video-item.module.scss';
import videoPosterDemo from '../../../../assets/images/consumer-theater/video-poster-demo2.png';
import videoPlayIcon from '../../../../assets/images/consumer-theater/svg/play-btn.svg';

const VideoItem = ({originData, title, info, onClick}) => {
  const { image_url, video_url } = originData;
  let poster = image_url || videoPosterDemo;
  return (
    <div className={style.videoItem}>
      <div className={style.videoBox} onClick={onClick}>
        <img className={style.videoPoster} src={poster} alt="" />
        { video_url && <img className={style.videoPlayButtonIcon} src={videoPlayIcon} alt="" />}
      </div>
      <div className={style.infoBox}>
        <div className={style.videoTitle}>{ title }</div>
        <div className={style.videoInfoBox}>
          <div className={style.videoInfo} title={info}>{ info }</div>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;