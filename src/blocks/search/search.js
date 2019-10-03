import sendForm from '../../js/validateForm';
import Api from '../../js/api';
import RenderLoading from '../../js/common';
import {CardList} from '../news-card/news-card';
import {showMoreBtn} from '../../js/common';
import {weekAgo} from '../../js/common';


const render = RenderLoading();
const form = document.forms.searchForm;
const inputSearch = form.elements.inputSearch;
const itemList = document.querySelector('.news-card__item-container');

const api = new Api({
    baseUrl: 'https://newsapi.org/v2/everything?',
    apiKey: 'bf58748c05fd4c08858c83cd3fe58654'
});

// dateFrom.setDate(dateFrom.getDate() - 7).toLocaleString();
const dateFrom = new Date(new Date().getTime() - weekAgo);
const dateTo = new Date();

class Search {
    async handleSearchClick(e) {
        this.clear();
        e.preventDefault();
        sendForm();

        await api.searchNews(inputSearch.value, dateFrom.toISOString(), dateTo.toISOString()).then((list) => {
        
            const word = inputSearch.value.trim();
            this.saveLocalStorageData(list);
            this.saveLocalStorageWord(word);
            const LSData = JSON.parse(localStorage.getItem('data'));

            if(LSData.articles.length === 0) {
                render.notFound();
                showMoreBtn(false);
            } else if (LSData.articles.length > 3) {
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

    saveLocalStorageWord(word) {
        localStorage.setItem('word', JSON.stringify(word));
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