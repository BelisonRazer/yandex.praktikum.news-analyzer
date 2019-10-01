import ButtonState from './__button/search__button';
import sendForm from '../../js/validateForm';
import Api from '../../js/api';
import RenderLoading from '../../js/common';
import {CardList} from '../news-card/news-card';
import {showMoreBtn} from '../../js/common';

const render = RenderLoading();
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
    async handleSearchClick(e) {
        this.clear();
        e.preventDefault();
        sendForm();

        await api.searchNews(inputSearch.value, dateFrom.toISOString(), dateTo.toISOString()).then((list) => {
        
            this.saveLocalStorageData(list.articles);
            const LSData = JSON.parse(localStorage.getItem('data'));

            if(LSData.length === 0) {
                render.notFound();
                showMoreBtn(false);
            } else if (LSData.length > 3) {
                new CardList(itemList, LSData);
                showMoreBtn(true);
                render.viewCard();
            } else {
                new CardList(itemList, LSData);
                showMoreBtn(false);
                render.viewCard();
            }

        }).catch((err) => {
            console.log(err);
        });
        
        inputSearch.classList.add('err');
    }

    saveLocalStorageData(data) {
        localStorage.setItem('data', JSON.stringify(data));
    }

    clear() {
        localStorage.clear();

        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }
}

const search = new Search();

form.addEventListener('submit', (e) => search.handleSearchClick(e));