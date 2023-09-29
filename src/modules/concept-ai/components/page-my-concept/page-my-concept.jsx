import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './page-my-concept.module.scss';
import PageContainer from '../page-container/page-container.jsx';
import BorderContainer from '../border-container/border-container.jsx';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changeStepOneData, changeStepTwoData, changeStepThreeData, changeCountry, changePredictionStep, setFilterOptions } from '../../store/concept-ai.js';
import { OptionsCountry, OptionsCVM, OptionsIncCheckList, resultFormat } from '../../constant/constant.jsx';
import { getFilterOptions, getConceptList, favConcept, deleteConcept, getNewConceptResult } from '../../api/request.js';
import { Space, Table, Tag, Select, Input, Popconfirm, ConfigProvider } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { debounce } from '../../utils/utils.js';
import { message } from '../../pages/main.jsx';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 50,
      color: '#00FF00'
    }}
    spin
  />
);

const { Search } = Input;

function PageMyConcept({ scaleStyle, scaleRate }) {
  const dispatch = useDispatch();
  const filterOptions = useSelector(state => state.conceptAi.filterOptions);
  useEffect(() => {
    setCategoryOptions(filterOptions.categoryOptions);
    setBrandOptions(filterOptions.brandOptions);
  }, [filterOptions]);

  // 重新计算缩放后的页面高度
  const pageRef = useRef(null);
  const [pageHeight, setPageHeight] = useState('auto');
  useEffect(() => {
    setTimeout(() => {
      const height = pageRef.current.offsetHeight * scaleRate;
      setPageHeight(height + 'px');
    });
  }, [scaleRate]);

  // Start Predict 按钮
  const toStart = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    dispatch(changePage({pageType: 'ConceptPrediction'}));
  };

  // 获取options
  const getFilterOptionsApi = () => {
    getFilterOptions().then(res => {
      const categoryOptions = res.data.category.map(item => {
        return {
          value: item,
          label: item
        };
      });
      const brandOptions = res.data.brand.map(item => {
        return {
          value: item,
          label: item
        };
      });
      const formatOptions = res.data.format.map(item => {
        return {
          value: item,
          label: item
        };
      });
      dispatch(setFilterOptions({filterOptions: {
        categoryOptions,
        brandOptions,
        formatOptions
      }}));
    }).catch(err => console.log(err));
  };

  let firstFilterOptions = false;
  useEffect(() => {
    if (firstFilterOptions) return;
    firstFilterOptions = true;
    getFilterOptionsApi();
  }, []);

  // table数据
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // country
  const [countryValue, setCountryValue] = useState([]);

  // category
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  
  // brand
  const [brandOptions, setBrandOptions] = useState([]);
  const [brandValue, setBrandValue] = useState([]);

  // CVM
  const [CVMValue, setCVMValue] = useState([]);

  // Favourity
  const favoriteOptions = [
    {
      value: 0,
      label: 'ALL'
    },
    {
      value: 1,
      label: 'My Favorite'
    },
  ];
  const [favoriteValue, setFavoriteValue] = useState([]);

  // Incrementality
  const [IncValue, setIncValue] = useState([]);

  // search
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (val) => {
    setSearchValue(val);
    const params = {
      country: countryValue,
      category: categoryValue,
      brand: brandValue,
      cvm: CVMValue,
      is_favorited: favoriteValue,
      incrementally: IncValue,
      search: searchValue,
      page: 1,
      page_size: 10
    };
    sortDelayAPi(params);
  };

  const maxTagPlaceholder = (val) => {
    return `+${val.length}`;
  };

  let requestIndex = 0;
  const [tableLoading, setTableLoading] = useState(false);

  const fetchData = (params) => {
    requestIndex++;
    setTableLoading(true);
    return getConceptList(params, requestIndex)
      .then(res => {
        if (requestIndex !== res.config.uuid) return;
        setTableData(res.data.data?.map(item => {
          return {
            ...item,
            key: item.id
          };
        }));
        setCurrent(res.data.current);
        setPageSize(res.data.size);
        setTotal(res.data.total);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTableLoading(false);
      });
  };
  
  const delayTokenSize = useCallback(debounce(function(val) { return fetchData(val);}, 500), []);

  const [sort, setSort] = useState(null);

  const sortDelayAPi = (val) => {
    const params = {
      ...val,
      sort
    };
    delayTokenSize(params);
  };

  useEffect(() => {
    const params = {
      country: countryValue,
      category: categoryValue,
      brand: brandValue,
      cvm: CVMValue,
      is_favorited: favoriteValue,
      incrementally: IncValue,
      search: searchValue,
      page: 1,
      page_size: 10
    };
    sortDelayAPi(params);
  }, [countryValue, categoryValue, brandValue, CVMValue, favoriteValue, IncValue, searchValue]);

  const toolCom = (
    <div className={style.toolGroupBox}>
      <div className={style.inputBorder}>
        <Select
          mode="multiple"
          placeholder='Country'
          allowClear
          maxTagCount={1}
          maxTagTextLength={countryValue.length > 1 ? 2 : 8}
          maxTagPlaceholder={maxTagPlaceholder}
          value={countryValue}
          onChange={(newValue) => {
            setCountryValue(newValue);
          }}
          options={OptionsCountry}
          showSearch
          popupMatchSelectWidth={false}
        />
      </div>
      <div className={style.inputBorder}>
        <Select
          mode="multiple"
          placeholder='Category'
          allowClear
          maxTagCount={1}
          maxTagTextLength={categoryValue.length > 1 ? 2 : 8}
          maxTagPlaceholder={maxTagPlaceholder}
          value={categoryValue}
          onChange={(newValue) => {
            setCategoryValue(newValue);
          }}
          options={categoryOptions}
          showSearch
          popupMatchSelectWidth={false}
        />
      </div>
      <div className={style.inputBorder}>
        <Select
          mode="multiple"
          placeholder='All Brand'
          allowClear
          maxTagCount={1}
          maxTagTextLength={brandValue.length > 1 ? 2 : 8}
          maxTagPlaceholder={maxTagPlaceholder}
          value={brandValue}
          onChange={(newValue) => {
            setBrandValue(newValue);
          }}
          options={brandOptions}
          showSearch
          popupMatchSelectWidth={false}
        />
      </div>
      <div className={style.inputBorder}>
        <Select
          mode="multiple"
          placeholder='CVM'
          allowClear
          maxTagCount={1}
          maxTagTextLength={CVMValue.length > 1 ? 2 : 8}
          maxTagPlaceholder={maxTagPlaceholder}
          value={CVMValue}
          onChange={(newValue) => {
            setCVMValue(newValue);
          }}
          options={OptionsCVM}
          showSearch
          popupMatchSelectWidth={false}
        />
      </div>
      <div className={style.inputBorder}>
        <Select
          placeholder='Favourity'
          allowClear
          value={favoriteValue}
          onChange={(newValue) => {
            setFavoriteValue(newValue);
          }}
          options={favoriteOptions}
          popupMatchSelectWidth={false}
        />
      </div>
      <div className={style.inputBorder}>
        <Select
          mode="multiple"
          placeholder='Incrementality'
          allowClear
          maxTagCount={1}
          maxTagTextLength={IncValue.length > 1 ? 2 : 8}
          maxTagPlaceholder={maxTagPlaceholder}
          value={IncValue}
          onChange={(newValue) => {
            setIncValue(newValue);
          }}
          options={OptionsIncCheckList}
          showSearch
          popupMatchSelectWidth={false}
        />
      </div>
      <Search
        className={style.mySearch}
        placeholder="Search your concept"
        onSearch={onSearch}
        style={{ width: 256 }}
      />
      <div className={style.myAddBtn} onClick={toStart}>Start Predict</div>
    </div>
  );

  const columns = [
    {
      title: 'CONCEPT NO.',
      dataIndex: 'concept_no',
      width: '170px',
      sorter: true
    },
    {
      title: 'CONCEPT  NAME',
      dataIndex: 'product',
      width: '200px',
      sorter: true,
    },
    {
      title: 'FORMAT',
      dataIndex: 'format',
      width: '134px',
      sorter: true
    },
    {
      title: 'CREATER BY',
      dataIndex: 'created_by',
      width: '154px',
      align: 'center',
      sorter: true
    },
    {
      title: 'COUNTRY',
      dataIndex: 'country',
      width: '150px',
      align: 'center',
      sorter: true,
      render: (_, { country }) => {
        return country ? country : '-';
      }
    },
    {
      title: 'CREATER AT',
      dataIndex: 'created_at',
      width: '154px',
      align: 'center',
      sorter: true
    },

    {
      title: 'CVM',
      dataIndex: 'result',
      width: '150px',
      align: 'center',
      render: (_, { status, result }) => {
        let color = '#FFFFFF';
        let text = '';
        if (status === 1) {
          // 预测中
          color = '#9A61E3';
          text = 'Calculating';
          return (
            <Tag className={style.statusTag} color={color}>{text}<LoadingOutlined
              style={{
                fontSize: 14,
                color: '#00FF00',
                marginLeft: '10px'
              }}
              spin
            />
            </Tag>
          );
        } 
        // 等待预测 预测失败
        if (status === 0 || status === 2) {
          color = '#E75E57';
          text = '!';
          return (
            <Tag className={style.statusTag} color={color}>{text}</Tag>
          );
        }
        // 预测成功
        const cvm = result?.CVM;
        if (cvm == '0') {
          color = '#FFC000';
          text = 'RISKY';
        } else if (cvm == '1') {
          color = '#92D050';
          text = 'READY';
        } else if (cvm == '2') {
          color = '#00B0F0';
          text = 'OUTSTANDING';
        }
        return (
          <Tag className={style.statusTag} color={color}>{text}</Tag>
        );
      },
    },
    {
      title: '',
      key: 'action',
      width: '190px',
      render: (_, record) => {
        return (
          <Space size="middle">
            {/* 等待预测 预测失败 */}
            {(record.status === 0 || record.status === 2) && <div className={classNames(style.myHandleBtn, style.refresh)} onClick={() => viewResult(record)}></div>}
            {/* 预测中 预测成功 */}
            {(record.status === 1 || record.status === 3) && <div className={classNames(style.myHandleBtn, style.more)} onClick={() => viewResult(record)}></div>}
            <div className={classNames(style.myHandleBtn, record.is_favorited ? style.collected : style.collect)} onClick={() => favFetch(record)}></div>
            <ConfigProvider 
              theme={{
                token: {
                  colorPrimary: 'rgba(0, 137, 15, 1)',
                },
              }}
            >
              <Popconfirm
                title="Confirm Deletion?"
                description=""
                onConfirm={(e) => popConfirmHandle(e, record)}
                okText="Yes"
                cancelText="No"
              >
                <div className={classNames(style.myHandleBtn, style.delete)}></div>
              </Popconfirm>
            </ConfigProvider>
            <div className={classNames(style.myHandleBtn, style.edit)} onClick={() => copyConcept(record)}></div>
          </Space>
        );
      },
    },
  ];

  const paginateChange = (pagination, _, sorter) => {
    const {current, pageSize} = pagination;
    const {field, order} = sorter;
    const sort = field ? (order === 'descend' ? `-${field}` : field) : null;
    setSort(sort);
    const params = {
      country: countryValue,
      category: categoryValue,
      brand: brandValue,
      cvm: CVMValue,
      is_favorited: favoriteValue,
      incrementally: IncValue,
      search: searchValue,
      page: current,
      page_size: pageSize,
      sort
    };
    fetchData(params);
  };

  useEffect(() => {
    const params = {
      country: countryValue,
      category: categoryValue,
      brand: brandValue,
      cvm: CVMValue,
      is_favorited: favoriteValue,
      incrementally: IncValue,
      search: searchValue,
      page: current,
      page_size: pageSize,
      sort
    };
    const timer = setInterval(() => {
      if (tableLoading) return;
      // 有预测中的再去调接口
      if (tableData.filter(item => item.status === 1).length === 0) return;
      console.log('自动刷新');
      getConceptList(params, requestIndex)
        .then(res => {
          if (tableLoading) return;
          if (JSON.stringify(params) !== JSON.stringify(res.config.params)) return;
          setTableData(res.data.data?.map(item => {
            return {
              ...item,
              key: item.id
            };
          }));
          setCurrent(res.data.current);
          setPageSize(res.data.size);
          setTotal(res.data.total);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setTableLoading(false);
        });
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [tableLoading, countryValue, categoryValue, brandValue, CVMValue, favoriteValue, IncValue, searchValue, current, pageSize, sort, tableData]);

  // 查看结果
  const loadingIcon = (
    <LoadingOutlined
      style={{
        fontSize: 20,
        color: '#00FF00'
      }}
      spin
    />
  );
  async function viewResult({status, country, product, category, format, brand, apiPriceTier, image_path, image_urls, text, checklist, id, result }) {
    // 等待预测 预测失败
    if (status === 0 || status === 2) {
      message.loading({
        icon: loadingIcon,
        content: 'Action in progress..'
      });
      try {
        await getNewConceptResult({id});
      } catch (error) {
        console.log(error);
      } finally {
        const params = {
          country: countryValue,
          category: categoryValue,
          brand: brandValue,
          cvm: CVMValue,
          is_favorited: favoriteValue,
          incrementally: IncValue,
          search: searchValue,
          page: current,
          page_size: pageSize,
          sort
        };
        fetchData(params);
      }
      return;
    }
    // 预测中
    if (status === 1) {
      message.loading({
        icon: loadingIcon,
        content: 'Action in progress..'
      });
      return;
    }
    // 预测成功
    // 无结果
    if (!result) {
      message.loading({
        icon: loadingIcon,
        content: 'Action in progress..'
      });
      getNewConceptResult({id}).catch(err => console.log(err));
      return;
    }
    dispatch(changeStepOneData({stepOneData: {
      product,
      category,
      format,
      brand,
      apiPriceTier,
      image_urls: Array.isArray(image_urls) && image_urls[0] || '',
      image_key: image_path,
      text
    }}));
    const stepTwoData = checklist.filter(item => item).map((_, index) => index);
    dispatch(changeStepTwoData({stepTwoData}));
    dispatch(changeStepThreeData({stepThreeData: {
      id,
      product,
      img: Array.isArray(image_urls) && image_urls[0] || '',
      imgBase64: '',
      text,
      ...resultFormat(result)
    }}));
    dispatch(changePage({pageType: 'ConceptPrediction'}));
    dispatch(changeCountry({country}));
    dispatch(changePredictionStep({predictionStep: 3}));
  }

  // 收藏更新
  let favLoading = {};
  async function favFetch({ id, is_favorited }) {
    setTableLoading(true);
    if (favLoading[id]) return;
    const list = [...tableData];
    const index = list.findIndex(d => d.id === id);
    try {
      favLoading[id] = true;
      const res = await favConcept(id, !is_favorited);
      if (res.status === 'Success') {
        list[index].is_favorited = !is_favorited;
        setTableData(list);
      }
    } catch(error) {
      console.log(error);
    } finally {
      favLoading[id] = false;
      setTableLoading(false);
    }
  }

  // 删除
  const popConfirmHandle = (e, record) => {
    deleteFetch(record);
  };
  async function deleteFetch({id}) {
    try {
      setTableLoading(true);
      const isLastPageOnlyOne = current > 1 && total - (current - 1)*pageSize === 1;
      await deleteConcept(id);
      getFilterOptionsApi();
      const params = {
        country: countryValue,
        category: categoryValue,
        brand: brandValue,
        cvm: CVMValue,
        is_favorited: favoriteValue,
        incrementally: IncValue,
        search: searchValue,
        page: current,
        page_size: pageSize,
        sort
      };
      if (isLastPageOnlyOne) {
        params.page = params.page - 1;
      }
      await fetchData(params);
    } catch(error) {
      console.log(error);
    } finally {
      setTableLoading(false);
    }
  }

  // 复制
  function copyConcept({country, product, category, format, brand, apiPriceTier, image_path, image_urls, text, checklist }) {
    dispatch(changeCountry({country}));
    dispatch(changePredictionStep({predictionStep: 1}));
    dispatch(changeStepOneData({stepOneData: {
      product,
      category,
      format,
      brand,
      apiPriceTier,
      image_urls: Array.isArray(image_urls) && image_urls[0] || '',
      image_key: image_path,
      text
    }}));
    const stepTwoData = checklist.filter(item => item).map((_, index) => index);
    dispatch(changeStepTwoData({stepTwoData}));
    dispatch(changePage({pageType: 'ConceptPrediction'}));
  }

  return (
    <PageContainer pageTitle="My Concept" scaleStyle={scaleStyle} scaleRate={scaleRate} pageHeight={pageHeight} toolCom={toolCom}>
      <>
        <div ref={pageRef} className={style.myConceptPage} style={scaleStyle}>
          <BorderContainer>
            <div className={style.myConceptPageContainer}>
              <Table
                columns={columns}
                dataSource={tableData}
                loading={{spinning: tableLoading, indicator: antIcon}}
                onChange={paginateChange}
                pagination={{
                  position: ['bottomCenter'],
                  showQuickJumper: true,
                  current,
                  pageSize,
                  total,
                  showSizeChanger: true,
                  pageSizeOptions: [10, 20, 30, 40],
                }} />
            </div>
          </BorderContainer>
        </div>
      </>
    </PageContainer>
  );
}

PageMyConcept.propTypes = {
  scaleRate: PropTypes.number,
  scaleStyle: PropTypes.object,
};

export default PageMyConcept;