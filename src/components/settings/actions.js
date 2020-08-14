import { SELECT_LANGUAGE } from './actionTypes';

export const selectLanguage = (language) => (dispatch) => {
  dispatch({
    type: SELECT_LANGUAGE,
    language,
  });
};
