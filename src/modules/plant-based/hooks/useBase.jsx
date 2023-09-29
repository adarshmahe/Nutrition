import React, { createContext, useContext, useState } from 'react';

const BaseContext = createContext(null);
export const BaseProvider = ({children}) => {
  const [openWin, setOpenWin] = useState(false);
  const [subUrl, setSubUrl] = useState('');

  const changeOpenWin = (flag) => {
    setOpenWin(flag);
  };
  const changeSubUrl = (url) => {
    setSubUrl(url);
  };
  
  return <BaseContext.Provider value={{
    openWin,
    subUrl,

    changeOpenWin,
    changeSubUrl
  }}>
    {children}
  </BaseContext.Provider>;
};

export const useBase = () => {
  return useContext(BaseContext) || {
    openWin: false,
    subUrl: '',

    changeOpenWin: () => {}
  };
};

