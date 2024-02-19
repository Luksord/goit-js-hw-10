import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

//error.classList.add('hidden');

/*
Dopóki trwa jakiekolwiek żądanie HTTP, powinna być wyświetlana animacja ładowania - element p.loader. 
Gdy nie ma żadnych żądań lub gdy żądanie zostało zakończone, animację ładowania należy ukryć. 
W tym celu użyj dodatkowych klas CSS.
- Podczas wykonywania żądania listy ras, należy ukryć select.breed-select i wyświetlić p.loader.
- Podczas wykonywania żądania informacji o kocie, musisz ukryć div.cat-info i wyświetlić p.loader.
- Po zakończeniu wszystkich żądań, p.loader musi zostać ukryty.
*/
/*

*/
try {
  loader.classList.remove('hidden'); // Podczas wykonywania żądania listy ras, należy ukryć select.breed-select i wyświetlić p.loader.
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
  showError();
}

const slimSelect = new SlimSelect({
  select: '.breed-select',
});

/*
...W przypadku pomyślnego żądania, należy wypełnić select.breed-select opcjami tak, aby value 
opcji zawierało id rasy, a interfejs użytkownika wyświetlał nazwę rasy.
*/
function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  slimSelect.setData(Array.from(breedSelect.options));
  loader.classList.add('hidden'); // Po zakończeniu wszystkich żądań, p.loader musi zostać ukryty.
}

/*
Gdy użytkownik wybierze opcję w select, należy wykonać żądanie o pełnych informacjach o kocie 
do zasobu https://api.thecatapi.com/v1/images/search. Nie zapomnij podać w tym żądaniu parametru 
ciągu zapytania 'breed_ids' z identyfikatorem rasy.
Tak wyglądałby adres URL żądania pełnych informacji o psie według identyfikatora rasy.
https://api.thecatapi.com/v1/images/search?breed_ids=identyfikator_rasy
*/
breedSelect.addEventListener('change', e => {
  loader.classList.remove('hidden'); // Podczas wykonywania żądania informacji o kocie, musisz ukryć div.cat-info i wyświetlić p.loader.
  fetchCatByBreed(e.target.value)
    .then(data => renderCat(data[0]))
    .catch(() => {
      showError();
      Notiflix.Loading.remove();
    });
});

/*
Jeśli żądanie zostanie pomyślnie wykonane, pod listą rozwijaną (select), w bloku div.cat-info pojawi 
się obraz oraz szczegółowe informacje o kocie: nazwa rasy, opis i temperament.
*/
function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div class="cat-container">
      <div>
        <img class="cat-image" src="${url}" alt="${name}" />
      </div>
      <div class="info-container">
        <h2 class="cat-breed">${name}</h2>
        <p class="cat-description">${description}</p>
        <p class="cat-temperament"><strong>Temperament: </strong> ${temperament}</p>
        </div>
    </div>`
  );
  loader.classList.add('hidden'); // Po zakończeniu wszystkich żądań, p.loader musi zostać ukryty.
  Notiflix.Loading.remove();
}

function showError() {
  loader.classList.add('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

/*
const slimSelect = new SlimSelect({
  select: '.breed-select',
});
 */

//

/*
 */

/*
fetchBreedsBtn.addEventListener('click', async () => {
  try {
    const breeds = await fetchBreeds();
    console.log(breeds);
    //   page += 1;
    //   if (page > 1) {
    //     fetchBreedsBtn.textContent = 'Fetch more breeds';
    //   }
  } catch (error) {
    console.log(error);
  }
});

async function fetchBreeds() {
  //   const params = new URLSearchParams({
  //     _limit: perPage,
  //     _page: page,
  //   });
  const response = await axios.get(`https://api.thecatapi.com/v1/breeds`);
  return response.data;
}

<***>

<body>
<button type="button" class="btn">Fetch breeds</button>
</body>

<script>
const fetchBreedsBtn = document.querySelector('.btn');

fetchBreedsBtn.addEventListener('click', () => {
  try {
    loader.classList.remove('hidden');
    fetchBreeds().then(data => renderSelect(data));
  } catch (error) {
    console.log(error);
  }
});
</script>

<***>

*/
