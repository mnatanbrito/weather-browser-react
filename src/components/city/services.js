import api from '../../services/openWeatherApi';

export function getCitiesByName(name) {
  return api
    .get('/weather', {
      params: {
        q: name,
      },
    })
    .then((response) => response.data);
}
