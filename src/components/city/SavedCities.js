import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash/collection';

import { citiesSelector, weatherInfoByIdSelector } from './reducer';
import SavedCity from './SavedCity';
import Paginator from '../shared/Paginator';

function SavedCities() {
  const cities = useSelector((state) => state.cities);
  const savedCities = citiesSelector(cities);
  const [pageIndex, setPageIndex] = useState(0);

  const onPageSelected = (index) => {
    setPageIndex(index);
  };

  return (
    <>
      <section className="section mb-3">
        {map(savedCities, (city) => {
          const weatherInfo = weatherInfoByIdSelector(city.id)(cities);
          return (
            <SavedCity
              key={city.id}
              name={city.name}
              weatherDescription={(weatherInfo || {}).description}
              minTemp={city.main.temp_min}
              maxTemp={city.main.temp_max}
              icon={weatherInfo.icon}
            />
          );
        })}
      </section>

      {savedCities.length > 0 ? (
        <section className="section">
          <div className="container">
            <Paginator current={pageIndex} onPageSelected={onPageSelected} />
          </div>
        </section>
      ) : null}
    </>
  );
}

export default SavedCities;
