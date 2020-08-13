import { find, reduce, each, map } from 'lodash/collection';
import { createSelector } from 'reselect';

import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
} from './actionTypes';
import constants from './constants';

const initialState = {
  allIds: [],
  byId: {},
  savedIds: [],
  pageSize: constants.pageSizes[0],

  isSearching: false,
  hasSearched: false,
  searchError: '',
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CITY_STARTED:
      return {
        ...state,
        isSearching: true,
        hasSearched: false,
        searchError: '',
      };

    case SEARCH_CITY_SUCCEEDED:
      const ids = [...state.allIds];

      const cities = Array.isArray(action.cities)
        ? action.cities
        : [action.cities];

      console.log(cities);

      each(cities, (city) => {
        const currentCity = find(ids, (id) => id === city.id);
        if (!currentCity) {
          ids.push(city.id);
        }
      });

      const newIds = reduce(
        cities,
        (acc, city) => {
          if (!acc[city.id]) {
            acc[city.id] = city;
          }

          return acc;
        },
        {}
      );

      return {
        ...state,
        allIds: ids,
        byId: {
          ...state.byId,
          ...newIds,
        },
        isSearching: false,
        hasSearched: true,
      };
    case SEARCH_CITY_FAILED:
      return {
        ...state,
        isSearching: false,
        hasSearched: true,
        searchError: action.error,
      };

    case SELECT_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      };

    default:
      return state;
  }
};

export default citiesReducer;

const allIds = (state) => map(state.allIds, (id) => state.byId[id]);

export const citiesSelector = createSelector(allIds, (cities) => cities);

export const weatherInfoByIdSelector = (id) =>
  createSelector(
    allIds,
    (cities) => (find(cities, (city) => city.id === id) || {}).weather[0]
  );

export const currentPageSizeSelector = createSelector(
  (state) => state,
  (state) => state.pageSize
);
