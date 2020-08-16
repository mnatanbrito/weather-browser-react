import api from '../../services/openWeatherApi';

export function getCitiesByName(name, lang) {
  return api
    .get('/weather', {
      params: {
        q: name,
        lang,
      },
    })
    .then((response) => response.data);
}
