import React from 'react';
import BaseLayout from './pages/Layout/index.jsx';
import HomePage from './pages/home/index.jsx';
import { BaseProvider } from './hooks/useBase.jsx';
import { ConfigProvider, theme } from 'antd';

const PlantBasedPage = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00a32e',
          colorError: '#eb0000',
          colorSuccess: '#06ca3d',
          fontFamily: 'unilever-shilling-regular'
        },
        algorithm: theme.darkAlgorithm
      }}
    >
      <BaseProvider>
        <BaseLayout>
          <HomePage></HomePage>
        </BaseLayout>
      </BaseProvider>
    </ConfigProvider>
    
  );
};

export default PlantBasedPage;