//live_wR84NoD0Zi8ijz9x8CliBmxrXIlf6XHm7mlzgn1u8ueopN77ta1ls607iNekAUuW

// import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

try {
  loader.classList.remove('hidden');
  error.classList.add('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
  showError();
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');
}

breedSelect.addEventListener('change', e => {
  catInfo.innerHTML = '';
  loader.classList.remove('hidden');
  fetchCatByBreed(e.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
      <h2>${name}</h2>
      <img src="${url}" alt="${name}" />
      <p>${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`
  );
  loader.classList.add('hidden');
}

function showError() {
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}

// async function fetchBreeds() {
//   const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
//   return response.data;
// }
// https://api.thecatapi.com/v1/images/search
// `<option value="${id}">${name}</option>`
