import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';

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
- Podczas wykonywania żądania listy ras, należy ukryć select.breed-select i wyświetlić p.loader.
*/
try {
  loader.classList.remove('hidden'); // Podczas wykonywania żądania listy ras, należy ukryć select.breed-select i wyświetlić p.loader.
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
  showError();
}

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
    `<div>
        <h2>${name}</h2>
        <img src="${url}" alt="${name}" />
        <p>${description}</p>
        <p><strong>Temperament: </strong> ${temperament}</p>
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
