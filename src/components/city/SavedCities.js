import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash/collection';
import { useIntl, FormattedMessage } from 'react-intl';

import {
  citiesSelector,
  weatherInfoByIdSelector,
  citiesPagedSelector,
  currentPageIndexSelector,
  currentPageSizeSelector,
} from './reducer';
import { selectPageIndex, removeCity } from './actions';
import SavedCity from './SavedCity';
import Paginator from '../shared/Paginator';
import ConfirmationDialog from '../shared/ConfirmationDialog';

function SavedCities() {
  const i18n = useIntl();
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities);
  const totalCities = citiesSelector(cities);
  const pageIndex = currentPageIndexSelector(cities);
  const pageSize = currentPageSizeSelector(cities);
  const savedCities = citiesPagedSelector(pageIndex)(cities);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const onPageSelected = (index) => {
    dispatch(selectPageIndex(index));
  };

  const onRemove = () => {
    dispatch(removeCity(cityToDelete));
    onCancel();
  };

  const onShowConfirmation = (id) => {
    setCityToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const onCancel = () => {
    setCityToDelete(null);
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <ConfirmationDialog
        visible={showDeleteConfirmation}
        title={i18n.formatMessage({
          id: 'deleteModalConfirmationTitle',
        })}
        icon="fa-ban"
        confirmLabel={i18n.formatMessage({
          id: 'deleteModalConfirmationConfirmLabel',
        })}
        confirmClass="is-danger"
        cancelLabel={i18n.formatMessage({
          id: 'deleteModalConfirmationCancelLabel',
        })}
        handleCancel={onCancel}
        handleConfirm={onRemove}
      >
        <p>
          <FormattedMessage id="deleteModalConfirmationMessage" />
        </p>
      </ConfirmationDialog>

      <section className="section mb-3">
        {map(savedCities, (city) => {
          const weatherInfo = weatherInfoByIdSelector(city.id)(cities);
          return (
            <SavedCity
              key={city.id}
              id={city.id}
              name={city.name}
              weatherDescription={(weatherInfo || {}).description}
              minTemp={city.main.temp_min}
              maxTemp={city.main.temp_max}
              icon={weatherInfo.icon}
              onRemove={onShowConfirmation}
            />
          );
        })}
      </section>

      {savedCities.length > 0 ? (
        <section className="section">
          <div className="container">
            <Paginator
              total={Math.ceil(totalCities.length / pageSize)}
              current={pageIndex}
              onPageSelected={onPageSelected}
            />
          </div>
        </section>
      ) : null}
    </>
  );
}

export default SavedCities;
