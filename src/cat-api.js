/*
Podczas ładowania strony powinno zostać wykonane żądanie HTTP w celu uzyskania kolekcji ras. 
Aby to zrealizować, należy wykonać żądanie GET do zasobu https://api.thecatapi.com/v1/breeds, który zwraca 
tablicę obiektów. ([<--index.js] W przypadku pomyślnego żądania, należy wypełnić select.breed-select opcjami tak, aby value 
opcji zawierało id rasy, a interfejs użytkownika wyświetlał nazwę rasy.)

Napisz funkcję fetchBreeds(), która wysyła żądanie HTTP i zwraca obietnicę z tablicą ras - wynikiem żądania. 
Umieść ją w pliku cat-api.js i dokonaj nazwanego eksportu.
*/
import axios from "axios";

export const fetchBreeds = () => {
  //nazwany export
  axios.defaults.headers.common["x-api-key"] =
    "live_qmfqOKLLP33zUO8aWyTccn7kbkrhefoSSclyeRA6urPpBTvCWHSlbUECqqQmAEIP";
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then((res) => res.data);
};

/*
Napisz funkcję fetchCatByBreed(breedId), która oczekuje identyfikatora rasy, wykonuje żądanie HTTP i zwraca 
obietnicę z danymi o kocie - wynikiem żądania. Umieść ją w pliku cat-api.js i dokonaj nazwanego eksportu.
*/
export const fetchCatByBreed = (breedId) => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((res) => res.data);
};
