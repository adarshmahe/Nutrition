import React from 'react';
import { useEffect, useState } from 'react';
import { Modal, Popover, Space, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { changeStepThreeData } from '../../../../store/concept-ai.js';
import { getConceptResultHeatmap, getImgBase64 } from '../../../../api/request.js';
import { LoadingOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import classNames from 'classnames';
import BorderContainer from '../../../border-container/border-container.jsx';
import SelectorOptions from '../step-two/selector-options.jsx';
import WaveBtn from './wave-btn.jsx';
import HoverContent from './hover-content.jsx';
import style from './style.module.scss';
import html2canvas from 'html2canvas';
import ConceptBtn from '../../../concept-btn/concept-btn.jsx';
import TableHeader from './table-header.jsx';
import ExcelJS from 'exceljs';
import { message } from '../../../../pages/main.jsx';

const localVariable = {
  ConceptAIResultPrintId: null,
  tableDataLoading: []
};

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 30,
      color: '#00FF00'
    }}
    spin
  />
);

function ResultCom() {
  const dispatch = useDispatch();
  const stepThreeData = useSelector(state => state.conceptAi.stepThreeData);
  const [tableList, setTableList] = useState(stepThreeData.tableData);
  const [cvmData, setCvmData] = useState({
    type: ''
  });

  useEffect(() => {
    setCvmData(stepThreeData.cvm);
  }, [stepThreeData]);

  useEffect(() => {
    localVariable.tableDataLoading = [];
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const popContent = (content) => {
    return (
      <HoverContent>
        { content ? 
          <div>
            <div className={style.richTextproductName}>{stepThreeData.product}</div>
            <div className={style.richTextContainer} dangerouslySetInnerHTML={{__html: content}} ></div> 
          </div>
          : <Spin indicator={antIcon}><div style={{height: '60px'}}></div> </Spin>}
      </HoverContent>
    );
  };

  const getTableDateItemContent = (data) => {
    const req = {
      id: stepThreeData.id,
      kpi: data.name
    };
    return getConceptResultHeatmap(req).then(res => {
      
      let str = '';
      for (let i=0,len=res.data.words.length;i<len;i++) {
        str += `<span style="background-color: ${res.data.colors[i]};"> ${res.data.words[i]} </span>`;
        str += '<span>&nbsp;</span>';
      }
      return {
        id: data.id,
        name: data.name,
        str
      };
    }).catch(err => console.log(err));
  };

  const onPopoverOpen = async (e, data) => {
    const currentId = data.id;
    if (e && !data.data.content && !localVariable.tableDataLoading.includes(currentId)) {
      localVariable.tableDataLoading = [...localVariable.tableDataLoading, currentId];
      try {
        const res = await getTableDateItemContent(data);
        setTableList(currentTableList => currentTableList.map(item => {
          const resItem = {
            ...item,
            data: {
              ...item.data
            }
          };
          if (item.id === currentId) {
            resItem.data.content = res?.str;
          }
          return resItem;
        }));
      } catch (e) {
        localVariable.tableDataLoading = localVariable.tableDataLoading.filter(item => item !== currentId);
      }
    }
  };

  const [downloadDataLoading, setDownloadDataLoading] = useState(false);
  const downloadData = () => {
    setDownloadDataLoading(true);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
    const columns = tableList.map(item => {
      return {
        header: item.name,
        key: item.name,
        width: 21
      };
    });
    const rowData = tableList.map(item => {
      const cvm = item.data.type;
      let text = '';
      if (cvm == '0') {
        text = 'Risky/High Risk';
      } else if (cvm == '1') {
        text = 'Ready';
      } else if (cvm == '2') {
        text = 'Outstanding';
      }
      return text;
    });
    worksheet.columns = columns;
    worksheet.addRow(rowData);
    workbook.xlsx.writeBuffer().then((data => {
      const blob = new Blob([data], {type: ''});
      saveAs(blob, 'data.csv');
    }));
    setDownloadDataLoading(false);
  };

  const [downloadImageLoading, setDownloadImageLoading] = useState(false);
  const printImage = async () => {
    try {
      setDownloadImageLoading(true);
      const id = stepThreeData.id;
      const extName = stepThreeData.img.split('.').pop();
      let imgBase64 = stepThreeData.imgBase64;
      if (stepThreeData.img && extName && !imgBase64) {
        const imgRes = await getImgBase64({url: stepThreeData.img});
        imgBase64 = `data:image/${extName};base64,${imgRes.data}`;
      }
      const needGetData = tableList.filter(item => !item.data.content);
      localVariable.tableDataLoading = needGetData.map(item => item.id);

      const res = await Promise.all(needGetData.map(item => getTableDateItemContent(item)));
      if (id !== localVariable.ConceptAIResultPrintId || !localVariable.ConceptAIResultPrintId) {
        console.log('阻止掉无用的打印');
        return;
      }
      const resMap = {};
      res.forEach(item => {
        resMap[item.id] = item;
      });
      if (res.length) {
        const tbd = tableList.map(item => {
          const resItem = {
            ...item,
            data: {
              ...item.data
            }
          };
          if (resMap[item.id]) {
            resItem.data.content = resMap[item.id]?.str;
          }
          return resItem;
        });
        setTableList(tbd);
        dispatch(changeStepThreeData({stepThreeData: {
          ...stepThreeData,
          imgBase64,
          tableData: tbd
        }}));
      }
      setTimeout(() => {
        document.body.style.overflow = 'hidden';
        const printBox = document.querySelector('#print-box');
        printBox.style.display = 'block';
        html2canvas(printBox, {useCORS: true}).then(canvas => {
          setTimeout(() => {
            setDownloadImageLoading(false);
          }, 1000);
          let link = document.createElement('a');
          link.href = canvas.toDataURL();
          link.setAttribute('download', 'ConceptAI.png');
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
        })
          .finally(() => {
            printBox.style.display = 'none';
            document.body.style.overflow = '';
          });
      });
    } catch (error) {
      message.error({
        content: 'Download Image Failed. Please try again.'
      });
      setDownloadImageLoading(false);
    }
  };

  useEffect(() => {
    localVariable.ConceptAIResultPrintId = stepThreeData.id;
    return () => {
      localVariable.ConceptAIResultPrintId = null;
    };
  }, [stepThreeData]);

  return (
    <div className={style.resultCom}>
      <div className={style.partHeader}>
        <div className={style.imgBox}>
          <img src={stepThreeData.img} />
        </div>
        <div className={style.textBox}>
          <div className={style.title}>{stepThreeData.product}</div>
          <div className={style.textContent}>{stepThreeData.text}</div>
        </div>
      </div>
      <div className={style.partTool}>
        <div className={style.header}>Concept Prediction Result</div>
        <div className={style.tool}>
          <div className={style.btns}>
            <Space>
              <ConceptBtn iconType="data" onClick={downloadData} loading={downloadDataLoading}>Download Data</ConceptBtn>
              <ConceptBtn iconType="img" onClick={printImage} loading={downloadImageLoading}>Download Image</ConceptBtn>
            </Space>
          </div>
          <span className={style.check} onClick={showModal}>Incrementality Checklist</span>
        </div>
      </div>
      <div className={style.tableBox}>
        <div className={style.verticalLine}></div>
        <div className={classNames(style.line, style.line1)}></div>
        <div className={classNames(style.line, style.line2)}></div>
        <div className={classNames(style.line, style.line3)}></div>
        <div className={style.tableColumnContainer}>
          <div className={style.tableColumnType}>
            <div className={style.tableHeaderBox}>
              <div className={style.headerItem}>CVM</div>
            </div>
            <div className={style.tableCellBox}>
              <div className={classNames(style.tableCellItem, 'type-' + cvmData.type)}></div>
            </div>
          </div>
          <div className={style.columns}>
            {
              tableList.map((item, index) => {
                return (
                  <div className={style.tableColumn} key={item.id}>
                    <div className={style.tableHeaderBox}>
                      <div className={style.headerItem}>
                        <TableHeader id={item.id} />
                      </div>
                    </div>
                    <div className={style.tableCellBox}>
                      <Popover onOpenChange={(e) => onPopoverOpen(e, item)} trigger="hover" content={popContent(item.data.content)} destroyTooltipOnHide color="transparent" arrow={false} title="">
                        <div className={classNames(style.tableCellItem, 'type-' + item.data.type)}>
                          { index === 2 && <WaveBtn></WaveBtn>}
                        </div>
                      </Popover>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <div className={style.labelContainer}>
        <div className={classNames(style.labelItem, 'type-2')}>
          <div className={style.labelBox}></div>
          <div className={style.labelName}>Outstanding</div>
        </div>
        <div className={classNames(style.labelItem, 'type-1')}>
          <div className={style.labelBox}></div>
          <div className={style.labelName}>Ready</div>
        </div>
        <div className={classNames(style.labelItem, 'type-0')}>
          <div className={style.labelBox}></div>
          <div className={style.labelName}>Risky/High Risk</div>
        </div>
      </div>
      <Modal
        title="" 
        wrapClassName="my-center-dialog" 
        width={1200} 
        centered 
        footer={null} 
        open={isModalOpen}
        onCancel={handleCancel}
        closeIcon={(
          <div className={style.closeBtn}></div>
        )}
      >
        <div className={style.dialogBox}>
          <BorderContainer>
            <div className={style.dialogMain}>
              <div className={style.dialogTitle}>Is this new idea addressing:</div>
              <SelectorOptions overview />
            </div>
          </BorderContainer>
        </div>
      </Modal>
    </div>
  );
}

export default ResultCom;