import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import api from '../../../../util/api.jsx';
import PropTypes from 'prop-types';
import {
  closeIcon,
  gallery,
  photoIcon,
  videoIcon,
  cancelGreenIcon,
} from '../../../../components/icons/icons.jsx';
import { apiURL } from '../../../../env-url.js';
import SuccessModal from '../../../../components/success-modal/success-modal.jsx';

const Updatelearning = ({ handleOpen, editingCard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [activeTab, setActiveTab] = useState('tab1');
  const [data, setData] = useState([]);
  const [editdata, seteditdata] = useState([]);
  const [categoriesedit, setcategoriesedit] = useState([]);
  const [brandedit, setbrandedit] = useState([]);
  const [marketedit, setmarketedit] = useState([]);
  const [tagsedit, settagsedit] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newMediaFiles, setNewMediaFiles] = useState([]);

  const fileprefix =
    'https://bieno-da12-d-930113-webapi-01.azurewebsites.net/api/gotfl/learnings/media?name=';

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleSelectCategories = (e) => {
    setcategoriesedit(e);
  };
  const handleSelectBrands = (e) => {
    setbrandedit(e);
  };
  const handleSelectMarket = (e) => {
    setmarketedit(e);
  };
  const handleSelectTags = (e) => {
    settagsedit(e);
  };

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

  function deleteFile(e) {
    const updatedMediaLinks = editdata.mediaLinks.filter(
      (item, index) => index !== e
    );
    seteditdata((prevData) => ({ ...prevData, mediaLinks: updatedMediaLinks }));
    setIsDisabled(false);
  }
  const Categories = data.filter((ele) => ele.classificationId === 1);
  const Brands = data.filter((ele) => ele.classificationId === 2);
  const Markets = data.filter((ele) => ele.classificationId === 3);
  const Tags = data.filter((ele) => ele.classificationId === 4);

  const fetcheditData = () => {
    api
      .get(`${apiURL}/gotfl/learnings/${editingCard}`)
      .then((response) => {
        seteditdata(response.data);
        setcategoriesedit([response.data.learningLabel[0]]);
        setbrandedit([response.data.learningLabel[1]]);
        setmarketedit([response.data.learningLabel[2]]);
        setTitle(response.data.title);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const fetchData = () => {
    api
      .get(`${apiURL}/gotfl/learnings/labellings`)
      .then((response) => {
        setData((prevData) => [...prevData, ...response.data]);
        const Tags = response.data.filter((ele) => ele.classificationId === 4);
        let edittag = Tags.find((user) => user.name === editdata.tags);
        settagsedit([edittag]);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetcheditData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [editdata]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let posttags = [];
    tagsedit.map((tag) => {
      posttags.push(tag.name);
    });

    let postcategories = [];
    categoriesedit.map((categories) => {
      postcategories.push(categories);
    });

    let postbrand = [];
    brandedit.map((brand) => {
      postbrand.push(brand);
    });

    let postmarket = [];
    marketedit.map((market) => {
      postmarket.push(market);
    });

    const updatedMediaLinksData = [
      ...editdata.mediaLinks,
      ...newMediaFiles.map((item) => ({
        fileCategory: item.type.startsWith('image') ? 'img' : 'video',
        contentType: item.type,
        fileName: item.name,
        fileURL: fileprefix + encodeURIComponent(item.name),
        filestream: null,
      })),
    ];
 

    api(`${apiURL}/gotfl/learnings/${editingCard}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: editingCard,
        title: title,
        description: description,
        mediaLinks: updatedMediaLinksData,
        tags: posttags.join(','),
        learningLabel: [...postcategories, ...postbrand, ...postmarket],
        ownerId: 'bd2c9082-7881-4253-9b96-8a0cdb54f0b6',
        keywords: '',
        isActive: true,
        createdOn: '2023-08-06T16:42:36.132Z',
        updatedOn: '2023-08-06T16:42:36.132Z',
      }),
    }).then((response) => {
      if (response.status) {
        setShowSuccessModal(true);
      }
    });
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
      color: '#fff',
      borderRadius: 'none',
      border: '1px solid #71717a',
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
                  <span>update learning</span>
                  <img src={closeIcon} alt="" onClick={handleOpen} />
                </div>

                <div className="share-learning-scroll">
                  <div className="share-learning-title">
                    <input
                      type="text"
                      name="title"
                      //value={title}
                      defaultValue={editdata.title}
                      onChange={handleChange}
                      placeholder="Post Title"
                      required
                    />
                  </div>
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
                        </li>
                      </ul>
                    </div>
                    {activeTab === 'tab1' && (
                      <div className="share-img-container">
                        <div className="uploaded-files-list">
                          {editdata.mediaLinks &&
                            editdata.mediaLinks.length > 0 &&
                            editdata.mediaLinks.map((item, index) => {
                              return (
                                <div className="image-list" key={item.id}>
                                  {item.fileCategory === 'img' ? (
                                    <img
                                      src={fileprefix + item.fileURL}
                                      alt="mediaLinks"
                                      key={index}
                                    />
                                  ) : (
                                    <>
                                      <video
                                        src={item.fileURL}
                                        alt="mediaLinks"
                                        key={index}
                                      ></video>
                                      <div className="video-icon-container">
                                        <img
                                          className="video-icon"
                                          src={videoIcon}
                                          alt="Video Icon"
                                        />
                                      </div>
                                    </>
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
                              setNewMediaFiles([
                                ...newMediaFiles,
                                event.target.files[0],
                              ]);
                              if (event.target.files[0].size <= 5e6) {
                                const updatedMediaLinks = [
                                  ...editdata.mediaLinks,
                                ];
                                const newFile = {
                                  fileCategory:
                                    event.target.files[0].type.startsWith(
                                      'image'
                                    )
                                      ? 'img'
                                      : 'video',
                                  contentType: event.target.files[0].type,
                                  fileName: event.target.files[0].name,
                                  fileURL: '',
                                  url: URL.createObjectURL(
                                    event.target.files[0]
                                  ),
                                  filestream: await convertToBase64(
                                    event.target.files[0]
                                  ),
                                };
                                updatedMediaLinks.push(newFile);
                                seteditdata((prevData) => ({
                                  ...prevData,
                                  mediaLinks: updatedMediaLinks,
                                }));
                              }
                            } else {
                              alert('only image is allowed ');
                            }
                          }}
                        />
                        <label htmlFor="fileUpload">
                          <img src={photoIcon} alt="imageIcon" />
                          <input placeholder="You can add up to 5 images or 1 videos" />
                        </label>
                      </div>
                    )}
                    {activeTab === 'tab2' && (
                      <div className="share-learning-title">
                        <input
                          type="text"
                          name="Link"
                          defaultValue={editdata.mediaLinks}
                          // onChange={handleChangeLink}
                          placeholder="Add video Link"
                        />
                      </div>
                    )}
                  </div>
                  <div className="share-learning-desn">
                    <input
                      type="text"
                      name="description"
                      defaultValue={editdata.description}
                      onChange={handleChangeDescription}
                      placeholder="Type or click a picture of your learning description"
                    />
                    <div className="line-camera-container">
                      <div className="camera">
                        <img src={gallery} alt="" />
                      </div>
                    </div>
                  </div>

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
                        value={categoriesedit}
                        placeholder="Categories"
                        styles={customStyles}
                        required
                      />
                    </div>
                    <div className="share-learning-brands">
                      <Select
                        isMulti
                        maxMenuHeight={200}
                        options={Brands}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id}
                        loadOptions={fetchData}
                        onChange={handleSelectBrands}
                        value={brandedit}
                        placeholder="Brands"
                        styles={customStyles}
                        required
                      />
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
                        value={marketedit}
                        placeholder="Market"
                        styles={customStyles}
                        required
                      />
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
                        value={tagsedit}
                        placeholder="Tags"
                        styles={customStyles}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="share-learning-btn mt-10">
                  <button
                    type="submit"
                    onClick={() => {
                      setShowSuccessModal(!showSuccessModal);
                    }}
                  >
                    updatelearning
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
Updatelearning.propTypes = {
  handleOpen: PropTypes.bool.isRequired, // Add the missing prop type validation
};
export default Updatelearning;
