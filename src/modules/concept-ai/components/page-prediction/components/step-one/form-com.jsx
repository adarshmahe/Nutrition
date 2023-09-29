import React from 'react';
import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeStepOneData } from '../../../../store/concept-ai.js';
import { Input, Select, Upload, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fileUpload } from '../../../../api/request.js';
import { OptionsCategory, OptionsApiPriceTier, OptionsFormat, OptionsBrand } from '../../../../constant/constant.jsx';
import style from './step-one.module.scss';
import { message } from '../../../../pages/main.jsx';

const { Dragger } = Upload;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 22,
      color: '#78F550'
    }}
    spin
  />
);

let FormCom = (_, ref) => {
  const dispatch = useDispatch();
  const country = useSelector(state => state.conceptAi.country);
  const stepOneData = useSelector(state => state.conceptAi.stepOneData);

  // Concept Name
  const [conceptName, setConceptName] = useState(stepOneData.product);
  const setConcept = (val) => {
    setConceptName(val);
    dispatch(changeStepOneData({stepOneData: {product: val}}));
  };

  // Category
  const [categoryValue, setCategoryValue] = useState(stepOneData.category);
  const setCategory = (val) => {
    setCategoryValue(val);
    dispatch(changeStepOneData({stepOneData: {category: val}}));

  };

  // format
  const [formatOptions, setFormatOptions] = useState([]);
  const [formatValue, setFormatValue] = useState(stepOneData.format);
  const setFormat = (val) => {
    setFormatValue(val);
    dispatch(changeStepOneData({stepOneData: {format: val}}));
  };
  useEffect(() => {
    let res = [];
    const item = OptionsFormat.find(item => item.value === categoryValue);
    if (item) {
      res = item.children;
    }
    setFormatOptions(res);
    if (!res.find(item => item.value === formatValue)) {
      setFormat('');
    }
  }, [categoryValue]);

  // brand
  const [brandOptions, setBrandOptions] = useState([]);
  const [brandValue, setBrandValue] = useState(stepOneData.brand);
  const setBrand = (val) => {
    setBrandValue(val);
    dispatch(changeStepOneData({stepOneData: {brand: val}}));
  };
  useEffect(() => {
    let res = [];
    const item = OptionsBrand.find(item => item.value === country)?.children?.find(item => item.value === categoryValue);
    if (item) {
      res = item.children;
    }
    setBrandOptions(res);
    if (!res.find(item => item.value === brandValue)) {
      setBrand('');
    }
  }, [country, categoryValue]);

  // ApiPriceTier
  const [apiValue, setApiValue] = useState(stepOneData.apiPriceTier);
  const setApi = (val) => {
    setApiValue(val);
    dispatch(changeStepOneData({stepOneData: {apiPriceTier: val}}));
  };

  // img
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    setImageUrl(stepOneData.image_urls);
  }, [stepOneData.image_urls]);
  const setImage = (val, key) => {
    setImageUrl(val);
    dispatch(changeStepOneData({stepOneData: {
      image_urls: val,
      image_key: key
    }}));
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : 
        <div className={style.uploadIcon}></div>
      }
      <div className={style.uploadText}>
        Click and select image
      </div>
    </div>
  );

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      message.error('Image must smaller than 10MB!');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('prefix', 'conceptai');
    formData.append('form', 'form');
    formData.append('file', file);
    fileUpload(formData)
      .then(res => {
        setImage(res.data.url, res.data.key);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
    return false;
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      setConcept('');
      setCategory('');
      setFormat('');
      setBrand('');
      setApi('');
      setImage('');
    }
  }));

  return (
    <div className={style.formContainer}>
      <div className={style.formItem}>
        <div className={style.itemName}>Concept Name</div>
        <div className={style.itemInput}>
          <Input 
            placeholder=""
            value={conceptName}
            onChange={(e) => setConcept(e.target.value)}
          />
        </div>
        <div className={style.itemInfo}>Enter concept name for identification</div>
      </div>
      <div className={style.formItem}>
        <div className={style.itemName}>Category</div>
        <div className={style.itemInput}>
          <Select
            placeholder=""
            value={categoryValue}
            onChange={setCategory}
            options={OptionsCategory}
          />
        </div>
      </div>
      <div className={style.formItem}>
        <div className={style.itemName}>Format</div>
        <div className={style.itemInput}>
          <Select
            placeholder=""
            value={formatValue}
            onChange={setFormat}
            options={formatOptions}
          />
        </div>
      </div>
      <div className={style.formItem}>
        <div className={style.itemName}>Brand</div>
        <div className={style.itemInput}>
          <Select
            placeholder=""
            value={brandValue}
            onChange={setBrand}
            options={brandOptions}
          />
        </div>
      </div>
      <div className={style.formItem}>
        <div className={style.itemName}>ApiPriceTier</div>
        <div className={style.itemInput}>
          <Select
            placeholder=""
            value={apiValue}
            onChange={setApi}
            options={OptionsApiPriceTier}
          />
        </div>
      </div>
      <div className={style.formItem}>
        <div className={style.itemName}>Image upload</div>
        <div className={style.itemImage}>
          <Dragger
            name="avatar"
            className="avatar-uploader"
            showUploadList={false}
            action=""
            beforeUpload={beforeUpload}
            disabled={loading}
          >
            {imageUrl ? (
              <Spin wrapperClassName={style.updateImageLoading} indicator={antIcon} spinning={loading}>
                <img
                  key={imageUrl}
                  className={style.imgItem}
                  src={imageUrl}
                  alt=""
                  style={{
                    width: '100%',
                  }}
                />
              </Spin>
            ) : (
              uploadButton
            )}
          </Dragger>
        </div>
      </div>
    </div>
  );
};

FormCom = forwardRef(FormCom);

export default FormCom;