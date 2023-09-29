import request from './fetch';

// login
export function login (data) {
  return request({
    url: '/v1/auth/login',
    method: 'post',
    data
  });
}

// list
export function fetchList (params, uuid) {
  return request({
    url: '/v1/consumer_theater',
    method: 'get',
    uuid,
    params,
    originData: true
  });
}

// countries
export function fetchCountries (params) {
  return request({
    url: '/v1/consumer_theater/country',
    method: 'get',
    params
  });
}

// category list
export function fetchCategory (params) {
  return request({
    url: '/v1/consumer_theater/category',
    method: 'get',
    params
  });
}

// video list of topic
export function getListByTopic (params, uuid) {
  return request({
    url: '/v1/consumer_theater/getByTopic',
    method: 'get',
    uuid,
    params,
    originData: true
  });
}

// dictionary list
export function fetchDictionary (params) {
  return request({
    url: '/v1/consumer_theater/dictionary',
    method: 'get',
    params
  });
}

// geographic_region list
export function fetchGeographicRegion (params) {
  return request({
    url: '/v1/consumer_theater/geographic_region',
    method: 'get',
    params
  });
}

// add suggestion
export function postSuggestion (data) {
  return request({
    url: '/v1/consumer_theater/suggestion',
    method: 'post',
    data
  });
}

// insight data
export function fetchInsight (params) {
  return request({
    url: '/v1/consumer_theater/insight',
    method: 'get',
    params
  });
}