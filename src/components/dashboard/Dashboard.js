import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { searchCityByName } from '../city/actions';
// import useDebounce from '../../hooks/useDebounce';
import InputField from '../shared/InputField';
import SavedCities from '../city/SavedCities';
import ResultsToggle from '../city/ResultsToggle';
import Logo from '../shared/Logo';
import ApiStatus from '../city/ApiStatus';

function Dashboard() {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const [text, setText] = useState('');

  // const debouncedText = useDebounce(text, 500);

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

  useEffect(() => {
    if (inputRef && inputRef.current) {
      console.log(`inputRef = ${inputRef.current.getBoundingClientRect().y}`);
    }
  }, [inputRef]);

  return (
    <section className="section">
      <div className="container">
        <div className="dashboard columns is-multiline is-vcentered">
          <div className="column is-12">
            <Logo />
          </div>
          <div className="column is-12">
            <div className="has-text-centered">
              <ApiStatus />
            </div>
          </div>
          <div className="column is-12">
            <InputField
              ref={inputRef}
              loading={cities.isSearching}
              value={text}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </div>
          <div className="column is-12">
            <ResultsToggle />
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
