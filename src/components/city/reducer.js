import { find, reduce, each, map, filter } from 'lodash/collection';
import { createSelector } from 'reselect';
import { slice } from 'lodash/array';

import {
  SEARCH_CITY_STARTED,
  SEARCH_CITY_SUCCEEDED,
  SEARCH_CITY_FAILED,
  SELECT_PAGE_SIZE,
  SELECT_PAGE_INDEX,
  REMOVE_CITY,
} from './actionTypes';
import constants from './constants';

const initialState = {
  allIds: [],
  byId: {},
  savedIds: [],
  pageSize: constants.pageSizes[0],
  pageIndex: 0,

  isSearching: false,
  hasSearched: false,
  searchError: '',
  originalSearchError: null,
};

const citiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_CITY_STARTED:
      return {
        ...state,
        isSearching: true,
        hasSearched: false,
        searchError: '',
        originalSearchError: null,
      };

    case SEARCH_CITY_SUCCEEDED:
      const ids = [...state.allIds];

      const cities = Array.isArray(action.cities)
        ? action.cities
        : [action.cities];

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
        originalSearchError: action.originalError,
      };

    case SELECT_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.pageSize,
      };

    case SELECT_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.pageIndex,
      };

    case REMOVE_CITY:
      const idsToStay = filter(state.allIds, (id) => id !== action.id);
      const citiesToStay = map(idsToStay, (currentId) => state.byId[currentId]);
      const reducedCitiesToStay = reduce(
        citiesToStay,
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
        allIds: idsToStay,
        byId: reducedCitiesToStay,
      };

    default:
      return state;
  }
};

export default citiesReducer;

const allIds = (state) => map(state.allIds, (id) => state.byId[id]);

export const citiesSelector = createSelector(allIds, (cities) => cities);

export const citiesPagedSelector = (currentIndex) =>
  createSelector(
    (state) => state,
    (state) => {
      const cities = map(state.allIds, (id) => state.byId[id]);
      const startIndex = state.pageSize * currentIndex;
      const endIndex = startIndex + state.pageSize;
      return slice(cities, startIndex, endIndex);
    }
  );

export const weatherInfoByIdSelector = (id) =>
  createSelector(
    allIds,
    (cities) => (find(cities, (city) => city.id === id) || {}).weather[0]
  );

export const currentPageSizeSelector = createSelector(
  (state) => state,
  (state) => state.pageSize
);
export const currentPageIndexSelector = createSelector(
  (state) => state,
  (state) => state.pageIndex
);

export const isApiCallLimitError = createSelector(
  (state) => state,
  (state) => {
    if (state.originalSearchError) {
      if (
        state.originalSearchError.response &&
        state.originalSearchError.response.status === 429
      ) {
        return true;
      }
    }
    return false;
  }
);
