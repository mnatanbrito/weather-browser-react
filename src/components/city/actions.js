import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
  SELECT_PAGE_INDEX,
  REMOVE_CITY,
} from './actionTypes';
import { getCitiesByName } from './services';
import { showNotification } from '../notifications/actions';

const searchCityByNameStarted = (name) => ({
  type: SEARCH_CITY_STARTED,
  name,
});

const searchCityByNameSucceeded = (cities) => ({
  type: SEARCH_CITY_SUCCEEDED,
  cities,
});

const searchCityByNameFailed = (error, errorStatus) => ({
  type: SEARCH_CITY_FAILED,
  error,
  errorStatus,
});

export const searchCityByName = (name) => (dispatch, getState) => {
  dispatch(searchCityByNameStarted(name));

  const lang = getState().settings.language === 'en' ? 'en' : 'pt_br';

  return getCitiesByName(name, lang)
    .then((cities) => {
      dispatch(searchCityByNameSucceeded(cities));
    })
    .catch((err) => {
      const message =
        (err.response || {}).status === 404
          ? 'City not found 🤔'
          : 'Something went wrong 😔';
      dispatch(searchCityByNameFailed(message, (err.response || {}).status));
      dispatch(showNotification('error', message));
    });
};

export const selectPageSize = (pageSize) => (dispatch, getState) => {
  if (getState().cities.pageSize !== pageSize) {
    dispatch({
      type: SELECT_PAGE_SIZE,
      pageSize,
    });
  }
};

export const selectPageIndex = (pageIndex) => (dispatch, getState) => {
  if (getState().cities.pageIndex !== pageIndex) {
    dispatch({
      type: SELECT_PAGE_INDEX,
      pageIndex,
    });
  }
};

export const removeCity = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_CITY,
    id,
  });
};
