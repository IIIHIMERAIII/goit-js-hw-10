import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("input"),
    countryList: document.querySelector(".country-list"),
    countryInfo: document.querySelector(".country-info"),
};

refs.input.addEventListener("input", debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    let inputData = e.target.value.trim();
    
    clearField();
    
    if (inputData !== '') {
    fetchCountries(inputData)
      .then(countries => {
        if (countries.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length <= 10) {
          makeCoutryList(countries);
        } else if (countries.length === 1) {
          makeCountryInfo(countries);
        }
      })
      .catch(error => Notiflix.Notify.failure(error));
  }
}

function makeCoutryList(countries) {
    const markup = countries
        .map(({ flags, name }) =>  {
        return `
        <li>
            <img src="${flags.svg}" alt="Flag of ${name.common} width="30" height="30"> <p>${name.common}</p>
        </li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}
function makeCountryInfo(countries) {
  const markup = countries
    .map(({ flags, name, capital, population, languages }) => {
      return `    
        <h1><img src="${flags.svg}" alt="Flag of ${
        name.common
      } width="30" height="30">${name.common}</h1>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>languages: ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}

function clearField() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
