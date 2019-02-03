import axios from 'axios';

const getFacebookPlacesData = (coords, token) => {
  const [latitude, longitude] = coords;
  const parameters = { latitude, longitude };
  const urlObj = Object.keys(parameters).map(key => `${encodeURIComponent(key)}:${parameters[key]}`).join(',');
  return axios.get(
    `https://graph.facebook.com/v3.2/current_place/results?&coordinates={${urlObj}}&access_token=${token}&fields=location,name,picture`,
  );
};

export default getFacebookPlacesData;
