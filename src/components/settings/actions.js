import { SELECT_LANGUAGE } from './actionTypes';

export const selectLanguage = (language) => (dispatch, getState) => {
  if (getState().settings.language !== language) {
    dispatch({
      type: SELECT_LANGUAGE,
      language,
    });
  }
};
