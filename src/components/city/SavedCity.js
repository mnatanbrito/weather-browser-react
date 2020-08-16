import React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import { kelvinToCelsius, formatTemperature } from '../../utils/temperature';

function SavedCity({
  id,
  name,
  icon,
  weatherDescription,
  minTemp,
  maxTemp,
  onRemove,
}) {
  const settings = useSelector((state) => state.settings);
  const i18n = useIntl();

  const remove = () => {
    onRemove && onRemove(id);
  };
  return (
    <div className="saved-city card mb-2">
      <div className="card-content">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <FormattedMessage id="savedCityName" />
              </p>
              <p className="title">{name}</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <FormattedMessage id="savedCityWeather" />
              </p>
              {icon && (
                <img
                  alt={weatherDescription}
                  src={`http://openweathermap.org/img/w/${icon}.png`}
                  width={48}
                  height={48}
                />
              )}
              <p>
                <span className="tag is-primary">{weatherDescription}</span>
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <FormattedMessage id="savedCityMinTemperature" />
              </p>
              <p className="title">
                {formatTemperature(
                  settings.language,
                  settings.language === 'en' ? minTemp : kelvinToCelsius,
                  minTemp
                )}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">
                <FormattedMessage id="savedCityMaxTemperature" />
              </p>
              <p className="title">
                {formatTemperature(
                  settings.language,
                  settings.language === 'en' ? maxTemp : kelvinToCelsius,
                  maxTemp
                )}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading"></p>
              <p className="title">
                <button
                  type="button"
                  aria-label={i18n.formatMessage({
                    id: 'deleteCityAction',
                  })}
                  className="delete is-large"
                  title={i18n.formatMessage({
                    id: 'deleteCityAction',
                  })}
                  onClick={remove}
                ></button>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default SavedCity;
