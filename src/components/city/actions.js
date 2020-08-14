import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
  SELECT_PAGE_INDEX,
  REMOVE_CITY,
} from './actionTypes';
import { getCitiesByName } from './services';

const searchCityByNameStarted = (name) => ({
  type: SEARCH_CITY_STARTED,
  name,
});

const searchCityByNameSucceeded = (cities) => ({
  type: SEARCH_CITY_SUCCEEDED,
  cities,
});

const searchCityByNameFailed = (error, originalError) => ({
  type: SEARCH_CITY_FAILED,
  error,
  originalError,
});

export const searchCityByName = (name) => (dispatch) => {
  dispatch(searchCityByNameStarted(name));

  return getCitiesByName(name)
    .then((cities) => {
      dispatch(searchCityByNameSucceeded(cities));
    })
    .catch((err) => {
      dispatch(searchCityByNameFailed(err.message, err));
    });
};

export const selectPageSize = (pageSize) => (dispatch) => {
  dispatch({
    type: SELECT_PAGE_SIZE,
    pageSize,
  });
};

export const selectPageIndex = (pageIndex) => (dispatch) => {
  dispatch({
    type: SELECT_PAGE_INDEX,
    pageIndex,
  });
};

export const removeCity = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_CITY,
    id,
  });
};
