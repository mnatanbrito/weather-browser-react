import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchCityByName } from '../city/actions';
import InputField from '../shared/InputField';
import SavedCities from '../city/SavedCities';

function Dashboard() {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [text, setText] = useState('');

  const onChange = (ev) => {
    setText(ev.target.value);
  };

  const onSubmit = () => {
    setText('');

    dispatch(searchCityByName(text));
  };

  useEffect(() => {
    if (cities.hasSearched) {
      if (cities.searchError) {
        alert(cities.searchError);
      }
    }
  }, [cities.hasSearched, cities.searchError]);

  return (
    <section className="section">
      <div className="container">
        <div className="dashboard columns is-multiline is-vcentered">
          <div className="column is-12">
            <p className="is-size-3 has-text-centered dashboard--title has-text-grey-light">
              Weather Browser
            </p>
          </div>
          <div className="column is-12">
            <InputField
              loading={cities.isSearching}
              value={text}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </div>
          <div className="column is-12">
            <SavedCities />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
