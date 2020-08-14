import React from 'react';

import { kelvinToCelsius } from '../../utils/temperature';

function SavedCity({
  id,
  name,
  icon,
  weatherDescription,
  minTemp,
  maxTemp,
  onRemove,
}) {
  const remove = () => {
    onRemove && onRemove(id);
  };
  return (
    <div className="card mb-2">
      <div className="card-content">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Name</p>
              <p className="title">{name}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Weather</p>
              {icon && (
                <img
                  alt={weatherDescription}
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  width={48}
                  height={48}
                />
              )}
              {!icon && <p className="title">{weatherDescription}</p>}
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Min. Temp</p>
              <p className="title">{kelvinToCelsius(minTemp)}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Max. Temp</p>
              <p className="title">{kelvinToCelsius(maxTemp)}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Actions</p>
              <p className="title">
                <a
                  className="delete is-large"
                  title="Remove this item"
                  onClick={remove}
                ></a>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SavedCity;
