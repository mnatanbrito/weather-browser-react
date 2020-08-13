import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
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

const searchCityByNameFailed = (error) => ({
  type: SEARCH_CITY_FAILED,
  error,
});

export const searchCityByName = (name) => (dispatch) => {
  dispatch(searchCityByNameStarted(name));

  return getCitiesByName(name)
    .then((cities) => {
      dispatch(searchCityByNameSucceeded(cities));
    })
    .catch((err) => {
      dispatch(searchCityByNameFailed(err.message));
    });
};
