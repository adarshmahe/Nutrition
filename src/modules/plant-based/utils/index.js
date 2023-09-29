export const scrollTopAnimations = (tempIndex) => {
  if(tempIndex.includes('-')) {
    setTimeout(() => {
      const index = tempIndex.split('-')[1];
      const scrollTop = document.querySelector(`#anchor-point-${index}`).offsetTop - 100;
      document.getElementById('mainContentId').scrollTop = scrollTop;
    }, 100);
  } else {
    document.getElementById('mainContentId').scrollTop = 0;
  }
};

export const formatPercentData = (data) => {
  const keyList = Object.keys(data);
  const tempFormatData = {};
  keyList.forEach(item => {
    const subData = data[item];
    const subKeyList = Object.keys(subData);
    let total = 0;
    subKeyList.forEach(subItem => total+= subData[subItem]);
    const subTempFormatData = {};
    subKeyList.forEach(subItem => {
      subTempFormatData[subItem] = (subData[subItem] / total * 100).toFixed(0);
    });
    tempFormatData[item] = subTempFormatData;
  });
  return tempFormatData;
};

export const tooltipFormatter = (params) =>{
  const header = `${params[0].axisValue} <br/>`;
  let body = '';
  params.forEach(item => {
    body += `<div style="display: flex;justify-content: space-between;"><div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${item.color};"></span>${item.seriesName}:</div><span style="margin-left: 20px;">${item.value || 0}%</span></div>`;
  });
  return header + body;
};