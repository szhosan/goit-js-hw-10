const BASE_URL = `https://restcountries.com/v3.1/`;

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}name/${name}?fields=name,capital,population,flags,languages`).then(r => r.json());
}

