import { SELECT_LANGUAGE } from './actionTypes';

const initialState = {
  language: 'enUS',
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
