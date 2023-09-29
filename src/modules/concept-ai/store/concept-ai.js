import { createSlice } from '@reduxjs/toolkit';

const stepOneData = {
  product: '',
  category: '',
  format: '',
  brand: '',
  apiPriceTier: '',
  image_urls: '',
  image_key: '',
  text: '',
};

const initialState = {
  sideBarIsClose: false,
  pageType: '',
  country: '',
  predictionStep: 1,
  stepOneData,
  stepTwoData: [false, false, false, false, false],
  stepThreeData: {
    id: '',
    product: '',
    img: '',
    imgBase64: '',
    text: '',
    cvm: {
      type: '0'
    },
    tableData: []
  },
  filterOptions: {
    categoryOptions: [],
    brandOptions: [],
    formatOptions: [],
  }
};

const conceptAiSlice = createSlice({
  name: 'conceptAi',
  initialState,
  reducers: {
    toggleSideBarClose(state, action) {
      state.sideBarIsClose = action.payload.isClose;
    },
    changePage(state, action) {
      state.pageType = action.payload.pageType;
    },
    changeCountry(state, action) {
      state.country = action.payload.country;
    },
    changePredictionStep(state, action) {
      state.predictionStep = action.payload.predictionStep;
    },
    changeStepOneData(state, action) {
      state.stepOneData = { ...state.stepOneData, ...action.payload.stepOneData};
    },
    clearStepOneData(state) {
      state.stepOneData = stepOneData;
    },
    changeStepTwoData(state, action) {
      const res = [false, false, false, false, false];
      action.payload.stepTwoData?.forEach(item => {
        res[item] = true;
      });
      state.stepTwoData = res;
    },
    changeStepThreeData(state, action) {
      state.stepThreeData = action.payload.stepThreeData;
    },
    setFilterOptions(state, action) {
      state.filterOptions = action.payload.filterOptions;
    }
  }
});

export const {
  toggleSideBarClose,
  changePage, 
  changeCountry, 
  changePredictionStep,
  changeStepOneData,
  clearStepOneData,
  changeStepTwoData,
  changeStepThreeData,
  setFilterOptions
} = conceptAiSlice.actions;

export default conceptAiSlice.reducer;