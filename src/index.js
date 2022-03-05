import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  inputRef: document.querySelector(`#search-box`),
  ulRef: document.querySelector('.country-list'),
  infoDivRef: document.querySelector('.country-info'),
};

console.log(refs.inputRef);
refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const requestText = e.target.value.trim();
  clearMarkup();
  fetchCountries(requestText)
    .then(result => {
      //console.log(result);
      if (result.status === 404) {
        Notify.failure('Oops, there is no country with that name');
        return;
      }
      if (result.length <= 10) {
        createListMarkup(result);
      }
      if (result.length === 1) {
        createCountryInfoMarkup(result[0]);
      } else Notify.info('Too many matches found. Please enter a more specific name.');
    })
    .catch(e => console.log(`CATCH: ${e}`));
}

function createListMarkup(countryList) {
  let markup = '';
  for (const country of countryList) {
    markup += `<li class="country-item"><img class="country-image" src="${country.flags.svg}" alt="${country.name.official} flag">${country.name.official}</li>`;
  }
  refs.ulRef.innerHTML = markup;
}

function createCountryInfoMarkup(country) {
  console.log(country);
  let languages = '';
  for (let language of Object.values(country.languages))
  {
      languages += language + ", ";
  }
  languages = languages.slice(0, languages.length-2);
  let markup = `<p><span>Capital: </span>${country.capital}</p>
  <p><span>Population: </span>${country.population}</p>
  <p><span>Languages: </span>${languages}</p>`;
  refs.infoDivRef.innerHTML = markup;
}


function clearMarkup()
{
    refs.ulRef.innerHTML = '';
    refs.infoDivRef.innerHTML = '';
}