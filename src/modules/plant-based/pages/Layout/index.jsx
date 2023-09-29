import React from 'react';
import learningBgVideo from '../../../../assets/videos/plant-based-bg.mp4';
import LeftSidebarCollapsible from '../../../../components/left-navigation/left-navigation.jsx';
import PlantHeader from './components/header.jsx';
import { useBase } from '../../hooks/useBase.jsx';

const BaseLayout = ({children}) => {
  const { openWin } = useBase();
  return <>
    <LeftSidebarCollapsible />
    <div className="sidebar-right-layout" style={{overflow: openWin ? 'hidden': 'auto'}}>
      <video autoPlay muted className="learning-bg-video" loop>
        <source src={learningBgVideo} type="video/mp4" />
      </video>
      <PlantHeader></PlantHeader>
      <div className="my-learning-container">
        {children}
      </div>
    </div>
  </>;
};

export default BaseLayout;