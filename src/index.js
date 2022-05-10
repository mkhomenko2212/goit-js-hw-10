import './css/styles.css';
import Notiflix from 'notiflix'
import { fetchCountries } from './js/fetch-countries'
import debounce from 'lodash.debounce'

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countriesListEl = document.querySelector('.country-list');
const cardContainerEl = document.querySelector('.country-info');



const onCountriesFetch = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue.length === 0) {
        countriesListEl.innerHTML = "";
        return;
    } else {
        fetchCountries(inputValue)
        .then(onMarkupCountryCard)
            .catch( () => {
                countriesListEl.innerHTML = "";
                Notify.failure('Oops, there is no country with that name');
            });
    };
} 

inputEl.addEventListener('input', debounce(onCountriesFetch, DEBOUNCE_DELAY));


// Добавляем разметку
const onMarkupCountryCard = (countries) => {
    if (countries.length > 10) {
        cardContainerEl.innerHTML = "";
        return Notify.info('Too many matches found. Please enter a more specific name.');
    } if (countries.length === 1) {
        cardContainerEl.innerHTML = countryCard(countries[0]);
    } else {
        countriesListEl.innerHTML = countryList(countries);
    }
}