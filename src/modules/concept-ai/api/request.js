import request from './fetch';

// login

export function login (data) {
  return request({
    url: '/v1/auth/login',
    method: 'post',
    data
  });
}

// image upload

export function fileUpload (data) {
  return request({
    url: '/v1/azure_file',
    method: 'post',
    headers:{
      'Content-Type': 'multipart/form-data'
    },
    data
  });

}

// ocr

export function predictionOcr (data) {
  return request({
    url: '/v1/ocr',
    method: 'post',
    data
  });
}

// tokenizer_run

export function predictionTokenizer (params) {
  return request({
    url: '/v1/tokenizer_run',
    method: 'get',
    params
  });
}

// create concept

export function createConcept (data) {
  return request({
    url: '/v1/pred_concept',
    method: 'post',
    data
  });
}

// get result for new concept

export function getNewConceptResult (data) {
  return request({
    url: '/v1/pred_concept_run',
    method: 'post',
    data
  });

}

// heatmap

export function getConceptResultHeatmap (data) {
  return request({
    url: '/v1/aitrust_kpi_run',
    method: 'post',
    data
  });
}

// get filter options

export function getFilterOptions (params) {
  return request({
    url: '/v1/pred_concept_filter',
    method: 'get',
    params
  });
}

// concept list

export function getConceptList (params, uuid) {
  return request({
    url: '/v1/pred_concept',
    method: 'get',
    uuid,
    params,
    originData: true
  });
}

// delete by id

export function deleteConcept (id) {
  return request({
    url: `/v1/pred_concept/${id}`,
    method: 'delete',
  });
}

// fav by id

export function favConcept (id, like) {
  return request({
    url: `/v1/pred_concept/${id}?like=${like}`,
    method: 'put',
  });
}

// download img base64

export function getImgBase64 (params) {
  return request({
    url: '/v1/pred_concept_download',
    method: 'get',
    params,
  });
}