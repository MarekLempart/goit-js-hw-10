import axios from 'axios';

export const fetchBreeds = () => {
  axios.defaults.headers.common['x-api-key'] =
    'live_wR84NoD0Zi8ijz9x8CliBmxrXIlf6XHm7mlzgn1u8ueopN77ta1ls607iNekAUuW';

  return axios.get(`https://api.thecatapi.com/v1/breeds`).then(res => res.data);
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(res => res.data);
};
