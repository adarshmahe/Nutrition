import request from './fetch';

// login
export function login (data) {
  return request({
    url: '/v1/auth/login',
    method: 'post',
    data
  });
}

// popular diet
export const popularDietKey = (params = {}) => {
  return request({
    url: '/v1/chart/popular-diet/key',
    method: 'get',
    params
  });
};

export const popularDiet = (params = {}) => {
  return request({
    url: '/v1/chart/popular-diet',
    method: 'get',
    params
  });
};

// animal-meat-vs-plant-base-food
export const animalMeatVsPlantBaseFoodKey = (params = {}) => {
  return request({
    url: '/v1/chart/animal-meat-vs-plant-base-food/key',
    method: 'get',
    params
  });
};

export const animalMeatVsPlantBaseFood = (params = {}) => {
  return request({
    url: '/v1/chart/animal-meat-vs-plant-base-food',
    method: 'get',
    params
  });
};

// plant-based-food-consumption
export const plantBasedFoodConsumptionKey = (params = {}) => {
  return request({
    url: '/v1/chart/plant-based-food-consumption/key',
    method: 'get',
    params
  });
};

export const plantBasedFoodConsumption = (params = {}) => {
  return request({
    url: '/v1/chart/plant-based-food-consumption',
    method: 'get',
    params
  });
};

// plant-based-food-consumption
export const frequenceOfMeatSubstitutesComsuptionKey = (params = {}) => {
  return request({
    url: '/v1/chart/frequence-of-meat-substitutes-comsuption/key',
    method: 'get',
    params
  });
};

export const frequenceOfMeatSubstitutesComsuption = (params = {}) => {
  return request({
    url: '/v1/chart/frequence-of-meat-substitutes-comsuption',
    method: 'get',
    params
  });
};

// wave/key
export const waveKey = (params = {}) => {
  return request({
    url: '/v1/wave/key',
    method: 'get',
    params
  });
};

// plant-based-dites-trend
export const plantBasedDitesTrendKey = (params = {}) => {
  return request({
    url: '/v1/chart/plant-based-dites-trend/key',
    method: 'get',
    params
  });
};

export const plantBasedDitesTrend = (params = {}) => {
  return request({
    url: '/v1/chart/plant-based-dites-trend',
    method: 'get',
    params
  });
};

// total-plant-based-food-consumption-trend
export const totalPlantBasedFoodConsumptionTrendKey = (params = {}) => {
  return request({
    url: '/v1/chart/total-plant-based-food-consumption-trend/key',
    method: 'get',
    params
  });
};

export const totalPlantBasedFoodConsumptionTrend = (params = {}) => {
  return request({
    url: '/v1/chart/total-plant-based-food-consumption-trend',
    method: 'get',
    params
  });
};

// plant-based-foods-consumption-trend
export const plantBasedFoodsConsumptionTrendKey = (params = {}) => {
  return request({
    url: '/v1/chart/plant-based-foods-consumption-trend/key',
    method: 'get',
    params
  });
};

export const plantBasedFoodsConsumptionTrend = (params = {}) => {
  return request({
    url: '/v1/chart/plant-based-foods-consumption-trend',
    method: 'get',
    params
  });
};

// plant-based-total-category-performance
export const plantBasedTotalCategoryPerformance = (params = {}) => {
  return request({
    url: '/v1/chart-static/plant-based-total-category-performance',
    method: 'get',
    params
  });
};

// brand-performance-category-performance
export const brandPerformanceCategoryPerformance = (params = {}) => {
  return request({
    url: '/v1/chart-static/brand-performance-category-performance',
    method: 'get',
    params
  });
};

// brand-performance-category-performance
export const painPointsChangeOverTime = (params = {}) => {
  return request({
    url: '/v1/chart-static/pain-points-change-over-time',
    method: 'get',
    params
  });
};