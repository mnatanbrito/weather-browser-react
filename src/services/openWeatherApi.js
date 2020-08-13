import axios from 'axios';

import { getOpenWeatherApiKey } from '../env';

const openWeatherApi = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5`,
});

openWeatherApi.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['appid'] = getOpenWeatherApiKey();
  return config;
});

export default openWeatherApi;
