import './css/styles.css';
import debounce from './modules/debounce';
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
    
    // function clearField() {
    //     refs.countryList.innerHTML = '';
    //     refs.countryInfo.innerHTML = '';
    // }

    // clearField();
    
    if (inputData !== '') {
    fetchCountries(inputData)
      .then(countries => {
        if (countries.length > 10) {
          window.alert(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countries.length >= 2 && countries.length <= 10) {
          makeCoutryList(countries);
        } else if (countries.length === 1) {
          makeCountryInfo(countries);
        }
      })
      .catch((error) => window.alert(error));
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
        <p><b>Capital</b>: ${capital}</p>
        <p><b>Population</b>: ${population}</p>
        <p><b>languages</b>: ${Object.values(languages)}</p>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
}


