import React, { useCallback, useEffect, useState } from 'react';
import Menu from '../../components/menu/menu.jsx';
import style from './index.module.scss';
import classNames from 'classnames';
import EatingHabitsPage from '../../components/eating-habits/eating-habits.jsx';
import CategoryDriversPage from '../../components/category-drivers/category-drivers.jsx';
import TriggersBarriesPage from '../../components/triggers-barries/triggers-barries.jsx';
import { useBase } from '../../hooks/useBase.jsx';

const HomePage = () => {
  const { openWin, subUrl, changeOpenWin, changeSubUrl } = useBase();
  const [animationFlag, setAnimationFlag] = useState(false);

  const fnMenuUrlChange = useCallback((curUrl) => {
    if(curUrl) {
      changeOpenWin(true);
    }
    changeSubUrl(curUrl);
    console.log(curUrl);
  }, []);

  const fnClose = () => {
    changeOpenWin(false);
  };

  useEffect(() => {
    if(openWin) {
      setTimeout(() => {
        setAnimationFlag(true);
      }, 100);
    } else {
      setAnimationFlag(false);
    }
  }, [openWin]);

  return <>
    <Menu onUrlChange={fnMenuUrlChange}></Menu>
    {
      openWin && <div className={classNames(style.boxWrap)}>
        <div className={classNames(style.mainContent)} style={{top: animationFlag ? '80px': '100vh'}}>
          {
            ['0-0', '0-1', '0-2'].includes(subUrl) && <EatingHabitsPage onClose={fnClose}></EatingHabitsPage>
          }
          {
            ['1-0', '1-1'].includes(subUrl) && <CategoryDriversPage onClose={fnClose}></CategoryDriversPage> 
          }
          {
            ['2-0', '2-1'].includes(subUrl) && <TriggersBarriesPage onClose={fnClose}></TriggersBarriesPage>
          }
        </div>
      </div>
    }
  </>;
};

export default HomePage;