import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import style from './style.module.scss';
import PrintHoverContent from './print-hover-content.jsx';
import TableHeader from './table-header.jsx';

function ResultCom() {
  const stepThreeData = useSelector(state => state.conceptAi.stepThreeData);
  const [tableData, setTableData] = useState([]);
  const [cvmData, setCvmData] = useState({
    type: ''
  });

  useEffect(() => {
    setTableData(stepThreeData.tableData);
    setCvmData(stepThreeData.cvm);
  }, [stepThreeData]);

  return (
    <div id='print-box' className={style.resultCom}>
      <div className={style.partHeader}>
        <div className={style.imgBox}>
          {stepThreeData.imgBase64 && <img src={stepThreeData.imgBase64} />}
        </div>
        <div className={style.textBox}>
          <div className={style.title}>{stepThreeData.product}</div>
          <div className={style.textContent}>{stepThreeData.text}</div>
        </div>
      </div>
      <div className={style.partTool}>
        <div className={style.header}>Concept Prediction Result</div>
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
              tableData.map((item) => {
                return (
                  <div className={style.tableColumn} key={item.id}>
                    <div className={style.tableHeaderBox}>
                      <div className={style.headerItem}>
                        <TableHeader id={item.id} />
                      </div>
                    </div>
                    <div className={style.tableCellBox}>
                      <div className={classNames(style.tableCellItem, 'type-' + item.data.type)}></div>
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
      <div className={style.printContentAnother}>
        {tableData.map(item => (
          <div key={item.id} className={style.partItem}>
            <div className={style.partItemHeader}>
              <div className={style.partLabel}>
                <div className={classNames(style.labelBox, 'type-'+item.data.type)}></div>
              </div>
              <div className={style.partLabelName}>{item.name}</div>
            </div>
            <div className={style.partBody}>
              <PrintHoverContent>
                <>
                  <div className={style.richTextproductName}>{stepThreeData.product}</div>
                  <div className={style.richTextContainer} dangerouslySetInnerHTML={{__html: item.data.content}} ></div> 
                </>
              </PrintHoverContent>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultCom;