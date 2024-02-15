//live_wR84NoD0Zi8ijz9x8CliBmxrXIlf6XHm7mlzgn1u8ueopN77ta1ls607iNekAUuW

const fetchBreedsBtn = document.querySelector('.btn');

fetchBreedsBtn.addEventListener('click', async () => {
  try {
    const breeds = await fetchBreeds();
    console.log(breeds);
  } catch (error) {
    console.log(error);
  }
});

async function fetchBreeds() {
  const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
  return response.data;
}
