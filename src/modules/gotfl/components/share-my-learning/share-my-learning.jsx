import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../../../../util/api.jsx';
import {
  closeIcon,
  gallery,
  photoIcon,
  cancelGreenIcon,
} from '../../../../components/icons/icons.jsx';
import SuccessModal from '../../../../components/success-modal/success-modal.jsx';
import { apiURL } from '../../../../env-url.js';
import Tooltip from '../../../../components/tooltip/tooltip.jsx';

const ShareLearning = ({ handleOpen }) => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Link, setLink] = useState('');
  const [file, setFile] = useState([]);
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [activeTab, setActiveTab] = useState('tab1');
  const [data, setData] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [error, setError] = useState('');

  const validate = () => {
    let isvalid = true;
    if (!Title) {
      setError('*These fields are Required...');
      isvalid = false;
    } else {
      setError('');
    }
    if (!Description && !selectedCategories && !selectedBrands && !selectedMarket && !selectedTags) {
      setError('*These fields are Required...');
      isvalid = false;
    } else {
      setError('');
    }
    return isvalid;
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeLink = (event) => {
    setLink(event.target.value);
    setFile([
      ...file,
      {
        fileCategory: 'url',
        fileUrl: event.target.value,
      },
    ]);
  };
  const handleSelectCategories = (e) => {
    setSelectedCategories(e);
  };
  const handleSelectBrands = (e) => {
    setSelectedBrands(e);
  };
  const handleSelectMarket = (e) => {
    setSelectedMarket(e);
  };
  const handleSelectTags = (e) => {
    setSelectedTags(e);
  };
  function deleteFile(e) {
    const s = imageUrl.filter((item, index) => index !== e);
    setImageUrl(s);
    setIsDisabled(false);
  }
  const fetchData = () => {
    api
      .get(`${apiURL}/gotfl/learnings/labellings`)
      .then((response) => {
        setData((prevData) => [...prevData, ...response.data]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const Categories = data.filter((ele) => ele.classificationId === 1);
  const Brands = data.filter((ele) => ele.classificationId === 2);
  const Markets = data.filter((ele) => ele.classificationId === 3);
  const Tags = data.filter((ele) => ele.classificationId === 4);

  useEffect(() => {
    fetchData();
  }, []);

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        var str = fileReader.result.split(',')[1]; // Remove data:image/png;base64,
        resolve(str);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let posttags = [];
      selectedTags?.map((tag) => {
        posttags.push(tag.name);
      });

      let postcategories = [];
      selectedCategories?.map((categories) => {
        postcategories.push(categories);
      });

      let postbrand = [];
      selectedBrands?.map((brand) => {
        postbrand.push(brand);
      });

      let postmarket = [];
      selectedMarket?.map((market) => {
        postmarket.push(market);
      });

      try {
        const response = await api(`${apiURL}/gotfl/learnings`, {
          method: 'POST',
          body: JSON.stringify({
            title: Title,
            description: Description,
            mediaLinks: file,
            tags: posttags.join(','),
            learningLabel: [...postcategories, ...postbrand, ...postmarket],
            keywords: '',
          }),
        });
        if (!response) {
          throw new Error(`Error! status: ${response.statusCode}`);
        }
        const result = await response.json();
        setShowSuccessModal(!showSuccessModal);
        window.location.reload();
        return result;
      } catch (error) {
        console.error('API Error:', error.message);
      }
    }
  };

  const customStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      color: state.isSelected ? '#3F3F46' : '#fff',
      backgroundColor: state.isSelected ? '#18181b' : '#18181b',
    }),
  
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: '#18181b',
      color: '#18181b',
      borderRadius: 'none',
      border: '1px solid #71717a',
      position: 'relative',
      zIndex: 1,
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: '#18181b' }),
  };

  return (
    <>
      <div className="modal">
        <div className="modal-backdrop"></div>
        <div className="modal-body share-learning-container">
          <div className="modal-container">
            <div>
              <form className="main-form" onSubmit={onSubmit}>
                <div className="share-learning-main ">
                  <span>Share my Learnings</span>
                  <img src={closeIcon} alt="" onClick={handleOpen} />
                </div>

                <div className="share-learning-scroll">
                  <div className="share-learning-title">
                    <input
                      type="text"
                      name="title"
                      value={Title}
                      onChange={handleChange}
                      placeholder="Post Title"
                      className={error ? 'error' : ''}
                    />
                  </div>
                  {error && <div className="error-text">{error}</div>}
                  <div>
                    <div>
                      <ul className="share-learning-img active">
                        <li
                          className={
                            activeTab === 'tab1' ? 'share-learning-device ' : ''
                          }
                          onClick={() => setActiveTab('tab1')}
                        >
                          Upload from device
                        </li>
                        <li
                          className={
                            activeTab === 'tab2' ? 'share-learning-device ' : ''
                          }
                          onClick={() => setActiveTab('tab2')}
                        >
                          Upload video URL
                          <Tooltip text="only TikTok and YouTube URL allowed">
                            <button>i</button>
                          </Tooltip>
                        </li>
                      </ul>
                    </div>
                    {activeTab === 'tab1' && (
                      <div className="share-img-container">
                        <div className="uploaded-files-list">
                          {imageUrl.length > 0 &&
                            imageUrl.map((item, index) => {
                              return (
                                <div className="image-list" key={index}>
                                  {item.type == 'video/mp4' ? (
                                    <video
                                      autoPlay
                                      muted
                                      loop
                                      width="200px"
                                      height="200px"
                                    >
                                      <source src={item} type="video/mp4" />
                                    </video>
                                  ) : (
                                    <img
                                      src={item}
                                      width="50"
                                      height="50"
                                      alt=""
                                    />
                                  )}
                                  <button
                                    className="remove-btn"
                                    type="button"
                                    onClick={() => deleteFile(index)}
                                  >
                                    <img src={cancelGreenIcon} alt="cancel" />
                                  </button>
                                </div>
                              );
                            })}
                        </div>
                        <input
                          id="fileUpload"
                          type="file"
                          multiple
                          disabled={isDisabled}
                          accept="image/*,video/mp4"
                          onChange={async (event) => {
                            if (event.target.files.length) {
                              if (event.target.files[0]?.type == 'video/mp4') {
                                if (event.target.files[0].size <= 20e6) {
                                  if (file.length == 0) {
                                    setIsDisabled(true);
                                    setImageUrl((prevUrls) => [
                                      ...prevUrls,
                                      URL.createObjectURL(
                                        event.target.files[0]
                                      ),
                                    ]);
                                    setFile([
                                      {
                                        ...event.target.files[0],
                                        filestream: await convertToBase64(
                                          event.target.files[0]
                                        ),
                                        fileCategory: 'video',
                                        fileURL: '',
                                        contentType: event.target.files[0].type,
                                        fileName: JSON.stringify(
                                          event.target.files[0]
                                        ),
                                      },
                                    ]);
                                  } else {
                                    alert('only image is allowed ');
                                  }
                                } else {
                                  alert('file size should be less then 5mb');
                                }
                              } else if (
                                allowedTypes.includes(
                                  event.target.files[0].type
                                )
                              ) {
                                if (event.target.files[0].size <= 2e6) {
                                  if (file.length == 0) {
                                    setImageUrl((prevUrls) => [
                                      ...prevUrls,
                                      URL.createObjectURL(
                                        event.target.files[0]
                                      ),
                                    ]);
                                    setFile([
                                      {
                                        ...event.target.files[0],
                                        filestream: await convertToBase64(
                                          event.target.files[0]
                                        ),
                                        fileCategory: 'img',
                                        fileURL: '',
                                        contentType: event.target.files[0].type,
                                        fileName: event.target.files[0].name,
                                      },
                                    ]);
                                  } else if (
                                    file.length > 0 ||
                                    file.length < 5
                                  ) {
                                    if (file.length == 4) {
                                      setIsDisabled(true);
                                    }
                                    setImageUrl((prevUrls) => [
                                      ...prevUrls,
                                      URL.createObjectURL(
                                        event.target.files[0]
                                      ),
                                    ]);
                                    setFile([
                                      ...file,
                                      {
                                        ...event.target.files[0],

                                        filestream: await convertToBase64(
                                          event.target.files[0]
                                        ),
                                        fileCategory: 'img',
                                        fileURL: '',
                                        contentType: event.target.files[0].type,
                                        fileName: event.target.files[0].name,
                                      },
                                    ]);
                                  }
                                } else {
                                  alert('file size should be less then 2mb');
                                }
                              }
                            }
                          }}
                        />
                        <label htmlFor="fileUpload">
                          {!isDisabled && (
                            <img src={photoIcon} alt="imageIcon" />
                          )}
                          <input placeholder="You can add up to 5 images or 1 videos" />
                        </label>
                      </div>
                    )}
                    {activeTab === 'tab2' && (
                      <div className="share-learning-title">
                        <input
                          type="text"
                          name="Link"
                          value={Link}
                          onChange={handleChangeLink}
                          placeholder="Add video Link"
                        />
                      </div>
                    )}
                  </div>
                  <div className="share-learning-desn">
                    <input
                      type="text"
                      name="description"
                      value={Description}
                      onChange={handleChangeDescription}
                      placeholder="Type or click a picture of your learning description"
                    />
                    <div className="line-camera-container">
                      <div className="camera">
                        <img src={gallery} alt="" />
                      </div>
                    </div>
                  </div>
                  {error && <div className="error-text">{error}</div>}
                  <div className="share-learning-option">
                    <div className="share-learning">
                      <Select
                        isMulti
                        maxMenuHeight={200}
                        options={Categories}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        loadOptions={fetchData}
                        onChange={handleSelectCategories}
                        value={selectedCategories}
                        placeholder="Categories"
                        styles={customStyles}
                      />
                      {error && <div className="error-text">{error}</div>}
                    </div>
                    
                    <div className="share-learning">
                      <Select
                        isMulti
                        maxMenuHeight={200}
                        options={Brands}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        loadOptions={fetchData}
                        onChange={handleSelectBrands}
                        value={selectedBrands}
                        placeholder="Brands"
                        styles={customStyles}
                      />
                      {error && <div className="error-text">{error}</div>}
                    </div>
                  </div>

                  <div className="share-learning-option">
                    <div className="share-learning-market">
                      <Select
                        isMulti
                        maxMenuHeight={200}
                        options={Markets}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        loadOptions={fetchData}
                        onChange={handleSelectMarket}
                        value={selectedMarket}
                        placeholder="Market"
                        styles={customStyles}
                      />
                      {error && <div className="error-text">{error}</div>}
                    </div>

                    <div className="share-learning-tags">
                      <Select
                        isMulti
                        maxMenuHeight={200}
                        options={Tags}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        loadOptions={fetchData}
                        onChange={handleSelectTags}
                        value={selectedTags}
                        placeholder="Tags"
                        styles={customStyles}
                      />
                      {error && <div className="error-text">{error}</div>}
                    </div>
                  </div>
                </div>
                <div className="share-learning-btn mt-10">
                  <button
                    type="submit"
                  >
                    Share Learning
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <SuccessModal
          handleOpen={handleOpen}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      )}
    </>
  );
};
export default ShareLearning;
