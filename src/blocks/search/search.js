import ButtonState from './__button/search__button';
import sendForm from '../../js/validateForm';
import Api from '../../js/api';
import {CardList} from '../news-card/news-card';

const buttonState = ButtonState();
const form = document.forms.searchForm;
const inputSearch = form.elements.inputSearch;
const searchButton = document.querySelector('.search__button');
const itemList = document.querySelector('.news-card__item-container');

const api = new Api({
    baseUrl: 'https://newsapi.org/v2/everything?',
    apiKey: 'bf58748c05fd4c08858c83cd3fe58654'
});

const dateFrom = new Date();
const dateTo = new Date();

dateFrom.setDate(dateFrom.getDate() - 7).toLocaleString();

class Search {
    handleSearchClick(e) {
        e.preventDefault();
        sendForm();
        
        api.searchNews(inputSearch.value, dateFrom.toISOString(), dateTo.toISOString()).then((list) => {
            const myList = list.articles;
            const cardList = new CardList(itemList, myList);

            cardList.addCard(myList.urlToImage, myList.publishedAt, myList.title, myList.description, myList.source.name);
        }).catch((err) => {
            console.log(err);
        });
        
        // form.reset();
        inputSearch.classList.add('err');
    }
}

const search = new Search();

form.addEventListener('submit', (e) => search.handleSearchClick(e));