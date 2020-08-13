import React from 'react';
import { useSelector } from 'react-redux';
import { map } from 'lodash/collection';

import { citiesSelector, weatherInfoByIdSelector } from './reducer';
import SavedCity from './SavedCity';

function SavedCities() {
  const cities = useSelector((state) => state.cities);
  const savedCities = citiesSelector(cities);

  return (
    <>
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
    </>
  );
}

export default SavedCities;
