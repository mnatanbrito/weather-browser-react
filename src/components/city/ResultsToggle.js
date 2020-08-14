import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import constants from './constants';
import { selectPageSize } from './actions';
import { currentPageSizeSelector, citiesSelector } from './reducer';

function ResultsToggle({ onChange }) {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const savedCities = citiesSelector(cities);
  const pageSize = currentPageSizeSelector(cities);

  const change = (size) => {
    dispatch(selectPageSize(size));
  };

  if (savedCities.length === 0) {
    return null;
  }

  return (
    <div className="buttons has-addons is-pulled-right">
      <button
        className={`button ${
          pageSize === constants.pageSizes[0] ? 'is-selected is-info' : ''
        } is-selected`}
        onClick={() => change(constants.pageSizes[0])}
        title={`${constants.pageSizes[0]} results per page`}
      >
        {constants.pageSizes[0]}
      </button>
      <button
        className={`button ${
          pageSize === constants.pageSizes[1] ? 'is-selected is-info' : ''
        } is-selected`}
        onClick={() => change(constants.pageSizes[1])}
        title={`${constants.pageSizes[1]} results per page`}
      >
        {constants.pageSizes[1]}
      </button>
    </div>
  );
}

export default ResultsToggle;
