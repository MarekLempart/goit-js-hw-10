//live_wR84NoD0Zi8ijz9x8CliBmxrXIlf6XHm7mlzgn1u8ueopN77ta1ls607iNekAUuW

// import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const fetchBreedsBtn = document.querySelector('.btn');
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.catInfo');
const loader = document.querySelector('.loader');

fetchBreedsBtn.addEventListener('click', () => {
  try {
    loader.classList.remove('hidden');
    fetchBreeds().then(data => renderSelect(data));
  } catch (error) {
    console.log(error);
  }
});

// async function fetchBreeds() {
//   const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
//   return response.data;
// }

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
  fetchCatByBreed(e.target.value).then(data => renderCat(date[0]));
});

// https://api.thecatapi.com/v1/images/search

function renderCat(catDate) {
  const { url } = catDate;
  const { description, name, temperament } = catDate.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
      <h2>${name}</h2>
      <img src="${name} />
      <p>${description}</p>
      <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`
    // `<option value="${id}">${name}</option>`
  );
}
