import gsap from 'gsap';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

gsap.to('body', {
  background: 'linear-gradient(to right, red, blue)',
  duration: 50,
  repeat: -1,
  yoyo: true,
});

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');

try {
  loader.classList.remove('hidden');
  // error.classList.add('hidden');
  Notiflix.Loading.pulse('Loading...');
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
  Notiflix.Loading.remove();
}

breedSelect.addEventListener('change', e => {
  catInfo.innerHTML = '';
  loader.classList.remove('hidden');
  Notiflix.Loading.pulse('Loading...');
  fetchCatByBreed(e.target.value)
    .then(data => renderCat(data[0]))
    .catch(() => {
      showError();
      Notiflix.Loading.remove();
      Notiflix.Notify.failure('Fetching cat data failed.');
      // throw new Error('Fetching cat data failed.');
    });
  // .then(() => {
  //   error.classList.add('hidden');
  // });
});

// function renderCat(catData) {
//   const { url } = catData;
//   const { description, name, temperament } = catData.breeds[0];
//   catInfo.insertAdjacentHTML(
//     'beforeend',
//     `<div>
//       <img src="${url}" alt="${name}" />
//       <h2>${name}</h2>
//       <p>${description}</p>
//       <p><strong>Temperament:</strong> ${temperament}</p>
//     </div>`
//   );
//   loader.classList.add('hidden');
// }

// function showError() {
//   loader.classList.add('hidden');
//   error.classList.remove('hidden');
// }

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];

  const catContainer = document.createElement('div');
  catContainer.classList.add('cat-container');

  const catImage = document.createElement('img');
  catImage.src = url;
  catImage.alt = name;
  catContainer.appendChild(catImage);

  const catInfoContainer = document.createElement('div');
  catInfoContainer.classList.add('cat-info-container');

  const catName = document.createElement('h2');
  catName.textContent = name;
  const catTemperament = document.createElement('p');
  catTemperament.textContent = `Temperament: ${temperament}`;
  const catDescription = document.createElement('p');
  catDescription.textContent = description;

  catInfoContainer.appendChild(catName);
  catInfoContainer.appendChild(catTemperament);
  catInfoContainer.appendChild(catDescription);

  catContainer.appendChild(catInfoContainer);

  catInfo.appendChild(catContainer);

  loader.classList.add('hidden');
  Notiflix.Loading.remove();
}

function showError() {
  loader.classList.add('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
