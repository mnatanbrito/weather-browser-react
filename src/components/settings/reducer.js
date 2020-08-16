import { SELECT_LANGUAGE } from './actionTypes';
import locales from '../../i18n/locales';

const initialState = {
  language: locales.EN,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_LANGUAGE:
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
};

export default settingsReducer;
