import axios from 'axios';

export const getFacebookPlacesInfo = (coords, token) => {
  const [latitude, longitude] = coords;
  const parameters = { latitude, longitude };
  const urlObj = Object.keys(parameters).map(key => `${encodeURIComponent(key)}:${parameters[key]}`).join(',');
  return axios.get(`https://graph.facebook.com/v3.2/current_place/results?&coordinates={${urlObj}}&access_token=${token}`);
};

export const getFacebookPlaceCoords = (id, token) => axios.get(`https://graph.facebook.com/v3.2/${id}?fields=location&access_token=${token}`);
