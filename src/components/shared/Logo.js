import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { selectLanguage } from '../settings/actions';
import usaFlag from '../../assets/icons/usa-flag.png';
import brazilFlag from '../../assets/icons/brazil-flag.png';

export default function Logo() {
  const i18n = useIntl();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const onChangeLanguage = (language) => {
    dispatch(selectLanguage(language));
  };

  return (
    <>
      <p className="is-size-3-mobile is-size-1-tablet has-text-centered">
        <span className="is-inline has-text-grey-light">Weather</span>&nbsp;
        <span className="is-inline has-text-grey">Browser</span>
      </p>
      <p className="has-text-centered">
        <img
          src={usaFlag}
          alt={i18n.formatMessage({
            id: 'englishVersion',
          })}
          className={`clickable ${
            settings.language === 'en' ? 'has-background-grey-lighter' : ''
          }`}
          style={{
            width: 32,
            height: 20,
            padding: settings.language === 'en' ? 3 : 0,
          }}
          onClick={() => onChangeLanguage('en')}
        />
        &nbsp; &nbsp;
        <img
          src={brazilFlag}
          alt={i18n.formatMessage({
            id: 'portugueseVersion',
          })}
          className={`clickable ${
            settings.language === 'pt-BR' ? 'has-background-grey-lighter' : ''
          }`}
          style={{
            width: 32,
            height: 20,
            padding: settings.language === 'pt-BR' ? 3 : 0,
          }}
          onClick={() => onChangeLanguage('pt-BR')}
        />
      </p>
    </>
  );
}
